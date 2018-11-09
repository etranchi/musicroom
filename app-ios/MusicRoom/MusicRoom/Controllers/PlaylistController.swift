//
//  PlaylistController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistHomeController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    var collectionViewA: UICollectionView!
    var collectionViewB: UICollectionView!
    let collectionViewAIdentifier = "collectionViewAIdentifier"
    let collectionViewBIdentifier = "collectionViewBIdentifier"
    
    var playlists : [PlaylistHome] = [PlaylistHome]()
    
    func createPlaylistArray() {
        playlists.append(PlaylistHome(name: "playlist 1"))
        playlists.append(PlaylistHome(name: "playlist 2"))
        playlists.append(PlaylistHome(name: "playlist 3"))
        playlists.append(PlaylistHome(name: "playlist 4"))
    }
    
    func handleSearch(_ text: String) {
        
    }
    
    override func viewDidLoad() {
        let layoutA = UICollectionViewFlowLayout()
        let layoutB = UICollectionViewFlowLayout()
        
        collectionViewA = UICollectionView(frame: self.view.frame, collectionViewLayout: layoutA)
        collectionViewB = UICollectionView(frame: self.view.frame, collectionViewLayout: layoutB)
        
        collectionViewA.delegate = self
        collectionViewB.delegate = self
        
        collectionViewA.dataSource = self
        collectionViewB.dataSource = self
        
        collectionViewA.register(SearchCell.self, forCellWithReuseIdentifier: collectionViewAIdentifier)
        collectionViewB.register(PlaylistHomeCell.self, forCellWithReuseIdentifier: collectionViewBIdentifier)
        
        self.view.addSubview(collectionViewA)
        self.view.addSubview(collectionViewB)
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.item == 0 {
            let searchBarCell = collectionViewA.dequeueReusableCell(withReuseIdentifier: collectionViewAIdentifier, for: indexPath) as! SearchCell
            searchBarCell.placeholder = "playlists, events..."
            searchBarCell.vc = self
            return searchBarCell
        }
        else {
            let playlistHomeCell = collectionViewB.dequeueReusableCell(withReuseIdentifier: collectionViewBIdentifier, for: indexPath) as! PlaylistHomeCell
            print("indexpath playlists : ", indexPath.item - 1)
            playlistHomeCell.playlist = playlists[indexPath.item - 1]
            return playlistHomeCell
        }
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return playlists.count + 1
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch indexPath.item {
        case 0:
            return CGSize(width: view.frame.width, height: 40)
        default:
            return CGSize(width: view.frame.width, height: 150)
        }
    }

}

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

