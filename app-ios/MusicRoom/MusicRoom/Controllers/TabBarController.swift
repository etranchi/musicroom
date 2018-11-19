//
//  TabBarController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

let playerController = PlayerController([], -2)
var currentTrack: Track?

class TabBarController: UITabBarController {
    
    var offsetY: CGFloat = 0.0
    let imageInsets = UIEdgeInsets(top: 10, left: 0, bottom: -10, right: 0)
    let tabViewController0 = PlaylistController(collectionViewLayout: UICollectionViewFlowLayout())
    let tabViewController1 = SearchController()
    let tabViewController2 = LibraryController()
    let tabViewController3 = MapController()
    let minimizedPlayer = MinimizedPlayerView()
    let playerView = playerController.view!
    var navi1: CustomNavigationController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(white: 0.2, alpha: 1)
        setupBlurTabBar()
        setupTabBarController()
        offsetY = tabBar.frame.size.height + 35
    }
    
    fileprivate func setupBlurTabBar() {
        tabBar.tintColor = .white
        tabBar.backgroundImage = UIImage()
        tabBar.backgroundColor = UIColor(white: 0.4, alpha: 0.8)
        let bounds = tabBar.bounds
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .dark))
        visualEffectView.isUserInteractionEnabled = false
        visualEffectView.frame = bounds
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        tabBar.addSubview(visualEffectView)
        visualEffectView.layer.zPosition = -4
    }
    
    func showPlayerFromMinimized() {
        animatedShowPlayer()
        
    }
    
    func showPlayerForSong(_ index: Int, tracks: [Track]) {
        if currentTrack?.id == tracks[index].id {
            playerController.handlePlay()
            return
        }
        playerController.tracks = tracks
        playerController.index = index
        playerController.viewDidPop()
        playerController.loadTrackInplayer()
        playerController.handlePlay()
        AppUtility.lockOrientation(.portrait, andRotateTo: .portrait)
    }
    
    fileprivate func setupTabBarController() {
        playerController.rootViewController = self
        playerController.minimizedPlayer = minimizedPlayer
        //addChild(playerController)
        addChildViewController(playerController)
        tabBar.removeFromSuperview()
        view.addSubview(playerView)
        view.addSubview(minimizedPlayer)
        view.addSubview(tabBar)
        playerView.translatesAutoresizingMaskIntoConstraints = false
        minimizedPlayer.backgroundColor = UIColor(white: 0.3, alpha: 0.5)
        NSLayoutConstraint.activate([
            minimizedPlayer.topAnchor.constraint(equalTo: tabBar.topAnchor, constant: -44),
            minimizedPlayer.trailingAnchor.constraint(equalTo: tabBar.trailingAnchor),
            minimizedPlayer.leadingAnchor.constraint(equalTo: tabBar.leadingAnchor),
            minimizedPlayer.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -43),
            
            playerView.topAnchor.constraint(equalTo: view.topAnchor),
            playerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            playerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            playerView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
            ])
        
        playerView.transform = CGAffineTransform(translationX: 0, y: view.bounds.height - offsetY - 44)
        tabViewController0.title = "Playlists"
        tabViewController1.title = "Search"
        tabViewController2.title = "Library"
        tabViewController3.title = "Map"
        
        tabViewController0.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "playlist_icon"), tag: 1)
        tabViewController1.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "search_icon"), tag: 2)
        tabViewController2.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "library_icon"), tag: 3)
        tabViewController3.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "map"), tag: 4)
        tabViewController0.tabBarItem.imageInsets = imageInsets
        tabViewController1.tabBarItem.imageInsets = imageInsets
        tabViewController2.tabBarItem.imageInsets = imageInsets
        tabViewController3.tabBarItem.imageInsets = imageInsets
        
        let navi0 = CustomNavigationController(rootViewController: tabViewController0)
        navi1 = CustomNavigationController(rootViewController: tabViewController1)
        let navi2 = CustomNavigationController(rootViewController: tabViewController2)
        let navi3 = CustomNavigationController(rootViewController: tabViewController3)
        
        viewControllers = [navi0, navi1!, navi2, navi3]
    }
    
    func animatedShowPlayer() {
        animatedHideTabBar()
        UIView.animate(withDuration: 0.25, delay: 0.1, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            playerController.downButton.alpha = 1
            self.minimizedPlayer.alpha = 0
        })
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            
            self.playerView.transform = .identity
            self.minimizedPlayer.transform = CGAffineTransform(translationX: 0, y: -self.view.bounds.height + self.offsetY + 44)
            
        })
    }
    
    func animatedHidePlayer() {
        UIView.animate(withDuration: 0.3, delay: 0.1, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            playerController.downButton.alpha = 0
            self.minimizedPlayer.alpha = 1
        })
        animatedShowTabBar()
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.playerView.transform = CGAffineTransform(translationX: 0, y: self.view.bounds.height - self.offsetY - 44)
            self.minimizedPlayer.transform = .identity
        })
    }
    
    func animatedShowTabBar() {
        UIView.animate(withDuration: 0.7, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.tabBar.transform = .identity
        })
    }
    
    func animatedHideTabBar() {
        UIView.animate(withDuration: 0.7, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.tabBar.transform = CGAffineTransform(translationX: 0, y: self.offsetY)
        })
    }
}
