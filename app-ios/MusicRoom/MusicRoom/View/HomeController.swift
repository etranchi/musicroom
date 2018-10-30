//
//  MyProfileViewController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/24/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

var settings : [String] = ["Search", "Musics", "Playlists", "Settings"]


class HomeController: UIViewController, UITableViewDelegate, UITableViewDataSource, DZRPlayerDelegate{
    
    // @IBOutlet weak var tableViewFront: UITableView!
    var tracks : [Track] = []
    var playlists : [Playlist] = []
    var searchBar : UISearchBar?
    var searchItem : UIBarButtonItem?
    var cancelItem : UIBarButtonItem?
    var profilItem : UIBarButtonItem?
    var player : DZRPlayer?
    var deezer : DeezerManager = DeezerManager()
    var profileIsVisible : Bool = false
    var selectedCell = 0
    var apiManager : APIManager = APIManager()
    
    @IBAction override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let txt = sender as? String {
            if let musicVC = segue.destination as? MusicController {
                musicVC.title = txt
                musicVC.tracks = apiManager.getMusic()
            }
            if let settingsVC = segue.destination as? SettingsController {
                settingsVC.title = txt
                settingsVC.manager = apiManager
            }
            if let playlistVC = segue.destination as? PlaylistController {
                playlistVC.title = txt
                playlistVC.manager = apiManager
            }
            if let searchVC = segue.destination as? SearchController {
                searchVC.title = txt
                searchVC.manager = apiManager
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        /* searchBar = UISearchBar()
        searchBar?.sizeToFit()
        searchBar?.delegate = self*/
        // tableViewBack.selectRow(at: [0,selectedCell], animated: true, scrollPosition: UITableViewScrollPosition(rawValue: selectedCell)!)
        // self.navigationItem.hidesSearchBarWhenScrolling = true
        // searchItem = UIBarButtonItem(barButtonSystemItem: .search, target: self, action: #selector(searchButton(_:)))
        // profilItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(displayProfile))
        // cancelItem = UIBarButtonItem(title: "Cancel", style: .plain, target: self, action: #selector(searchBarSearchButtonClicked(_:)))
        // self.navigationItem.rightBarButtonItem = searchItem
        // self.navigationItem.leftBarButtonItem = profilItem
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        switch settings[indexPath.row] {
            case "Settings":
                performSegue(withIdentifier: "GoToSettings", sender: settings[indexPath.row])
            case "Musics":
                performSegue(withIdentifier: "GoToMusics", sender: settings[indexPath.row])
            case "Playlists":
                performSegue(withIdentifier: "GoToPlaylists", sender: settings[indexPath.row])
            case "Search":
                performSegue(withIdentifier: "GoToSearch", sender: settings[indexPath.row])
        default:
            break
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return settings.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell") as! HomeCell
        cell.data = settings[indexPath.row]
        return cell
    }
    
    /*func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        self.navigationItem.rightBarButtonItem = nil
        self.navigationItem.rightBarButtonItem = searchItem
        self.navigationItem.titleView = nil
        // make search
        
        self.searchBar?.text = ""
    }*/
    
/*    @IBAction func searchButton(_ sender: Any) {
        self.navigationItem.rightBarButtonItem = nil
        self.navigationItem.rightBarButtonItem = cancelItem
        searchBar?.enablesReturnKeyAutomatically = true
        self.navigationItem.titleView = searchBar
        searchBar?.becomeFirstResponder()
    }*/
    
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
