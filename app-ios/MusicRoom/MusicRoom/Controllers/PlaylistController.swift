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
    
    
    func createProductArray() {
        tracks.append(PlaylistTrack(name: "name1", artist: "artist1"))
        tracks.append(PlaylistTrack(name: "name2", artist: "artist2"))
        tracks.append(PlaylistTrack(name: "name3", artist: "artist3"))
        tracks.append(PlaylistTrack(name: "name4", artist: "artist4"))
    }
}

class PlaylistHomeController: UITableViewController {
    
    let cellId = "cellId"
    let manager = APIManager()
    
    var edit : Bool = false
    var playlists : [PlaylistHome] = [PlaylistHome]()
    var currentUser : [PlaylistByUserId]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        createPlaylistArray()
        navigationItem.title = "Playlists"
        
        let editBtn = UIBarButtonItem(title: "Edit your playlists", style: UIBarButtonItemStyle.plain, target: self, action: #selector(showEditingMode))
        navigationItem.rightBarButtonItem = editBtn
        navigationController?.navigationBar.tintColor = .white
        
        tableView.estimatedRowHeight = tableView.rowHeight
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.backgroundColor = UIColor(white: 0.2, alpha: 1)
        tableView.register(PlaylistHomeCell.self, forCellReuseIdentifier: cellId)
        
        performPlaylistByUserId(1306931615) {(playlist) in
            self.currentUser = PlaylistByUserId.samplePlaylistById(playlist)
            self.tableView?.reloadData()
        }
    }
    
    func performPlaylistByUserId(_ userId: Int, completion: @escaping ([Playlist]) -> ()) {
        manager.playlistsByUserId(userId) { (playlists) in
            completion(playlists)
        }
    }
    
    @objc func showEditingMode(sender: UIBarButtonItem) {
        print(tableView.isEditing)
        edit = !edit
        tableView.setEditing(!tableView.isEditing, animated: true)
        navigationItem.rightBarButtonItem?.title = tableView.isEditing ? "Done" : "Edit your playlists"
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return playlists.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! PlaylistHomeCell
        
        let currentLastItem = playlists[indexPath.row]
        cell.playlist = currentLastItem
        
        return cell
    }
    
    // MARK: - Edit Tableview
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == UITableViewCellEditingStyle.delete {
            self.playlists.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: UITableViewRowAnimation.automatic)
        }
    }
    
    // MARK: - Moving Cells
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    override func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath)
    {
        let cellToMove = self.playlists[sourceIndexPath.row]
        
        // move targeted cell
        self.playlists.insert(cellToMove, at: destinationIndexPath.row)
        
        // remove cell
        self.playlists.remove(at: sourceIndexPath.row)
    }
    
    //  Move to playlist controller
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        navigationController?.pushViewController(PlaylistController(), animated: true)
    }
    
    func createPlaylistArray() {
        playlists.append(PlaylistHome(name: "playlist 1"))
        playlists.append(PlaylistHome(name: "playlist 2"))
        playlists.append(PlaylistHome(name: "playlist 3"))
        playlists.append(PlaylistHome(name: "playlist 4"))
    }
}

