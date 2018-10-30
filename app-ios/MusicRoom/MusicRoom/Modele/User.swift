//
//  User.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/26/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation


struct User : Decodable {
    let id : Int
    let login : String
    let picture : String
    let email : String
    let creationDate : Date
}