////class PlaylistHomeController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
//    private let categoryCellId = "categoryCellId"
//    private let searchCellId = "searchCellId"
//    private let playlistsCellId = "playlistCellId"
//
//    fileprivate var longPressGesture: UILongPressGestureRecognizer!
//    let searchCollectionView = SearchController()
//    let manager = APIManager()
//    let initialSearch = "Daft Punk"
//
//    var playlists : [PlaylistHome] = [PlaylistHome]()
//    var currentUser : [PlaylistByUserId]?
//
//    override func viewWillAppear(_ animated: Bool) {
//        super.viewWillAppear(animated)
//
//        self.navigationController?.navigationBar.topItem?.title = "Playlist"
//    }
//
//    override func viewDidLoad() {
//        super.viewDidLoad()
//        createPlaylistArray()
//
//        longPressGesture = UILongPressGestureRecognizer(target: self, action: #selector(self.handleLongGesture(gesture:)))
//        collectionView?.backgroundColor = UIColor(white: 0.15, alpha: 1)
//        collectionView?.alwaysBounceVertical = true
//        collectionView?.reorderingCadence = .fast
//        collectionView?.register(CategoryCell.self, forCellWithReuseIdentifier: categoryCellId)
//        collectionView?.register(SearchCell.self, forCellWithReuseIdentifier: searchCellId)
//        collectionView?.register(PlaylistHomeCell.self, forCellWithReuseIdentifier: playlistsCellId)
//
//        performPlaylistByUserId(1306931615) { (playlist) in
//            self.currentUser = PlaylistByUserId.samplePlaylistById(playlist)
//            self.collectionView?.reloadData()
//        }
//    }
//
//    func handleSearch(_ text: String) {
//
//    }
//
//    @objc func handleLongGesture(gesture: UILongPressGestureRecognizer) {
//        switch(gesture.state) {
//        case .began:
//            guard let selectedIndexPath = collectionView?.indexPathForItem(at: gesture.location(in: collectionView)) else {
//                break
//            }
//            collectionView?.beginInteractiveMovementForItem(at: selectedIndexPath)
//        case .changed:
//            collectionView?.updateInteractiveMovementTargetPosition(gesture.location(in: gesture.view!))
//        case .ended:
//            collectionView?.endInteractiveMovement()
//        default:
//            collectionView?.cancelInteractiveMovement()
//        }
//    }
//
//    func performPlaylistByUserId(_ userId: Int, completion: @escaping ([Playlist]) -> ()) {
//        manager.playlistsByUserId(userId) { (playlists) in
//            completion(playlists)
//        }
//    }
//
//    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
//        if indexPath.item == 0 {
//            print("item 0 : ", indexPath.item)
//            let     searchCell = collectionView.dequeueReusableCell(withReuseIdentifier: searchCellId, for: indexPath) as! SearchCell
//            searchCell.placeholder = "playlists, events..."
//            searchCell.vc = self
//            return searchCell
//         } else {
//            print("item > 0 : ", indexPath.item, "and indexPath - 1 : ", (indexPath.item - 1))
//            let playlistsCell = collectionView.dequeueReusableCell(withReuseIdentifier: playlistsCellId, for: indexPath) as! PlaylistHomeCell
//            let currentLastItem = playlists[indexPath.item - 1]
//            print("currentlastitem : ", currentLastItem, "at indexPath: ", indexPath.item)
//            playlistsCell.playlist = currentLastItem
//            return playlistsCell
//         }
//    }
//
//    override func willTransition(to newCollection: UITraitCollection, with coordinator: UIViewControllerTransitionCoordinator) {
//        collectionViewLayout.invalidateLayout()
//    }
//
//    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
//        switch indexPath.item {
//        case 0:
//            return CGSize(width: view.frame.width, height: 40)
//        default:
//            return CGSize(width: view.frame.width, height: 150)
//        }
//    }
//
//    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
//        return playlists.count + 1
//    }
//
//    override func collectionView(_ collectionView: UICollectionView, canMoveItemAt indexPath: IndexPath) -> Bool {
//        return true
//    }
//
//    override func collectionView(_ collectionView: UICollectionView, moveItemAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
//        print(sourceIndexPath)
//        print(destinationIndexPath)
//        let item = self.playlists[sourceIndexPath.item - 1]
//        print("item : ", item)
//        print(self.playlists)
//        self.playlists.insert(item, at: destinationIndexPath.item)
//        self.playlists.remove(at: sourceIndexPath.item)
//        print("after")
//        print(self.playlists)
//    }
//
//    func createPlaylistArray() {
//        playlists.append(PlaylistHome(name: "playlist 1"))
//        playlists.append(PlaylistHome(name: "playlist 2"))
//        playlists.append(PlaylistHome(name: "playlist 3"))
//        playlists.append(PlaylistHome(name: "playlist 4"))
//    }
//}
//
////extension PlaylistHomeController: UICollectionViewDragDelegate, UICollectionViewDropDelegate {
////    // Drag n drop v2
////
////    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int
////    {
////        return self.playlists.count + 1
////    }
////
////    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell
////    {
////        if indexPath.item == 0
////        {
////            let searchCell = collectionView.dequeueReusableCell(withReuseIdentifier: self.searchCellId, for: indexPath) as! SearchCell
////            searchCell.placeholder = "playlists, events..."
////            searchCell.vc = self
////            return searchCell
////        }
////        else
////        {
////            let playlistsCell = collectionView.dequeueReusableCell(withReuseIdentifier: self.playlistsCellId, for: indexPath) as! PlaylistHomeCell
////            let currentLastItem = playlists[indexPath.item - 1]
////            playlistsCell.playlist = currentLastItem
////            return playlistsCell
////
////
////        }
////    }
////
////    private func reorderItems(coordinator: UICollectionViewDropCoordinator, destinationIndexPath: IndexPath, collectionView: UICollectionView) {
////        let items = coordinator.items
////        print(items)
////        if items.count == 1, let item = items.first, let sourceIndexPath = item.sourceIndexPath {
////            var dIndexPath = destinationIndexPath
////            if dIndexPath.row >= collectionView.numberOfItems(inSection: 0)
////            {
////                dIndexPath.row = collectionView.numberOfItems(inSection: 0) - 1
////            }
////            collectionView.performBatchUpdates({
////                if collectionView === self.collectionView
////                {
////                    self.playlists.remove(at: sourceIndexPath.row)
////                    self.playlists.insert(item.dragItem.localObject as! PlaylistHome, at: dIndexPath.row - 1)
////                }
////                collectionView.deleteItems(at: [sourceIndexPath])
////                collectionView.insertItems(at: [dIndexPath])
////            })
////            coordinator.drop(items.first!.dragItem, toItemAt: dIndexPath)
////        }
////    }
////
////    func collectionView(_ collectionView: UICollectionView, itemsForBeginning session: UIDragSession, at indexPath: IndexPath) -> [UIDragItem]
////    {
////        print(self.playlists[indexPath.row - 1])
////        let item = self.playlists[indexPath.row - 1]
////        let itemProvider = NSItemProvider(object: item.name as NSString)
////        let dragItem = UIDragItem(itemProvider: itemProvider)
////        dragItem.localObject = item
////        return [dragItem]
////    }
////
////    func collectionView(_ collectionView: UICollectionView, dropSessionDidUpdate session: UIDropSession, withDestinationIndexPath destinationIndexPath: IndexPath?) -> UICollectionViewDropProposal
////    {
////        if collectionView === self.collectionView
////        {
////            if collectionView.hasActiveDrag
////            {
////                return UICollectionViewDropProposal(operation: .move, intent: .insertAtDestinationIndexPath)
////            }
////            else
////            {
////                return UICollectionViewDropProposal(operation: .forbidden)
////            }
////        }
////        else
////        {
////            if collectionView.hasActiveDrag
////            {
////                return UICollectionViewDropProposal(operation: .move, intent: .insertAtDestinationIndexPath)
////            }
////            else
////            {
////                return UICollectionViewDropProposal(operation: .copy, intent: .insertAtDestinationIndexPath)
////            }
////        }
////    }
////
////    func collectionView(_ collectionView: UICollectionView, performDropWith coordinator: UICollectionViewDropCoordinator)
////    {
////        let destinationIndexPath: IndexPath
////        if let indexPath = coordinator.destinationIndexPath
////        {
////            destinationIndexPath = indexPath
////        }
////        else
////        {
////            // Get last index path of table view.
////            let section = collectionView.numberOfSections - 1
////            let row = collectionView.numberOfItems(inSection: section)
////            destinationIndexPath = IndexPath(row: row, section: section)
////        }
////
////        switch coordinator.proposal.operation
////        {
////        case .move:
////            self.reorderItems(coordinator: coordinator, destinationIndexPath:destinationIndexPath, collectionView: collectionView)
////            break
////
//////        case .copy:
//////            self.copyItems(coordinator: coordinator, destinationIndexPath: destinationIndexPath, collectionView: collectionView)
////
////        default:
////            return
////        }
////    }
////}

