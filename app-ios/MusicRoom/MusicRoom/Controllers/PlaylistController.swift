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
    var edit : Bool = false
    var tracks : [PlaylistTrack] = [PlaylistTrack]()
    override func viewDidLoad() {
        super.viewDidLoad()
        createProductArray()
        let editBtn = UIBarButtonItem(title: "Edit", style: UIBarButtonItemStyle.plain, target: self, action: #selector(showEditingMode))
        navigationItem.rightBarButtonItem = editBtn
        
        tableView.backgroundColor = UIColor(white: 0.2, alpha: 1)
        tableView.estimatedRowHeight = tableView.rowHeight
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.register(PlaylistCell.self, forCellReuseIdentifier: cellId)
    }
    
    @objc func showEditingMode(sender: UIBarButtonItem) {
        print(tableView.isEditing)
        edit = !edit
        tableView.setEditing(!tableView.isEditing, animated: true)
        navigationItem.rightBarButtonItem?.title = tableView.isEditing ? "Done" : "Edit"
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
    var playlists : [PlaylistHome] = [PlaylistHome]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        createPlaylistArray()
        navigationItem.title = "Playlists"
        
        tableView.estimatedRowHeight = tableView.rowHeight
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.backgroundColor = UIColor(white: 0.2, alpha: 1)
        tableView.register(PlaylistHomeCell.self, forCellReuseIdentifier: cellId)
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return playlists.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! PlaylistHomeCell
        
        let currentLastItem = playlists[indexPath.row]
        print(currentLastItem)
        cell.playlist = currentLastItem
        
        return cell
    }
    
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

