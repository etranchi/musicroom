//
//  MusicCategory.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/2/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

class MusicCategory: NSObject {
    var     name: String?
    var     tracks: [Track]?
    var     albums: [Album]?
    var     artists: [Artist]?
    
    static func sampleMusicCategories(_ albums: [Album], _ tracks: [Track], _ artists: [Artist]) -> [MusicCategory]
    {
        let     songsCategory = MusicCategory()
        let     albumsCategory = MusicCategory()
        let     artistsCategory = MusicCategory()
        
        songsCategory.name = "Songs"
        albumsCategory.name = "Albums"
        artistsCategory.name = "Artists"
        
        songsCategory.tracks = tracks
        albumsCategory.albums = albums
        artistsCategory.artists = artists
        
        return [albumsCategory, songsCategory, artistsCategory]
    }
}
