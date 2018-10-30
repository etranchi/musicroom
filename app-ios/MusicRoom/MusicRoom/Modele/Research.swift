//
//  Research.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/29/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Research : Decodable {
    var data : [Track]
    var total : Int
}

struct ResearchData {
    var tracks : Research
    var albums : Research
    var playlists : Research
    init() {
        tracks = Research(data: [], total: -1)
        albums = Research(data: [], total: -1)
        playlists = Research(data: [], total: -1)
    }
}
