//
//  TabBarController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

let playerController = PlayerController([], -2)
let songDetail = SongDetailView(frame: UIApplication.shared.keyWindow!.screen.bounds)
var currentTrack: Track?
var lovedTracksId: [Int] = []

class TabBarController: UITabBarController {

    var offsetY: CGFloat = 0.0
    let imageInsets = UIEdgeInsets(top: 10, left: 0, bottom: -10, right: 0)
    let tabViewController0 = LibraryController()
    let tabViewController1 = SearchController()
    let tabViewController2 = MapController()
    let minimizedPlayer = MinimizedPlayerView()
    let playerView = playerController.view!
    var isPlayerOpened = false
    
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
        updateLovedTrackList()
        songDetail.root = self
        playerController.rootViewController = self
        playerController.minimizedPlayer = minimizedPlayer
        addChildViewController(playerController)
        tabBar.removeFromSuperview()
        view.addSubview(playerView)
        view.addSubview(minimizedPlayer)
        view.addSubview(tabBar)
        view.addSubview(songDetail)
        playerView.translatesAutoresizingMaskIntoConstraints = false
        songDetail.translatesAutoresizingMaskIntoConstraints = false
        minimizedPlayer.backgroundColor = UIColor(white: 0.3, alpha: 0.5)
        NSLayoutConstraint.activate([
            minimizedPlayer.topAnchor.constraint(equalTo: tabBar.topAnchor, constant: -44),
            minimizedPlayer.trailingAnchor.constraint(equalTo: tabBar.trailingAnchor),
            minimizedPlayer.leadingAnchor.constraint(equalTo: tabBar.leadingAnchor),
            minimizedPlayer.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -43),
            
            
            playerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            playerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            
            songDetail.topAnchor.constraint(equalTo: view.topAnchor),
            songDetail.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            songDetail.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            songDetail.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])
        
        playerView.transform = CGAffineTransform(translationX: 0, y: view.bounds.height - offsetY - 44)
        playerViewTopConstraint = playerView.topAnchor.constraint(equalTo: view.topAnchor)
        playerViewBottomConstrant = playerView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        playerViewTopConstraint.isActive = true
        playerViewBottomConstrant.isActive = true
        tabViewController0.title = "Your Library"
        tabViewController1.title = "Search"
        tabViewController2.title = "Map"
        
        tabViewController0.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "library_icon"), tag: 1)
        tabViewController1.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "search_icon"), tag: 2)
        tabViewController2.tabBarItem = UITabBarItem(title: "", image: #imageLiteral(resourceName: "map"), tag: 3)
        tabViewController0.tabBarItem.imageInsets = imageInsets
        tabViewController1.tabBarItem.imageInsets = imageInsets
        tabViewController2.tabBarItem.imageInsets = imageInsets
        
        let navi0 = CustomNavigationController(rootViewController: tabViewController0)
        let navi1 = CustomNavigationController(rootViewController: tabViewController1)
        let navi2 = CustomNavigationController(rootViewController: tabViewController2)
        
        let panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePan))
        minimizedPlayer.addGestureRecognizer(panGesture)
        
        viewControllers = [navi0, navi1, navi2]
    }
    
    func updateLovedTrackList() {
        apiManager.getLibraryTracks { (tracks) in
            lovedTracksId.removeAll()
            tracks.forEach({ (track) in
                lovedTracksId.append(track.id)
            })
        }
    }
    
    let             menuHeight = UIScreen.main.bounds.height
    var             playerViewTopConstraint: NSLayoutConstraint!
    var             playerViewBottomConstrant: NSLayoutConstraint!
    
    @objc func          handlePan(gesture: UIPanGestureRecognizer) {
        guard currentTrack != nil else { return }
        let             translation = gesture.translation(in: view)
        var             y = translation.y
        
        if isPlayerOpened {
            print("opened")
        } else {
            y = y > 0 ? 0 : y
            playerView.transform = CGAffineTransform(translationX: 0, y: self.view.bounds.height - self.offsetY + y)
            tabBar.transform = CGAffineTransform(translationX: 0, y: -y * 0.1)
            minimizedPlayer.transform = CGAffineTransform(translationX: 0, y: y)
            if y > -100 {
                minimizedPlayer.alpha = 1 + y / 100
                playerController.downButton.alpha = y / 100
            }
        }
        if gesture.state == .ended {
            handleEnded(gesture)
        }
    }
    
    fileprivate func    handleEnded(_ gesture: UIPanGestureRecognizer) {
        let             translation = gesture.translation(in: view)
        let             velocity = gesture.velocity(in: view)
        if isPlayerOpened {
            print("opened")
        } else {
            if velocity.y < -700 {
                animatedShowPlayer()
                return
            }
            if abs(translation.y) > menuHeight * 0.1 {
                animatedShowPlayer()
            } else {
                animatedHidePlayer()
            }
        }
    }

    
    func animatedShowPlayer() {
        animatedHideTabBar()
        UIView.animate(withDuration: 0.25, delay: 0.1, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            playerController.downButton.alpha = 1
            self.minimizedPlayer.alpha = 0
        })
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            
            self.playerView.transform = .identity
            self.minimizedPlayer.transform = CGAffineTransform(translationX: 0, y: -self.view.bounds.height + self.offsetY)
            
        })
    }
    
    func animatedHidePlayer() {
        UIView.animate(withDuration: 0.3, delay: 0.1, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            playerController.downButton.alpha = 0
            self.minimizedPlayer.alpha = 1
        })
        animatedShowTabBar()
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.playerView.transform = CGAffineTransform(translationX: 0, y: self.view.bounds.height - self.offsetY)
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
