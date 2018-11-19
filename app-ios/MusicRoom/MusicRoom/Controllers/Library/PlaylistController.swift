//
//  PlaylistController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/19/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistController: UIViewController {
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        navigationController?.navigationBar.topItem?.title = ""
        title = "Your Playlists"
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        navigationController?.navigationBar.topItem?.title = "Your Library"
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .yellow
        print(userManager.currentUser!.token!)
        
    }
}
