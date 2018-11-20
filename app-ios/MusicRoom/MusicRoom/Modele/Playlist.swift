//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/5/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation



struct Creator: Decodable {
    let id: Int
    let name: String
}

struct Playlist: Decodable {
    let creator: Creator
    let tracks: PlaylistTrackData
    let title: String
    let picture_medium: String?
}
