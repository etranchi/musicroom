//
//  PlaylistController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    private let categoryCellId = "categoryCellId"
    private let searchCellId = "searchCellId"
    
    let manager = APIManager()
    let initialSearch = "A"
    var musicCategories : MusicCategory?
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        self.navigationController?.navigationBar.topItem?.title = "Playlist"
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        collectionView?.backgroundColor = UIColor(white: 0.15, alpha: 1)
        collectionView?.alwaysBounceVertical = true
        collectionView?.register(CategoryCell.self, forCellWithReuseIdentifier: categoryCellId)
        collectionView?.register(SearchCell.self, forCellWithReuseIdentifier: searchCellId)
        
        
        performSearch(initialSearch) { (playlists) in
            self.musicCategories = MusicCategory.sampleMusicCategories([], [], [], playlists)[3]
            self.collectionView?.reloadData()
        }
    }
    
    func performSearch(_ text: String, completion: @escaping ([Playlist]) -> ())
    {
        manager.searchPlaylist(text) { (playlist) in
            completion(playlist)
        }
    }
    
    func handleSearch(_ text: String) {

    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
            if indexPath.item == 0 {
            let     cell = collectionView.dequeueReusableCell(withReuseIdentifier: searchCellId, for: indexPath) as! SearchCell
            cell.placeholder = "playlists, events..."
            cell.vc = self
            return cell
            } else {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: categoryCellId, for: indexPath) as! CategoryCell
            cell.musicCategory = musicCategories
            cell.backgroundColor = UIColor(white: 0.15, alpha: 1)
            return cell
            }
    }
    
    override func willTransition(to newCollection: UITraitCollection, with coordinator: UIViewControllerTransitionCoordinator) {
        collectionViewLayout.invalidateLayout()
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch indexPath.item {
            case 0:
                return CGSize(width: view.frame.width, height: 40)
            case 1:
                if musicCategories != nil && musicCategories!.playlists.count > 0 {
                    return CGSize(width: view.frame.width, height: 240)
                }
            default:
                return CGSize(width: view.frame.width, height: 0)
        }
        return CGSize(width: view.frame.width, height: 0)
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if musicCategories != nil {
            return 2
        }
        return 1
    }
}
