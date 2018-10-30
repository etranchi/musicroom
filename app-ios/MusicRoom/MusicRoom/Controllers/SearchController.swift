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
    var typeOfSearch = ["Track", "Playlist"]
    var bool = false
    
    override func viewDidLoad() {
        super.viewDidLoad()

        collectionView?.backgroundColor = UIColor(white: 0.2, alpha: 1)
        collectionView?.alwaysBounceVertical = true
        collectionView?.register(CategoryCell.self, forCellWithReuseIdentifier: cellId)
    }
    
    func fake_track() -> [Track] {
        resultSearch = manager.getSearch("Daft Punk")
        bool = true
        return resultSearch!.tracks.data
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let     cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId, for: indexPath) as! CategoryCell
        
        cell.tracks = fake_track()
        cell.backgroundColor = UIColor(white: 0.2, alpha: 1)
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: view.frame.width, height: 240)
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 3
    }
}
