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
    var selectedTrack : Int = 0
    var footerView : UIView?
    var playerManager = PlayerController()
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tracks!.count
    }
    

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        selectedTrack = indexPath.row
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MusicCell") as! MusicCell
        cell.data = tracks?[indexPath.row]
        cell.showsReorderControl = true
        return cell
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        footerView = UIView(frame: CGRect(x: 0, y: (self.view.frame.height - 50), width: self.view.frame.width, height: 50))
        footerView?.backgroundColor = .red
        let backButton = UIButton(frame: CGRect(x: (footerView?.frame.width)! / 4 - 10 , y: 10, width: 20, height: 10))
        backButton.backgroundColor = .white
        footerView?.addSubview(backButton)
        let playButton = UIButton(frame: CGRect(x: (footerView?.frame.width)! / 2 - 10, y: 10, width: 20, height: 10))
        playButton.backgroundColor = .white
        playButton.addTarget(self, action: #selector(handlePlayer), for: .touchUpOutside)
        footerView?.addSubview(playButton)
        let nextButton = UIButton(frame : CGRect(x: (((footerView?.frame.width)! * 3) / 4) - 10, y: 10, width: 20, height: 10))
        nextButton.backgroundColor = .white
        footerView?.addSubview(nextButton)
        tableView.isEditing = true
        self.view.addSubview(footerView!)
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @objc func handlePlayer() {
    
    }
}

extension MusicController {
    func tableView(_ tableView: UITableView, editingStyleForRowAt indexPath: IndexPath) -> UITableViewCell.EditingStyle {
        return .none
    }
    
    
    func tableView(_ tableView: UITableView, shouldIndentWhileEditingRowAt indexPath: IndexPath) -> Bool {
        return false
    }
    
    func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
        let data = tracks![sourceIndexPath.row]
        tracks!.remove(at: sourceIndexPath.row)
        tracks!.insert(data, at: destinationIndexPath.row)

    }
    func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        return true
    }
}
