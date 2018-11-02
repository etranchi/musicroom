//
//  Research.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/29/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation



struct ResearchData {
    var tracks : STrack
    var albums : SAlbum
    var playlists : SPlaylist
    init() {
        tracks = STrack(data: [])
        albums = SAlbum(data: [])
        playlists = SPlaylist(data: [])
    }
}
