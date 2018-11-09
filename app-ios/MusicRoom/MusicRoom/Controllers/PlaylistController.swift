//
//  PlaylistController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistController: UITableViewController {
    
    let cellId = "cellId"
    let manager = APIManager()
    
    var edit : Bool = false
    var tracks : [PlaylistTrack] = [PlaylistTrack]()
    
    func createProductArray() {
        tracks.append(PlaylistTrack(name: "name1", artist: "artist1"))
        tracks.append(PlaylistTrack(name: "name2", artist: "artist2"))
        tracks.append(PlaylistTrack(name: "name3", artist: "artist3"))
        tracks.append(PlaylistTrack(name: "name4", artist: "artist4"))
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        createProductArray()
        let editBtn = UIBarButtonItem(title: "Edit current playlist", style: UIBarButtonItemStyle.plain, target: self, action: #selector(showEditingMode))
        navigationItem.rightBarButtonItem = editBtn
        navigationController?.navigationBar.tintColor = .white
        
        tableView.backgroundColor = UIColor(white: 0.2, alpha: 1)
        tableView.estimatedRowHeight = tableView.rowHeight
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.register(PlaylistCell.self, forCellReuseIdentifier: cellId)
        
    }
    
    @objc func showEditingMode(sender: UIBarButtonItem) {
        print(tableView.isEditing)
        edit = !edit
        tableView.setEditing(!tableView.isEditing, animated: true)
        navigationItem.rightBarButtonItem?.title = tableView.isEditing ? "Done" : "Edit current playlist"
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! PlaylistCell
        let currentLastItem = tracks[indexPath.row]
        print(currentLastItem)
        cell.track = currentLastItem
        return cell
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tracks.count
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 50
    }
    
    // MARK: - Edit Tableview
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == UITableViewCellEditingStyle.delete {
            self.tracks.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: UITableViewRowAnimation.automatic)
        }
    }
    
    // MARK: - Moving Cells
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    override func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath)
    {
        let cellToMove = self.tracks[sourceIndexPath.row]
        
        // move targeted cell
        self.tracks.insert(cellToMove, at: destinationIndexPath.row)
        
        // remove cell
        self.tracks.remove(at: sourceIndexPath.row)
    }
}


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
        createPlaylistArray()
        collectionViewB?.alwaysBounceVertical = true
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
            print("indexpath in search", indexPath.item)
            print("end searchCell")
            return searchBarCell
        }
        else if indexPath.item <= playlists.count {
            print("count : ", playlists.count)
            let playlistHomeCell = collectionViewB.dequeueReusableCell(withReuseIdentifier: collectionViewBIdentifier, for: indexPath) as! PlaylistHomeCell
            print("indexpath playlists : ", indexPath.item - 1)
            print(playlists[indexPath.item - 1])
            playlistHomeCell.playlist = playlists[indexPath.item - 1]
            return playlistHomeCell
        }
        else {
            let searchBarCell = collectionViewA.dequeueReusableCell(withReuseIdentifier: collectionViewAIdentifier, for: indexPath) as! SearchCell
            searchBarCell.placeholder = "playlists, events..."
            searchBarCell.vc = self
            print("indexpath in search", indexPath.item)
            print("end searchCell else")
            return searchBarCell
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
    
    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        navigationController?.pushViewController(PlaylistController(), animated: true)
    }
}
