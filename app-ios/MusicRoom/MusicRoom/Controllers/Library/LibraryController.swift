//
//  LibraryController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class LibraryController: UITableViewController {

    private let libraryCellId = "libraryCellId"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        tableView.separatorStyle = .none
        tableView.register(LibraryCell.self, forCellReuseIdentifier: libraryCellId)
    }
            
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: libraryCellId, for: indexPath) as! LibraryCell
        switch indexPath.row {
        case 0:
            cell.titleLabel.text = "Songs"
            cell.iconView0.image = #imageLiteral(resourceName: "songs_icon")
        case 1:
            cell.titleLabel.text = "Playlists"
            cell.iconView0.image = #imageLiteral(resourceName: "playlists_icon")
        default:
            cell.titleLabel.text = "Omg... wtf.."
        }
        cell.selectionStyle = .none
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        switch indexPath.row {
        case 0:
            print("Selected Songs Library")
        case 1:
            let vc = PlaylistController()
            self.navigationController?.pushViewController(vc, animated: true)
        default:
            print("Omg... wtf..")
        }
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return 2
    }

    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 40.0
    }
}
