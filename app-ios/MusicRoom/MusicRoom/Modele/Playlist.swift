//
//  Playlist.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/26/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

enum Status : String, Decodable {
    case Active
    case Suspended
    case Created
}

struct Playlist : Decodable {
    let id : Int
    let status : Status
}
