//
//  PlaylistController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

//class PlaylistController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
//    private let categoryCellId = "categoryCellId"
//    private let searchCellId = "searchCellId"
//
//    let manager = APIManager()
//    let initialSearch = "Daft Punk"
//
//
//    override func viewWillAppear(_ animated: Bool) {
//        super.viewWillAppear(animated)
//
//        self.navigationController?.navigationBar.topItem?.title = "Playlist"
//    }
//
//    override func viewDidLoad() {
//        super.viewDidLoad()
//        collectionView?.backgroundColor = UIColor(white: 0.15, alpha: 1)
//        collectionView?.alwaysBounceVertical = true
//        collectionView?.register(CategoryCell.self, forCellWithReuseIdentifier: categoryCellId)
//        collectionView?.register(SearchCell.self, forCellWithReuseIdentifier: searchCellId)
//
//
//        /*performSearch(initialSearch) { (albums, tracks, artists) in
//            self.musicCategories = MusicCategory.sampleMusicCategories(albums, tracks, artists)
//            self.collectionView?.reloadData()
//        }*/
//    }
//
//    func handleSearch(_ text: String) {
//
//    }
//
//    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
//        // if indexPath.item == 0 {
//            let     cell = collectionView.dequeueReusableCell(withReuseIdentifier: searchCellId, for: indexPath) as! SearchCell
//            cell.placeholder = "playlists, events..."
//            cell.vc = self
//            return cell
//        // } else {
//            /*let cell = collectionView.dequeueReusableCell(withReuseIdentifier: categoryCellId, for: indexPath) as! CategoryCell
//            cell.musicCategory = musicCategories![indexPath.item - 1]
//            cell.backgroundColor = UIColor(white: 0.15, alpha: 1)
//            cell.searchController = self
//            return cell*/
//        // }
//    }
//
//    override func willTransition(to newCollection: UITraitCollection, with coordinator: UIViewControllerTransitionCoordinator) {
//        collectionViewLayout.invalidateLayout()
//    }
//
//    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
//        switch indexPath.item {
//            case 0:
//                return CGSize(width: view.frame.width, height: 40)
//            default:
//                return CGSize(width: view.frame.width, height: 0)
//        }
//    }
//
//    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
//        return 1
//    }
//}

class PlaylistHomeController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    private let categoryCellId = "categoryCellId"
    private let searchCellId = "searchCellId"
    private let playlistsCellId = "playlistCellId"
    
    let manager = APIManager()
    let initialSearch = "Daft Punk"
    
    var playlists : [PlaylistHome] = [PlaylistHome]()
    var currentUser : [PlaylistByUserId]?
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        self.navigationController?.navigationBar.topItem?.title = "Playlist"
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        createPlaylistArray()
        collectionView?.backgroundColor = UIColor(white: 0.15, alpha: 1)
        collectionView?.alwaysBounceVertical = true
        collectionView?.register(CategoryCell.self, forCellWithReuseIdentifier: categoryCellId)
        collectionView?.register(SearchCell.self, forCellWithReuseIdentifier: searchCellId)
        collectionView?.register(PlaylistCell.self, forCellWithReuseIdentifier: playlistsCellId)
        
        performPlaylistByUserId(1306931615) { (playlist) in
            self.currentUser = PlaylistByUserId.samplePlaylistById(playlist)
            self.collectionView?.reloadData()
        }
        
        /*performSearch(initialSearch) { (albums, tracks, artists) in
         self.musicCategories = MusicCategory.sampleMusicCategories(albums, tracks, artists)
         self.collectionView?.reloadData()
         }*/
    }
    
    func performPlaylistByUserId(_ userId: Int, completion: @escaping ([Playlist]) -> ()) {
        manager.playlistsByUserId(userId) { (playlists) in
            completion(playlists)
        }
    }
    
    func handleSearch(_ text: String) {
        
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.item == 0 {
            let     searchCell = collectionView.dequeueReusableCell(withReuseIdentifier: searchCellId, for: indexPath) as! SearchCell
            searchCell.placeholder = "playlists, events..."
            searchCell.vc = self
            return searchCell
         } else {
            let playlistsCell = collectionView.dequeueReusableCell(withReuseIdentifier: playlistsCellId, for: indexPath) as! PlaylistCell
            print(indexPath.item)
            print(playlists[indexPath.item - 1])
            let currentLastItem = playlists[indexPath.item - 1]
            playlistsCell.playlist = currentLastItem
            return playlistsCell
        /*let cell = collectionView.dequeueReusableCell(withReuseIdentifier: categoryCellId, for: indexPath) as! CategoryCell
         cell.musicCategory = musicCategories![indexPath.item - 1]
         cell.backgroundColor = UIColor(white: 0.15, alpha: 1)
         cell.searchController = self
         return cell*/
         }
    }
    
    override func willTransition(to newCollection: UITraitCollection, with coordinator: UIViewControllerTransitionCoordinator) {
        collectionViewLayout.invalidateLayout()
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch indexPath.item {
        case 0:
            return CGSize(width: view.frame.width, height: 40)
        default:
            return CGSize(width: view.frame.width, height: 150)
        }
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return playlists.count + 1
    }
    
    func createPlaylistArray() {
        playlists.append(PlaylistHome(name: "playlist 1"))
        playlists.append(PlaylistHome(name: "playlist 2"))
        playlists.append(PlaylistHome(name: "playlist 3"))
        playlists.append(PlaylistHome(name: "playlist 4"))
    }
}
