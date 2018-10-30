//
//  MusicController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/29/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class MusicController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    @IBOutlet weak var tableView: UITableView!
    var tracks : [Track]?

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tracks!.count
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let vc = segue.destination as? PlayerController {
            if let index = sender as? Int {
                vc.title = tracks?[index].title
                vc.input = tracks?[index]
            }
        }
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        performSegue(withIdentifier: "GoToPlayer", sender: indexPath.row)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MusicCell") as! MusicCell
        cell.data = tracks?[indexPath.row]
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
