//
//  TabBarController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class TabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor(white: 0.2, alpha: 1)
        setupBlurTabBar()
        setupTabBarController(self)
    }
    
    fileprivate func setupBlurTabBar() {
        tabBar.tintColor = .white
        tabBar.backgroundImage = UIImage()
        tabBar.backgroundColor = UIColor(white: 0.1, alpha: 0.6)
        let bounds = tabBar.bounds
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .light))
        visualEffectView.isUserInteractionEnabled = false
        visualEffectView.frame = bounds
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        tabBar.addSubview(visualEffectView)
        visualEffectView.layer.zPosition = -1
    }
    
    fileprivate func setupTabBarController(_ tabBarController: TabBarController) {

        let imageInsets = UIEdgeInsets(top: 4, left: 0, bottom: -8, right: 0)
        let layout0 = UICollectionViewFlowLayout()
        let layout1 = UICollectionViewFlowLayout()
        let tabViewController0 = PlaylistController(collectionViewLayout: layout1)
        let tabViewController1 = SearchController(collectionViewLayout: layout0)
        let tabViewController2 = LibraryController()
        let tabViewController3 = SettingsController()
        
        tabViewController0.title = "Playlists"
        tabViewController1.title = "Search"
        tabViewController2.title = "Library"
        tabViewController3.title = "Settings"
        
        tabViewController0.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "playlist_icon"), tag: 1)
        tabViewController1.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "search_icon"), tag: 2)
        tabViewController2.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "library_icon"), tag: 3)
        tabViewController3.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "settings_icon"), tag: 4)
        
        tabViewController0.tabBarItem.imageInsets = imageInsets
        tabViewController1.tabBarItem.imageInsets = imageInsets
        tabViewController2.tabBarItem.imageInsets = imageInsets
        tabViewController3.tabBarItem.imageInsets = imageInsets
        
        let navi0 = CustomNavigationController(rootViewController: tabViewController0)
        let navi1 = CustomNavigationController(rootViewController: tabViewController1)
        let navi2 = CustomNavigationController(rootViewController: tabViewController2)
        let navi3 = CustomNavigationController(rootViewController: tabViewController3)
        
        tabBarController.viewControllers = [navi0, navi1, navi2, navi3]
    }
}
