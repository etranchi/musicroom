//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/5/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Playlist : Codable {
    let id : Int
    let title : String
    let picture : String
    let tracklist : String
    let tracks : TrackData?
}

struct PlaylistData: Codable {
    let data : [Playlist]
}
