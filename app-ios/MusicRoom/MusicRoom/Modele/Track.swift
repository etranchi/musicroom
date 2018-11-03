//
//  Track.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/26/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct TrackAlbum : Decodable {
    let id : Int
    let title : String
    let tracklist : String
    let cover : String
    let cover_medium : String
    let cover_big : String
    let cover_small : String
}

struct TrackArtist : Decodable {
    let id : Int
    let name : String
    let picture : String
    
}
struct Track : Decodable {
    let id : Int
    let readable : Bool
    let link : String
    let album : TrackAlbum
    let artist : TrackArtist
    let title : String
    let duration : Int
}

struct TrackData: Decodable {
    let data : [Track]
}
