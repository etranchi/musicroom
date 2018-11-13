//
//  SeeAllSongsController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/7/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

private let reuseIdentifier = "Cell"

class SeeAllSongsController: UICollectionViewController, UICollectionViewDelegateFlowLayout {

    let tracks: [Track]
    let searchText: String
    let searchController: SearchController

    init(_ tracks: [Track], _ searchText: String, _ traget: SearchController, layout: UICollectionViewFlowLayout) {
        self.tracks = tracks
        self.searchText = searchText
        self.searchController = traget
        super.init(collectionViewLayout: layout)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        title = ""
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        title = "\"\(searchText)\" in Songs"
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        
        self.collectionView!.register(SongCell.self, forCellWithReuseIdentifier: reuseIdentifier)
        collectionView?.alwaysBounceVertical = true
        collectionView?.backgroundColor = UIColor(white: 0.1, alpha: 1)
        
    }

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }
    
    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        searchController.showPlayerForSong(indexPath.item)
        currentTrack = tracks[indexPath.item]
        collectionView.reloadData()
    }


    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return tracks.count
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: reuseIdentifier, for: indexPath) as! SongCell
        
        cell.backgroundColor = UIColor(white: 0.1, alpha: 1)
        cell.track = tracks[indexPath.item]
        cell.titleLabel.textColor = .white
        if tracks[indexPath.item].id == currentTrack?.id {
            cell.titleLabel.textColor = UIColor(red: 20 / 255, green: 220 / 255, blue: 20 / 255, alpha: 1)
        }
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets(top: 0, left: 14, bottom: 50, right: 14)
    }
    
    
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: view.bounds.width - 28, height: 60)
    }
    
    
}
