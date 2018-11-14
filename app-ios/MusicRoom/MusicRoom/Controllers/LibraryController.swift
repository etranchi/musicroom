//
//  LibraryController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class LibraryController: UITableViewController {

    var user : MyUser?
    var userManager : UserManager?
    
    @objc func handleWheel() {
        let vc = SettingsController()
        vc.user = user
        vc.userManager = userManager
        self.navigationController?.pushViewController(vc, animated: true)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let button = UIButton(type: .system)
        button.setImage(UIImage(named:"reglage")?.withRenderingMode(.automatic), for: .normal)
        button.frame = CGRect(x: 0, y: 0, width: 24, height: 24)
        button.contentMode = .scaleAspectFill
        button.addTarget(self, action: #selector(handleWheel), for: .touchUpInside)
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: button)
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 0
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return 0
    }

}
