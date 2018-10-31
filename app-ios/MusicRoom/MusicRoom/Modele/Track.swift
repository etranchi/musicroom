//
//  Track.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/26/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

class MusicCategory: NSObject {
    var     name: String?
    var     tracks: [Track]?
    
    static func sampleMusicCategories(_ results: ResearchData?) -> [MusicCategory]
    {
        let     searchCategory = MusicCategory()
        let     songsCategory = MusicCategory()
        let     albumCategory = MusicCategory()
        
        searchCategory.name = "Search"
        songsCategory.name = "Songs"
        albumCategory.name = "Albums"
        
        searchCategory.tracks = []
        songsCategory.tracks = results?.tracks.data
        albumCategory.tracks = results?.albums.data
        
        return [searchCategory, albumCategory, songsCategory]
    }
}

struct Album : Decodable {
    let id : Int
    let title : String
    let tracklist : String
    let cover : String
}

struct Artist : Decodable {
    let id : Int
    let name : String
    let picture : String
    
}
struct Track : Decodable {
    let id : Int
    let readable : Bool
    let link : String
    let album : Album
    let artist : Artist
    let title : String
    let duration : Int
}
