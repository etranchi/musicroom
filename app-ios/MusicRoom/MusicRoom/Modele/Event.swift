//
//  Event.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/19/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Address : Decodable {
    let p : String
    let v : String
    let cp : String
    let r : String
    let n : String
}

struct Coord : Decodable {
    let lat : Double
    let long : Double
}

struct Location : Decodable {
    let address : Address
    let coord : Coord
}

struct Event : Decodable {
    let login : String
    let title : String
    let description : String
    let location : Location
    let visibility : Int
    let shared : Bool
    let creationDate : String
    let date : String
    let playlist : Playlist?
    let members : [User]
    let picture : String
    let adminMembers : [User]
    
    static func archive(w: Event) -> Data {
        var fw = w
        return Data(bytes: &fw, count: MemoryLayout<Event>.stride)
    }
}
