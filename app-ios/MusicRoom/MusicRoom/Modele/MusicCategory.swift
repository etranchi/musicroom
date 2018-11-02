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
    
    static func sampleMusicCategories(_ albums: [Album], _ tracks: [Track]) -> [MusicCategory]
    {
        let     songsCategory = MusicCategory()
        let     albumCategory = MusicCategory()
        
        songsCategory.name = "Songs"
        albumCategory.name = "Albums"
        
        songsCategory.tracks = tracks
        albumCategory.albums = albums
        
        return [albumCategory, songsCategory]
    }
}
