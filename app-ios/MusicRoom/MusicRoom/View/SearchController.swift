//
//  SearchController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/29/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SearchController: UIViewController, UISearchBarDelegate, UITableViewDelegate, UITableViewDataSource {
    var manager : APIManager?
    var resultSearch : ResearchData?
    var typeOfSearch = ["Track","Album"]
    var bool : Bool = false
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var searchBar: UISearchBar!
    override func viewDidLoad() {
        super.viewDidLoad()
        searchBar.becomeFirstResponder()
        // Do any additional setup after loading the view.
    }

    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        if let text = searchBar.text {
            resultSearch = manager?.getSearch(text)
            searchBar.resignFirstResponder()
            bool = true
            tableView.reloadData()
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MusicCell") as! MusicCell
        if indexPath.section == 0 {
            cell.data = resultSearch?.tracks.data[indexPath.row]
        }
        else {
            cell.search = resultSearch?.albums.data[indexPath.row]
        }
        return cell
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return typeOfSearch[section]
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return bool ? typeOfSearch.count : 0
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "SearchMusic" {
            if let vc = segue.destination as? PlayerController {
                if let music = sender as? Track {
                    vc.input = music
                }
               
            }
        }
        if segue.identifier == "SearchPlaylist" {
            if let vc = segue.destination as? MusicController{
                if let playlist = sender as? Playlist {

                }
            }
        }
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section == 0 {
            print("section 000000 ")
            performSegue(withIdentifier: "SearchMusic", sender: resultSearch?.tracks.data[indexPath.row])
        }
        if indexPath.section == 1 {
            print("section 11111 ")
            performSegue(withIdentifier: "SearchPlaylist", sender: resultSearch?.albums.data[indexPath.row])
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if !bool {
            return 0
        }
        switch section {
        case 0:
            return (resultSearch?.tracks.data.count)! > 3 ? 3 : (resultSearch?.tracks.data.count)!
        case 1:
            return (resultSearch?.albums.data.count)! > 3 ? 3 : (resultSearch?.albums.data.count)!
        default:
            return 0
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
