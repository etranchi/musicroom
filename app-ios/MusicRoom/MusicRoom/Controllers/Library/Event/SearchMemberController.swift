//
//  SearchMemberController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/28/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SearchMemberController: UITableViewController{
    var searchController : UISearchController!
    
    var dataUsers : [(User,Bool)] = []
    var filteredData : [(User,Bool)] = []
    var root : EventDetailController?
    var admins : Bool?
    var event : Event? {
        didSet {
            print("set")
            if let _ = event {
                print("getAllUsers")
                apiManager.getAllUsers(userManager.currentUser!.token!, completion: { (res) in
                    
                    print(res)
                        res.forEach({ (user) in
                            if (self.members != nil && (self.members?.index(where: { (ur) -> Bool in
                                return user.id == ur.id
                            })) != nil) {
                                self.dataUsers.append((user, true))
                            } else {
                                self.dataUsers.append((user, false))
                            }
                        })
                        self.filteredData = self.dataUsers
                        self.tableView.reloadData()
                })
            }
        }
    }
    var members : [User]?
    
    @objc func updateEvent() {
        let ret = dataUsers.filter({ (user, bool) -> Bool in
            return bool
        })
        let bis : [User] = ret.map({ (user, bool) -> User in
            return user
        })
        if admins! {
            event!.adminMembers = bis
        } else {
            event!.members = bis
        }
        root!.addMembersAdmins(event!)
        self.navigationController?.popViewController(animated: true)
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "reuseIdentifier")
        tableView.backgroundColor = UIColor(white: 0.1, alpha: 1)
        tableView.allowsMultipleSelection = true
        tableView.separatorStyle = .none
        let button = UIButton()
        button.setAttributedTitle(NSAttributedString(string: "Save", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.frame = CGRect(x: 0, y: 0, width: 24, height: 24)
        button.addTarget(self, action: #selector(updateEvent), for: .touchUpInside)
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: button)
        searchController = UISearchController(searchResultsController: nil)
        searchController.searchResultsUpdater = self
        searchController.dimsBackgroundDuringPresentation = false
        
        searchController.searchBar.sizeToFit()
        searchController.searchBar.showsCancelButton = false
        searchController.hidesNavigationBarDuringPresentation = false
        self.navigationItem.titleView = searchController.searchBar
        definesPresentationContext = true
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        
        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
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
        return filteredData.count
    }
    
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)
        cell.textLabel!.text = filteredData[indexPath.row].0.login
        cell.textLabel?.textColor = .white
        cell.selectionStyle = .none
        cell.isSelected = filteredData[indexPath.row].1
        if cell.isSelected {
            cell.backgroundColor = UIColor.green
        } else {
            cell.backgroundColor = UIColor(white: 0.1, alpha: 1)
        }
        // Configure the cell...
        
        return cell
    }
    
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let cell = tableView.cellForRow(at: indexPath)
        let userSelected = filteredData[indexPath.row].0
        cell?.isSelected = true
        cell?.backgroundColor = UIColor.green
        let toChange = dataUsers.index { (user, bool) -> Bool in
            if user.id == userSelected.id {
                return true
            }
            return false
        }
        if toChange != nil {
            dataUsers[toChange!].1 = true
            filteredData[indexPath.row].1 = true
            
        }
        
    }
    
    override func tableView(_ tableView : UITableView, didDeselectRowAt indexPath: IndexPath) {
        let cell = tableView.cellForRow(at: indexPath)
        let userSelected = filteredData[indexPath.row].0
        cell?.isSelected = false
        cell?.backgroundColor = UIColor(white: 0.1, alpha: 1)
        let toChange = dataUsers.index { (user, bool) -> Bool in
            if user.id == userSelected.id {
                return true
            }
            return false
        }
        if toChange != nil {
            dataUsers[toChange!].1 = false
            filteredData[indexPath.row].1 = false
        }
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


extension SearchMemberController : UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        
        if let searchText = searchController.searchBar.text {
            filteredData = searchText.isEmpty ? dataUsers : dataUsers.filter({(arg) -> Bool in
                let (user, _) = arg
                return (user.login.range(of: searchText, options: .caseInsensitive) != nil)
            })
            tableView.reloadData()
        }
    }
}

