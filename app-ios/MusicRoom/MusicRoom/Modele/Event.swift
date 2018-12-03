//
//  Event.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/19/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Address : Codable {
    let p : String
    let v : String
    let cp : String
    let r : String
    let n : String
}

struct Coord : Codable {
    let lat : Double
    let lng : Double
}

struct Location : Codable {
    let address : Address
    let coord : Coord
}

struct Event : Codable {
    let _id : String?
    let creator : User?
    let title : String
    let description : String
    let location : Location
    let visibility : Int?
    let shared : Bool
    let creationDate : String
    let date : String
    let playlist : Playlist?
    var members : [User]
    var adminMembers : [User]
    let picture : String?
    
    enum CodingKeys : String, CodingKey{
        case shared = "public"
        case creationDate = "creation_date"
        case date = "event_date"
        case creator, title, description, location, visibility, playlist, members, adminMembers, picture, _id
    }

}

struct DataEvent : Codable {
    let myEvents : [Event]
    let friendEvents : [Event]
    let allEvents : [Event]
}
