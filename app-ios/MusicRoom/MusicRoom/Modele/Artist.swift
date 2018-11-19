//
//  Artist.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Artist : Codable {
    let id : Int
    let picture : String
    let picture_medium : String
    let name : String
    let tracklist : String
    let nb_fan : Int?
}

struct ArtistData: Codable {
    let data : [Artist]
}
