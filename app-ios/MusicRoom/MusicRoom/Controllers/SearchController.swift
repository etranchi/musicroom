//
//  SearchController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SearchController: UICollectionViewController, UICollectionViewDelegateFlowLayout {

    private let cellId = "cellId"
    let manager = APIManager()
    var resultSearch: ResearchData?
    var searchText = "Yo"
    
    var musicCategories: [MusicCategory]? {
        didSet {
            print(musicCategories)
        }
    }
    
    var typeOfSearch = ["Track", "Playlist"]
    var bool = false
    
    override func viewDidLoad() {
        super.viewDidLoad()

        collectionView?.backgroundColor = UIColor(white: 0.2, alpha: 1)
        collectionView?.alwaysBounceVertical = true
        collectionView?.register(CategoryCell.self, forCellWithReuseIdentifier: cellId)
        musicCategories = MusicCategory.sampleMusicCategories(performSearch(searchText))
    }
    
    func handleStearch(_ text: String) {
        musicCategories = MusicCategory.sampleMusicCategories(performSearch(text))
    }
    
    func performSearch(_ text: String) -> ResearchData? {
        resultSearch = manager.getSearch(text)
        bool = true
        return resultSearch
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let     cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! CategoryCell
        
        cell.musicCategory = musicCategories![indexPath.item]
        cell.backgroundColor = UIColor(white: 0.2, alpha: 1)
        return cell
    }
    
    override func willTransition(to newCollection: UITraitCollection, with coordinator: UIViewControllerTransitionCoordinator) {
        collectionViewLayout.invalidateLayout()
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if indexPath.item == 0 {
            return CGSize(width: view.frame.width, height: 70)
        } else if indexPath.item == 1 {
            return CGSize(width: view.frame.width, height: 240)
        }
        return CGSize(width: view.frame.width, height: 440)
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 3
    }
}
