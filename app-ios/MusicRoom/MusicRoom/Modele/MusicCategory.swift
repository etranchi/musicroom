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
    var     tracks: [Track]
    var     albums: [Album]
    var     artists: [Artist]
    var     playlists : [Playlist]
    init(_ named: String) {
        name = named
        tracks = []
        albums = []
        artists = []
        playlists = []
    }
    
    static func sampleMusicCategories(_ albums: [Album], _ tracks: [Track], _ artists: [Artist], _ playlists : [Playlist]) -> [MusicCategory]
    {
        let     songsCategory = MusicCategory("Songs")
        let     albumsCategory = MusicCategory("Albums")
        let     artistsCategory = MusicCategory("Artists")
        let     playlistsCategory = MusicCategory("Playlists")
        songsCategory.tracks = tracks
        albumsCategory.albums = albums
        artistsCategory.artists = artists
        playlistsCategory.playlists = playlists
        
        return [albumsCategory, songsCategory, artistsCategory, playlistsCategory]
    }
}
