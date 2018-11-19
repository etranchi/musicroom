//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/5/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Playlist : Decodable {
    let userId : Int
    let isPublic : Int
    let id : Int
    let nbTracks : Int
    let title : String
    let picture : String
    let link : String
    let tracklist : String
    let tracks : TrackData?
}

struct PlaylistData: Decodable {
    let data : [Playlist]
}
