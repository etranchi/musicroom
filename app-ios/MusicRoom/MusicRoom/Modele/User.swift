//
//  User.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/7/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import Foundation

enum Status : String, Decodable {
    case Active, Suspended, Created;
}

struct User : Decodable {
    let login : String
    let email : String
    let password : String
    let status : Status
    let creationDate : String
    let id : String
    let picture : String
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case login, email, password, status, creationDate, picture
    }
}

struct DataUser : Decodable {
    let token : String
    let user : User
}
