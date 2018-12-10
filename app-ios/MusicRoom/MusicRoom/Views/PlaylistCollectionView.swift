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
    var isEditable = false
    var isAddingSong = false
    var myPlaylists: [Playlist]
    let rootTarget: PlaylistsController?
    var selectedCell : PlaylistCell?
    
    private let playlistCellId = "playlistCellId"
    private let buttonCellId = "buttonCellId"
    
    init(_ myPlaylists: [Playlist], _ scrollDirection: UICollectionViewScrollDirection, _ rootTarget: PlaylistsController?) {
        self.rootTarget = rootTarget
        self.myPlaylists = myPlaylists
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
    
    
    func setupView() {
        delegate = self
        dataSource = self
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
            selectedPlaylist = myPlaylists[indexPath.row]
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
        let vc = PlaylistDetailController(myPlaylists[indexPath.item], cell.imageView.image!)
        print(cell.isEditable)
        if cell.isEditable {
            vc.isEditable = true
        }
        rootTarget?.navigationController?.pushViewController(vc, animated: true)
    }
    

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return myPlaylists.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
//        if indexPath.item == myPlaylists.count  && rootTarget != nil {
//            let cell = dequeueReusableCell(withReuseIdentifier: buttonCellId, for: indexPath) as! CreatePlaylistButtonCell
//            cell.vc = self
//            cell.isCreating = true
//            cell.title = "CREATE PLAYLIST"
//            cell.createButton.backgroundColor = UIColor(red: 40 / 255, green: 180 / 255, blue: 40 / 255, alpha: 1)
//
//            return cell
//        }
//        if indexPath.item == myPlaylists.count + 1  && rootTarget != nil {
//            let cell = dequeueReusableCell(withReuseIdentifier: buttonCellId, for: indexPath) as! CreatePlaylistButtonCell
//            cell.vc = self
//            cell.root = rootTarget
//            cell.isCreating = false
//            cell.title = "IMPORT PLAYLIST"
//            cell.createButton.backgroundColor = UIColor(red: 140 / 255, green: 180 / 255, blue: 140 / 255, alpha: 1)
//            return cell
//        }
        let cell = dequeueReusableCell(withReuseIdentifier: playlistCellId, for: indexPath) as! PlaylistCell
        cell.playlist = myPlaylists[indexPath.row]
        cell.isEditable = self.isEditable
        if isEditing && !eventCreation {
            cell.deleteView.isHidden = false
        } else {
            cell.deleteView.isHidden = true
        }
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if indexPath.item == myPlaylists.count  || indexPath.item == myPlaylists.count + 1{
            return CGSize(width: bounds.width - 28, height: 40)
        }
        return CGSize(width: bounds.width / 2 - 21, height: 200)
    }
    
    
}
