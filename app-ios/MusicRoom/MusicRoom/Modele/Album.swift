//
//  Album.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/2/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct AlbumArtist : Decodable {
    let id : Int
    let name : String
    let picture : String
    
}
struct Album : Decodable {
    let id : Int
    let link : String
    let cover : String
    let cover_medium : String
    let artist : AlbumArtist
    let title : String
}

struct AlbumData: Decodable {
    let data : [Album]
}
