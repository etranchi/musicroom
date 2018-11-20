//
//  Track.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/26/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation


struct Track: Decodable {
    var id: Int
    let readable: Bool
    let link: String?
    let album: Album?
    let artist: Artist?
    let title: String
    let duration: Int
}

struct AlbumTrack: Decodable {
    let id: Int
    let readable: Bool
    let title: String
    let duration: Int
}

struct PlaylistTrackData: Decodable {
    let data: [Track]
}

struct AlbumTrackData: Decodable {
    let data: [AlbumTrack]
}

struct TrackData: Decodable {
    let data: [Track]
}
