//
//  AlbumController.swift
//  MusicRoom
//
//  Created by jdavin on 11/11/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class AlbumController: UITableViewController {

    let album: Album
    var tracks: [Track]?
    
    init(_ album: Album) {
        self.album = album
        super.init(nibName: nil, bundle: nil)
        self.tracks = AlbumTracksToTracksConverter()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        guard album.tracks != nil else { return }
        
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


extension AlbumController {
    func AlbumTracksToTracksConverter() -> [Track] {
        var tracks: [Track] = []
        
        album.tracks?.forEach({ (track) in
            let tr = Track.init(id: track.id, readable: track.readable, link: nil, album: nil, artist: nil, title: track.title, duration: track.duration)
            tracks.append(tr)
        })
        return tracks
    }
}
