//
//  PlaylistsController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 12/7/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistsController: UITableViewController {
    let sections = ["My Playlists", "Friend's Playlist"]
    var playlists : DataPlaylist?
    var firstLoad = true
    var isAddingSong = false
    var track: Track?
    private let playlistCellId = "playlistCellId"
    private let createCellId = "createCellId"
    private let defaultCellId = "defaultCellId"
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        navigationController?.navigationBar.topItem?.title = "Playlists"
        tableView.separatorStyle = .none
        tableView.allowsSelection = false
        tableView.register(SearchPlaylistCell.self, forCellReuseIdentifier: playlistCellId)
        tableView.register(CreateButtonCell.self, forCellReuseIdentifier: createCellId)
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: defaultCellId)
        apiManager.getPlaylists { (res) in
            self.playlists = res
            self.tableView.reloadData()
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return self.sections.count + 2
    }
    
    func reloadEvent() {
        apiManager.getPlaylists { (res) in
            self.playlists = res
            self.tableView.reloadData()
        }
    }
    func reloadPlaylists() {
        apiManager.getPlaylists { (playlists) in
            self.playlists = playlists
            self.tableView.reloadData()
        }
    }
    
    func addSongToPlaylist(_ playlist: Playlist) {
        if let song = track {
            apiManager.addTrackToPlaylist(playlist._id!, song)
        }
        handleCancel()
    }
    
    @objc func handleCancel() {
        dismiss(animated: true, completion: nil)
    }
    
    func createPlaylistPopUp() {
        let alert = UIAlertController(title: "Playlist creation", message: "What's your playlist's name?", preferredStyle: .alert)
        alert.addTextField { (textField) in
            textField.placeholder = "playlist's name"
        }
        
        alert.addAction(UIAlertAction(title: "Create", style: .default, handler: { [weak alert] (_) in
            let textField = alert!.textFields![0]
            if let text = textField.text, text != "" {
                apiManager.createPlaylist("title=" + text, self)
            }
        }))
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.row == 0 && playlists?.myPlaylists != nil {
            let cell = tableView.dequeueReusableCell(withIdentifier: playlistCellId, for: indexPath) as! SearchPlaylistCell
            cell.rootTarget = self
            cell.title = sections[indexPath.row]
            cell.playlist = playlists?.myPlaylists
            return cell
        } else if indexPath.row == 1 && playlists?.friendPlaylists != nil {
            let cell = tableView.dequeueReusableCell(withIdentifier: playlistCellId, for: indexPath) as! SearchPlaylistCell
            cell.rootTarget = self
            cell.title = sections[indexPath.row]
            cell.playlist = playlists?.friendPlaylists
            return cell
        } else if indexPath.row == sections.count {
            let cell = tableView.dequeueReusableCell(withIdentifier: createCellId, for: indexPath) as! CreateButtonCell
            cell.isCreating = true
            cell.root = self
            cell.backgroundColor = UIColor(white: 0.1, alpha: 1)
            cell.createButton.backgroundColor = UIColor(red: 40 / 255, green: 180 / 255, blue: 40 / 255, alpha: 1)
            cell.title = "CREATE PLAYLIST"
            return cell
        }
        else if indexPath.row == sections.count + 1 {
            let cell = tableView.dequeueReusableCell(withIdentifier: createCellId, for: indexPath) as! CreateButtonCell
            cell.isCreating = false
            cell.root = self
            cell.backgroundColor = UIColor(white: 0.1, alpha: 1)
            cell.createButton.backgroundColor = UIColor(red: 100 / 255, green: 100 / 255, blue: 140 / 255, alpha: 1)
            cell.title = "IMPORT PLAYLIST"
            return cell
        }
        else {
            let cell = tableView.dequeueReusableCell(withIdentifier: defaultCellId, for: indexPath) as UITableViewCell
            cell.textLabel?.text = "DEFAULT"
            return cell
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        let height: CGFloat = 0
        if indexPath.row == 0 && (playlists?.myPlaylists?.count == 0 || playlists?.myPlaylists == nil){
            return height
        } else if indexPath.row == 1 && (playlists?.friendPlaylists?.count == 0 || playlists?.friendPlaylists == nil){
            return height
        } else if( indexPath.row == sections.count + 1  || indexPath.row == sections.count) {
            return 60
        }
        return 240
    }
    
    
    /*
     // Override to support conditional editing of the table view.
     override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
     // Return false if you do not want the specified item to be editable.
     return true
     }
     */
    
    /*
     // Override to support editing the table view.
     override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
     if editingStyle == .delete {
     // Delete the row from the data source
     tableView.deleteRows(at: [indexPath], with: .fade)
     } else if editingStyle == .insert {
     // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
     }
     }
     */
    
    /*
     // Override to support rearranging the table view.
     override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {
     
     }
     */
    
    /*
     // Override to support conditional rearranging of the table view.
     override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
     // Return false if you do not want the item to be re-orderable.
     return true
     }
     */
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
     // Get the new view controller using segue.destinationViewController.
     // Pass the selected object to the new view controller.
     }
     */
    
}
