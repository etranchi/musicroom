//
//  PlaylistController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/19/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistController: UIViewController {
    
    var playlistCollectionView: PlaylistCollectionView?
    var firstLoad = true
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        navigationController?.navigationBar.topItem?.title = ""
        title = "Playlists"
    }
    
    
    @objc func handleEdit() {
        if playlistCollectionView!.isEditing {
            navigationItem.rightBarButtonItem = UIBarButtonItem(title: "edit", style: .done, target: self, action: #selector(handleEdit))
            playlistCollectionView!.isEditing = false
            self.playlistCollectionView?.reloadData()
            return
        }
        playlistCollectionView!.isEditing = true
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "done", style: .done, target: self, action: #selector(handleEdit))
        self.playlistCollectionView?.reloadData()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        print(userManager.currentUser!.token!)
        setupView()
        reloadPlaylists()
    }
    
    func reloadPlaylists() {
        apiManager.getUserPlaylists { (playlists) in
            self.playlistCollectionView?.playlists = playlists
            self.playlistCollectionView?.reloadData()
            if self.firstLoad {
                self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "edit", style: .done, target: self, action: #selector(self.handleEdit))
                self.firstLoad = false
            }
        }
    }
    
    func setupView() {
        playlistCollectionView = PlaylistCollectionView([], .vertical, self)
        playlistCollectionView?.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(playlistCollectionView!)
        NSLayoutConstraint.activate([
            playlistCollectionView!.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            playlistCollectionView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            playlistCollectionView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            playlistCollectionView!.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -45)
        ])
    }
}
