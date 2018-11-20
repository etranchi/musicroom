//
//  PlaylistCollectionView.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/19/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistCollectionView: UICollectionView, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    var playlists: [Playlist]
    let rootTarget: UIViewController?
    private let playlistCellId = "playlistCellId"
    private let buttonCellId = "buttonCellId"
    
    init(_ playlists: [Playlist], _ scrollDirection: UICollectionViewScrollDirection, _ rootTarget: UIViewController?) {
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
        print("Create Playlist")
    }
    
    func setupView() {
        delegate = self
        dataSource = self
        alwaysBounceVertical = true
        register(PlaylistCell.self, forCellWithReuseIdentifier: playlistCellId)
        register(CreatePlaylistButtonCell.self, forCellWithReuseIdentifier: buttonCellId)
        contentInset = UIEdgeInsets(top: 14, left: 14, bottom: 14, right: 14)
        backgroundColor = .clear
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        print("playlist Selected")
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return playlists.count + 1
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.item == playlists.count {
            let cell = dequeueReusableCell(withReuseIdentifier: buttonCellId, for: indexPath) as! CreatePlaylistButtonCell
            cell.vc = self
            return cell
        }
        let cell = dequeueReusableCell(withReuseIdentifier: playlistCellId, for: indexPath) as! PlaylistCell
        cell.playlist = playlists[indexPath.item]
        return cell
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if indexPath.item == playlists.count {
            return CGSize(width: bounds.width - 28, height: 40)
        }
        return CGSize(width: bounds.width / 2 - 21, height: 200)
    }
    
    
}
