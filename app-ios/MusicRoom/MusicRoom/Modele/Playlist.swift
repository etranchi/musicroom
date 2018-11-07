//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/5/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Playlist : Decodable {
    let userId : Int
    let isPublic : Int
    let id : Int
    let nbTracks : Int
    let title : String
    let picture : String
    let link : String
    let tracklist : String
    let tracks : TrackData?
}

struct PlaylistByUserId : Decodable {
    var userId : Int
    var nbrPlaylists : Int?
    var playlists : [Playlist]?
    
    init(_ id: Int) {
        userId = id
        playlists = []
    }
    
    static func samplePlaylistById(_ playlist: [Playlist]) -> [PlaylistByUserId]
    {
        var sample = PlaylistByUserId(1306931615)
        sample.playlists = playlist
        
        print(sample)
        return [sample]
    }
}

// stucture model tracks PlaylistTableView

struct PlaylistTrack {
    let name : String
    let artist : String
}

struct PlaylistHome {
    let name : String
}
