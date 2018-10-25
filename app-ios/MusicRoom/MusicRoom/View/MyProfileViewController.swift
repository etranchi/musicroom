//
//  MyProfileViewController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/24/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

let settings = ["Home", "Musics", "Playlists", "Rooms", "Settings"]
class MyProfileViewController: UIViewController, UISearchBarDelegate , UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var viewToHideProfile: UIView!
    var searchBar : UISearchBar?
    var searchItem : UIBarButtonItem?
    var cancelItem : UIBarButtonItem?
    var profilItem : UIBarButtonItem?
    var profileIsVisible : Bool = false
    var selectedCell = 0
    var apiManager : APIManager = APIManager()
    
    @IBAction func panAction(_ sender: UISwipeGestureRecognizer) {
        print("pan")
        if sender.direction == .right && !profileIsVisible {
            displayProfile()
        }
        if sender.direction == .left && profileIsVisible{
            displayProfile()
        }
        
    }
    @IBOutlet weak var trailingProfile: NSLayoutConstraint!
    @IBOutlet weak var leadingProfile: NSLayoutConstraint!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        searchBar = UISearchBar()
        searchBar?.sizeToFit()
        searchBar?.delegate = self
        tableView.selectRow(at: [0,selectedCell], animated: true, scrollPosition: UITableViewScrollPosition(rawValue: selectedCell)!)
        self.navigationItem.hidesSearchBarWhenScrolling = true
        searchItem = UIBarButtonItem(barButtonSystemItem: .search, target: self, action: #selector(searchButton(_:)))
        profilItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(displayProfile))
        cancelItem = UIBarButtonItem(title: "Cancel", style: .plain, target: self, action: #selector(searchBarSearchButtonClicked(_:)))
        self.navigationItem.rightBarButtonItem = searchItem
        self.navigationItem.leftBarButtonItem = profilItem
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        displayProfile()
        let vc = ContainerViewController()
        if settings[indexPath.row] == "Musics" {
            vc.data = apiManager.getMusic()
        }
        self.title = settings[indexPath.row]
        viewToHideProfile.insertSubview(vc.view, at: 0)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return settings.count
    }

    @IBAction func displayProfile() {
        if !profileIsVisible {
            leadingProfile.constant = 200
            trailingProfile.constant = -200
        } else {
            leadingProfile.constant = 0
            trailingProfile.constant = 0
        }
        profileIsVisible = !profileIsVisible
        UIView.animate(withDuration: 0.2, delay: 0.0, options: .curveEaseIn, animations: {
            self.view.layoutIfNeeded()
        })
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MyProfile") as! MyProfileCell
        cell.data = settings[indexPath.row]
        return cell
    }
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        self.navigationItem.rightBarButtonItem = nil
        self.navigationItem.rightBarButtonItem = searchItem
        self.navigationItem.titleView = nil
        // make search
        
        self.searchBar?.text = ""
    }
    
    @IBAction func searchButton(_ sender: Any) {
        self.navigationItem.rightBarButtonItem = nil
        self.navigationItem.rightBarButtonItem = cancelItem
        searchBar?.enablesReturnKeyAutomatically = true
        self.navigationItem.titleView = searchBar
        searchBar?.becomeFirstResponder()
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
