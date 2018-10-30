//
//  DeezerManager.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 23/10/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
let APP_ID = "306764"
enum SessionState {
    case connected, disconnected
}

class DeezerManager: NSObject, DeezerSessionDelegate {
    // Needed to handle every types of request from DeezerSDK
    var deezerConnect: DeezerConnect?
    
    // .diconnected / .connected
    var sessionState: SessionState {
        if let connect = deezerConnect {
            return connect.isSessionValid() ? .connected : .disconnected
        }
        return .disconnected
    }
    
    // Set a function or callback to this property if you want to get the result after login
    
    static let sharedInstance : DeezerManager = {
        let instance = DeezerManager()
        instance.startDeezer()
        return instance
    }()
    
    func startDeezer() {
        deezerConnect = DeezerConnect.init(appId: APP_ID, andDelegate: self)
        DZRRequestManager.default().dzrConnect = deezerConnect
    }
}
