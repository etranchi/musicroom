//
//  PlaylistController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/29/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistController: UIViewController, UITableViewDelegate, UITableViewDataSource{
    var manager : APIManager? {
        didSet {
            self.playlists = (manager?.getPlaylist())!
        }
    }
    var typeOfPlaylist = ["Mine", "Shared", "Public"]
    
    var playlists : [Playlist] = []
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return typeOfPlaylist.count
    }
    
    
    @IBAction override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let vc = segue.destination as? DisplayPlaylistController {
            if let index = sender as? Int {
                vc.title = typeOfPlaylist[index]
                vc.playlists = playlists
                print(vc.playlists)
            }
        }
    }
    
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        switch typeOfPlaylist[indexPath.row] {
            case "Mine" :
                performSegue(withIdentifier: "GoToOnePlaylist", sender: indexPath.row)
            case "Shared" :
                print("Shared")
            case "Public" :
                print("Public")
        default : print("Default")
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell") as! HomeCell
        cell.data = typeOfPlaylist[indexPath.row]
        return cell
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}
