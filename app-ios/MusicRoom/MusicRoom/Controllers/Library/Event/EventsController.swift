//
//  EventsController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/27/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class EventsController: UITableViewController {
    let sections = ["My Events", "Friend's Event"]
    var events : DataEvent?
    private let eventCellId = "eventCellId"
    private let createCellId = "createCellId"
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        navigationController?.navigationBar.topItem?.title = "Your Events"
        tableView.separatorStyle = .none
        tableView.allowsSelection = false
        tableView.register(SearchEventsCell.self, forCellReuseIdentifier: eventCellId)
        tableView.register(CreateButtonCell.self, forCellReuseIdentifier: createCellId)
        apiManager.getEvents { (res) in
            self.events = res
            print(res.myEvents.count)
            print(res.friendEvents.count)
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
        return self.sections.count + 1
    }

    func reloadEvent() {
        apiManager.getEvents { (res) in
            self.events = res
            self.tableView.reloadData()
        }
    }
    
    func presentSelectedEvent(_ event : Event, img : UIImage) {
        let vc = EventDetailController(event)
        vc.root = self
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.row == 0 && events?.myEvents != nil {
            let cell = tableView.dequeueReusableCell(withIdentifier: eventCellId, for: indexPath) as! SearchEventsCell
            cell.rootTarget = self
            cell.title = sections[indexPath.row]
            cell.event = events?.myEvents
            return cell
        } else if indexPath.row == 1 && events?.friendEvents != nil {
            let cell = tableView.dequeueReusableCell(withIdentifier: eventCellId, for: indexPath) as! SearchEventsCell
            cell.rootTarget = self
            cell.title = sections[indexPath.row]
            cell.event = events?.friendEvents
            return cell
        } else {
            let cell = tableView.dequeueReusableCell(withIdentifier: createCellId, for: indexPath) as! CreateButtonCell
            cell.isCreating = true
            cell.rootEvents = self
            cell.backgroundColor = UIColor(white: 0.1, alpha: 1)
            cell.createButton.backgroundColor = UIColor(red: 40 / 255, green: 180 / 255, blue: 40 / 255, alpha: 1)
            cell.title = "CREATE EVENT"
            return cell
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        let height: CGFloat = 0
        if indexPath.row == 0 && (events?.myEvents.count == 0 || events?.myEvents == nil){
            return height
        } else if indexPath.row == 1 && (events?.friendEvents.count == 0 || events?.friendEvents == nil){
            return height
        } else if (indexPath.row == sections.count) {
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
