//
//  PlayerController.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlayerController: UIViewController {
    let tracks: [Track]
    var index: Int
    
    init(_ tracks: [Track], _ index: Int) {
        self.tracks = tracks
        self.index = index
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        print("playing \(tracks[index].title) from \(tracks[index].artist.name)")
    }
}
