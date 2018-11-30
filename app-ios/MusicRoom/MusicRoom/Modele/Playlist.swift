//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/5/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Creator: Codable {
    var id: Int?
    var name: String
}

struct Playlist: Codable {
    var creator: Creator?
    var tracks: PlaylistTrackData?
    var title: String
    var picture_medium: String?
    var _id : String?
    var id: Int?
}

struct PlaylistToPut: Codable {
    var creator: Creator?
    var tracks: [Track]?
    var title: String
    var picture_medium: String?
    var _id : String?
    var id: Int?
    
    enum CodingKeys: String, CodingKey {
        case creator
        case tracks
        case title
        case picture_medium
        case _id
        case id
    }
    
    enum ProductKeys: String, CodingKey {
        case PlaylistToPut
    }
}
