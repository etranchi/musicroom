//
//  TabBarController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

let playerController = PlayerController([], -2)

class TabBarController: UITabBarController {

    var offsetY: CGFloat = 0.0
    let imageInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
    let tabViewController0 = PlaylistController(collectionViewLayout: UICollectionViewFlowLayout())
    let tabViewController1 = SearchController(collectionViewLayout: UICollectionViewFlowLayout())
    let tabViewController2 = LibraryController()
    let minimizedPlayer = MinimizedPlayerView()
    
    var navi1: CustomNavigationController?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor(white: 0.2, alpha: 1)
        setupBlurTabBar()
        setupTabBarController()
        offsetY = tabBar.frame.size.height
    }
    
    fileprivate func setupBlurTabBar() {
        tabBar.tintColor = .white
        tabBar.backgroundImage = UIImage()
        tabBar.backgroundColor = UIColor(white: 0.4, alpha: 0.6)
        let bounds = tabBar.bounds
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .dark))
        visualEffectView.isUserInteractionEnabled = false
        visualEffectView.frame = bounds
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        tabBar.addSubview(visualEffectView)
        visualEffectView.layer.zPosition = -1
    }
    
    func showPlayerFromMinimized() {
        selectedViewController = navi1
        navi1!.pushViewController(playerController, animated: true)
        if playerController.hasPaused == true {
            playerController.handlePause()
        }
    }
    
    func showPlayerForSong(_ index: Int) {
        playerController.tracks = tabViewController1.musicCategories![1].tracks
        if index == playerController.index, tabViewController1.trackListChanged == false {
            AppUtility.lockOrientation(.portrait, andRotateTo: .portrait)
            tabViewController1.navigationController?.pushViewController(playerController, animated: true)
            playerController.handlePlay()
            return
        }
        tabViewController1.trackListChanged = false
        playerController.index = index
        playerController.loadTrackInplayer()
        AppUtility.lockOrientation(.portrait, andRotateTo: .portrait)
        navi1!.pushViewController(playerController, animated: true)
    }
    
    fileprivate func setupTabBarController() {
        playerController.rootViewController = self
        view.addSubview(minimizedPlayer)
        additionalSafeAreaInsets.bottom = -80
        NSLayoutConstraint.activate([
            minimizedPlayer.topAnchor.constraint(equalTo: tabBar.topAnchor, constant: -50),
            minimizedPlayer.trailingAnchor.constraint(equalTo: tabBar.trailingAnchor),
            minimizedPlayer.leadingAnchor.constraint(equalTo: tabBar.leadingAnchor),
            minimizedPlayer.bottomAnchor.constraint(equalTo: tabBar.bottomAnchor, constant: -49)
        ])
        
        tabViewController0.title = "Playlists"
        tabViewController1.title = "Search"
        tabViewController2.title = "Library"
        
        tabViewController0.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "playlist_icon"), tag: 1)
        tabViewController1.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "search_icon"), tag: 2)
        tabViewController2.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "library_icon"), tag: 3)
        tabViewController0.tabBarItem.imageInsets = imageInsets
        tabViewController1.tabBarItem.imageInsets = imageInsets
        tabViewController2.tabBarItem.imageInsets = imageInsets
        
        let navi0 = CustomNavigationController(rootViewController: tabViewController0)
        navi1 = CustomNavigationController(rootViewController: tabViewController1)
        let navi2 = CustomNavigationController(rootViewController: tabViewController2)
        
        viewControllers = [navi0, navi1!, navi2]
    }
    
    func animatedShowTabBar() {
        UIView.animate(withDuration: 0.4, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.tabBar.transform = CGAffineTransform.identity
            self.minimizedPlayer.transform = CGAffineTransform.identity
        })
    }
    
    func animatedHideTabBar() {
        UIView.animate(withDuration: 1, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.tabBar.transform = CGAffineTransform(translationX: 0, y: self.offsetY + 90)
            self.minimizedPlayer.transform = CGAffineTransform(translationX: 0, y: self.offsetY + 90)
        })
    }
}
