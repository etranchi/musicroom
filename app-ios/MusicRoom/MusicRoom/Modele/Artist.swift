//
//  Artist.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

struct Artist : Decodable {
    let id : Int
    let link : String
    let picture : String
    let picture_medium : String
    let name : String
    let tracklist : String
    let nb_fan : Int?
}

struct ArtistData: Decodable {
    let data : [Artist]
}
