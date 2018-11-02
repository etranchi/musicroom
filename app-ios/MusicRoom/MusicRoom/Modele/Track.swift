//
//  Track.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/26/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation


struct Album : Decodable {
    let id : Int
    let title : String
    let cover : String
    let tracks : STrack?
}

struct Artist : Decodable {
    let id : Int
    let name : String
    let picture : String?
}

struct SAlbum : Decodable {
    let data : [Album]
}

struct Track : Decodable {
    let id : Int
    let readable : Bool
    let link : String
    let album : Album?
    let artist : Artist
    let title : String
    let duration : Int
}
struct STrack : Decodable {
    let data: [Track]
}
