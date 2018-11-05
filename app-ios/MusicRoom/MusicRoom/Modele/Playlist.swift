//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/5/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Playlist : Decodable {
    let id : Int
    let title : String
    let picture : String
    let tracklist : String
    let tracks : TrackData?
}

// stucture model tracks PlaylistTableView

struct PlaylistTrack {
    let name : String
    let artist : String
}

struct PlaylistHome {
    let name : String
}
