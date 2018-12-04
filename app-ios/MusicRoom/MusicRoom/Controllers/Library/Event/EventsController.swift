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
        navigationController?.navigationBar.topItem?.title = "Your Events"
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

    func reloadEvent() {
        apiManager.getEvents { (res) in
            self.events = res
            self.numberOfRows = self.sections.count
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
            cell.title = sections[indexPath.section]
            cell.event = events?.myEvents
            return cell
        } else if indexPath.row == 1 && events?.friendEvents != nil {
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
        let height: CGFloat = 0
        if indexPath.row == 0 && (events?.myEvents.count == 0 || events?.myEvents == nil){
            return height
        } else if indexPath.row == 1 && (events?.friendEvents.count == 0 || events?.friendEvents == nil){
            return height
        }
        return 240
    }
}
