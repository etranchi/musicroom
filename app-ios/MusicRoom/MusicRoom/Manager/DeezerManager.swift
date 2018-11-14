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
    var user : MyUser?
    var userManager : UserManager? {
        didSet  {
            if let manager = userManager {
                user = manager.currentUser
            }
        }
        
    }
    // .diconnected / .connected
    var sessionState: SessionState {
        if let connect = deezerConnect {
            return connect.isSessionValid() ? .connected : .disconnected
        }
        return .disconnected
    }
    
    func deezerDidLogin() {
        print(userManager?.currentUser)
        if user != nil {
            user?.deezer_token = deezerConnect?.accessToken
            DispatchQueue.main.async {
                self.userManager?.save()
            }
            print("saved")
        }
        print(user)
        print("loging")
    }
    func deezerDidLogout() {
        if user != nil {
            user?.deezer_token = nil
        }
        print("logout")
    }
    // Set a function or callback to this property if you want to get the result after login
    
    static let sharedInstance : DeezerManager = {
        let instance = DeezerManager()
        instance.startDeezer()
        return instance
    }()
    
    func startDeezer() {
        deezerConnect = DeezerConnect(appId: APP_ID, andDelegate: self)
        DZRRequestManager.default().dzrConnect = deezerConnect
        deezerConnect?.sessionDelegate = self
    }
}
