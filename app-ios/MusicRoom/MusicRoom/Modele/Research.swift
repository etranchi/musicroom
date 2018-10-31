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

struct SearchAlbum : Decodable {
    let id : Int
    let title : String
    let link : String
    let artist : Artist
}
struct ResearchAlbum : Decodable {
    let data : [SearchAlbum]
}

struct ResearchData {
    var tracks : Research
    var albums : ResearchAlbum
    init() {
        tracks = Research(data: [], total: -1)
        albums = ResearchAlbum(data: [])
    }
}
