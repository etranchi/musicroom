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
    var isAddingSong = false
    var track: Track?
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        navigationController?.navigationBar.topItem?.title = ""
        reloadPlaylists()
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
    
    let cancelButton: UIButton = {
        let button = UIButton()
        button.setAttributedTitle(NSAttributedString(string: "Cancel", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white, .font: UIFont.systemFont(ofSize: 14, weight: .medium)]), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        playlistCollectionView?.alwaysBounceVertical = true
        print(userManager.currentUser!.token!)
        setupView()
    }
    
    
    func reloadPlaylists() {
        apiManager.getPlaylists { (playlists) in
            if self.firstLoad {
                self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "edit", style: .done, target: self, action: #selector(self.handleEdit))
                self.firstLoad = false
            }
            guard let myPlaylists = playlists.myPlaylists else { return }
            self.playlistCollectionView?.playlists = myPlaylists
            self.playlistCollectionView?.reloadData()
        }
    }
    
    func addSongToPlaylist(_ playlist: Playlist) {
        if let song = track {
            apiManager.addTrackToPlaylist(playlist._id!, song)
        }
        handleCancel()
    }
    
    @objc func handleCancel() {
        dismiss(animated: true, completion: nil)
    }
    
    func setupView() {
        cancelButton.addTarget(self, action: #selector(handleCancel), for: .touchUpInside)
        playlistCollectionView = PlaylistCollectionView([], .vertical, self)
        playlistCollectionView?.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(playlistCollectionView!)
        view.addSubview(cancelButton)
        NSLayoutConstraint.activate([
            playlistCollectionView!.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            playlistCollectionView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            playlistCollectionView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            playlistCollectionView!.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -45),
            
            cancelButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
            cancelButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            cancelButton.widthAnchor.constraint(equalToConstant: 300),
            cancelButton.heightAnchor.constraint(equalToConstant: 30),
        ])
        if isAddingSong == false {
            cancelButton.isHidden = true
        } else {
            playlistCollectionView?.isAddingSong = true
        }
    }
}
