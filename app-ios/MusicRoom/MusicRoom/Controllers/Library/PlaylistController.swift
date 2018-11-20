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
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        navigationController?.navigationBar.topItem?.title = ""
        title = "Playlists"
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        setupView()
        apiManager.getUserPlaylists { (playlists) in
            self.playlistCollectionView?.playlists = playlists
            self.playlistCollectionView?.reloadData()
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
