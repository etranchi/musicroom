//
//  SearchController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SearchController: UICollectionViewController, UICollectionViewDelegateFlowLayout {

    private let categoryCellId = "categoryCellId"
    private let searchCellId = "searchCellId"
    
    let manager = APIManager()
    var initialSearch = "Yo"
    var trackListChanged = true
    
    var musicCategories: [MusicCategory]? {
        didSet {
            trackListChanged = true
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        self.navigationController?.navigationBar.topItem?.title = "Search"
        collectionView.reloadData()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        self.navigationController?.navigationBar.topItem?.title = ""
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        collectionView?.backgroundColor = UIColor(white: 0.1, alpha: 1)
        collectionView?.alwaysBounceVertical = true
        collectionView?.register(GlobalSearchCell.self, forCellWithReuseIdentifier: categoryCellId)
        collectionView?.register(SearchCell.self, forCellWithReuseIdentifier: searchCellId)
        
        performSearch(initialSearch) { (albums, tracks, artists) in
            self.musicCategories = MusicCategory.sampleMusicCategories(albums, tracks, artists)
            self.collectionView?.reloadData()
        }
    }
    
    func handleSearch(_ text: String) {
        musicCategories?.removeAll()
        initialSearch = text
        performSearch(text) { (albums, tracks, artists) in
            self.musicCategories = MusicCategory.sampleMusicCategories(albums, tracks, artists)
            self.collectionView?.reloadData()
        }
    }
    
    func performSearch(_ text: String, completion: @escaping ([Album], [Track], [Artist]) -> ())
    {
        manager.search(text) { (tracks, albums, artists) in
            completion(albums, tracks, artists)
        }
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.item == 0 {
            let     cell = collectionView.dequeueReusableCell(withReuseIdentifier: searchCellId, for: indexPath) as! SearchCell
            cell.placeholder = "artists, songs, or albums"
            cell.vc = self
            return cell
        } else {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: categoryCellId, for: indexPath) as! GlobalSearchCell
            cell.musicCategory = musicCategories![indexPath.item - 1]
            cell.searchController = self
            return cell
        }
    }
    
    func showTrackList() {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .vertical
        let vc = SeeAllSongsController(musicCategories![1].tracks, initialSearch, self, layout: layout)
        navigationController?.pushViewController(vc, animated: true)
    }
    
    func showAlbumContent(_ album: Album, _ albumCover: UIImage) {
        manager.getAlbumTracks(album) { (album) in
            let vc = AlbumController(album, albumCover)
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    func showPlayerForSong(_ index: Int) {
        (tabBarController as! TabBarController).showPlayerForSong(index, tracks: musicCategories![1].tracks)
    }

    override func willTransition(to newCollection: UITraitCollection, with coordinator: UIViewControllerTransitionCoordinator) {
        collectionViewLayout.invalidateLayout()
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets(top: 0, left: 0, bottom: 50, right: 0)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch indexPath.item {
        case 0:
            return CGSize(width: view.frame.width, height: 40)
        case 1:
            if musicCategories![indexPath.item - 1].albums.count > 0 {
                return CGSize(width: view.frame.width, height: 240)
            }
        case 2:
            if musicCategories![indexPath.item - 1].tracks.count > 0 {
                return CGSize(width: view.frame.width, height: 360)
            }
        case 3:
            if musicCategories![indexPath.item - 1].artists.count > 0 {
                return CGSize(width: view.frame.width, height: 200)
            }
        default:
            return CGSize(width: view.frame.width, height: 0)
        }
        return CGSize(width: view.frame.width, height: 0)
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if let m = musicCategories {
            return m.count + 1
        }
        return 1
    }
}
