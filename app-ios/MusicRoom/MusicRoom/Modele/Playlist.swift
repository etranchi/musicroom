//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/26/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Creator : Decodable {
    let id : Int
    let name : String
    let tracklist : String
    let type : String
}

struct ResearchTrack : Decodable {
    let data: [Track]
}

struct Playlist : Decodable {
    let id : Int
    let title : String
    let duration : Int
    let picture : String
    let tracklist : String
    let creator : Creator
    let tracks : ResearchTrack
}
