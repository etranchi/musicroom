//
//  PlaylistCollectionView.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/19/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistCollectionView: UICollectionView, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    var isEditing = false
    var selectedPlaylist : Playlist?
    var eventCreation : Bool = false
    var isAddingSong = false
    var playlists: [Playlist]
    let rootTarget: PlaylistController?
    var selectedCell : PlaylistCell?
    
    private let playlistCellId = "playlistCellId"
    private let buttonCellId = "buttonCellId"
    
    init(_ playlists: [Playlist], _ scrollDirection: UICollectionViewScrollDirection, _ rootTarget: PlaylistController?) {
        self.rootTarget = rootTarget
        self.playlists = playlists
        let layout = AlignedCollectionViewFlowLayout(horizontalAlignment: .left, verticalAlignment: .top)
        layout.scrollDirection = scrollDirection
        layout.minimumInteritemSpacing = 14
        layout.minimumLineSpacing = 14
        super.init(frame: .zero, collectionViewLayout: layout)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func createPlaylistPopUp() {
        if !eventCreation {
            let alert = UIAlertController(title: "Playlist creation", message: "What's your playlist's name?", preferredStyle: .alert)
            alert.addTextField { (textField) in
                textField.placeholder = "playlist's name"
            }
            
            alert.addAction(UIAlertAction(title: "Create", style: .default, handler: { [weak alert] (_) in
                let textField = alert!.textFields![0]
                if let text = textField.text, text != "" {
                    apiManager.createPlaylist(text, self.rootTarget)
                }
            }))
            alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
            rootTarget?.present(alert, animated: true, completion: nil)
        }
    }
    
    func setupView() {
        delegate = self
        dataSource = self
        // alwaysBounceVertical = true
        register(PlaylistCell.self, forCellWithReuseIdentifier: playlistCellId)
        register(CreatePlaylistButtonCell.self, forCellWithReuseIdentifier: buttonCellId)
        contentInset = UIEdgeInsets(top: 14, left: 14, bottom: 14, right: 14)
        backgroundColor = .clear
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let cell = cellForItem(at: indexPath) as? PlaylistCell else { return }
        if eventCreation {
            if selectedCell != nil {
                selectedCell!.layer.borderColor = nil
                selectedCell!.layer.borderWidth = 0
            }
            selectedPlaylist = playlists[indexPath.row]
            selectedCell = cell
            selectedCell!.layer.borderColor = UIColor.gray.cgColor
            selectedCell!.layer.borderWidth = 2
        }
        if isEditing {
            if cell.playlist._id != nil {
                apiManager.deletePlaylist(String(describing: cell.playlist._id!), rootTarget)
            }
            return
        } else if isAddingSong {
            rootTarget?.addSongToPlaylist(cell.playlist)
            return
        }
        let vc = PlaylistDetailController(playlists[indexPath.item], cell.imageView.image!)
        rootTarget?.navigationController?.pushViewController(vc, animated: true)
    }
    

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return rootTarget != nil ? playlists.count + 1 : playlists.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.item == playlists.count  && rootTarget != nil {
            let cell = dequeueReusableCell(withReuseIdentifier: buttonCellId, for: indexPath) as! CreatePlaylistButtonCell
            cell.title = "CREATE PLAYLIST"
            cell.vc = self

            return cell
        }
        let cell = dequeueReusableCell(withReuseIdentifier: playlistCellId, for: indexPath) as! PlaylistCell
        cell.playlist = playlists[indexPath.item]
        if isEditing && !eventCreation {
            cell.deleteView.isHidden = false
        } else {
            cell.deleteView.isHidden = true
        }
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if indexPath.item == playlists.count {
            return CGSize(width: bounds.width - 28, height: 40)
        }
        return CGSize(width: bounds.width / 2 - 21, height: 200)
    }
    
    
}
