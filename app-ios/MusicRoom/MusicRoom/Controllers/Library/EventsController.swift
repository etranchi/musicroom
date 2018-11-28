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
    var numberOfRows = 1
    private let eventCellId = "eventCellId"
    private let createCellId = "createCellId"
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        tableView.separatorStyle = .none
        tableView.register(SearchEventsCell.self, forCellReuseIdentifier: eventCellId)
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: createCellId)
        apiManager.getEvents { (res) in
            self.events = res
            self.numberOfRows = self.sections.count
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
        return 1
    }

    func presentSelectedEvent(_ event : Event) {
        let vc = EventDetailController(event)
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.row == 0 && events?.myEvents != nil && (events?.allEvents.count)! > 0  {
            let cell = tableView.dequeueReusableCell(withIdentifier: eventCellId, for: indexPath) as! SearchEventsCell
            cell.rootTarget = self
            cell.title = sections[indexPath.section]
            cell.event = events?.allEvents
            return cell
        } else if indexPath.row == 1 && events?.friendEvents != nil && (events?.friendEvents.count)! > 0 && numberOfRows > 1 {
            let cell = tableView.dequeueReusableCell(withIdentifier: eventCellId, for: indexPath) as! SearchEventsCell
            cell.rootTarget = self
            cell.title = sections[indexPath.section]
            cell.event = events?.friendEvents
            return cell
        } else {
            let cell = tableView.dequeueReusableCell(withIdentifier: createCellId, for: indexPath) as UITableViewCell
            cell.textLabel?.text = "CREATE EVENT"
            return cell
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        var height: CGFloat = 0
        if indexPath.row == 0 && (events?.allEvents.count == 0 || events?.allEvents == nil){
            return height
        } else if indexPath.section == 1 && (events?.friendEvents.count == 0 || events?.friendEvents == nil){
            return height
        } else {
            height = 240
        }
        return height
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
