//
//  DeezerManager.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 23/10/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
let APP_ID = "306764"
class DeezerManager: NSObject, DeezerRequestDelegate{
    var connect : DeezerConnect?
    var request : DZRRequestManager = DZRRequestManager()
    var delegate : DeezerSessionDelegate? {
        didSet {
            if let del = delegate {
                connect = DeezerConnect.init(appId: APP_ID, andDelegate: del)
                connect?.sessionDelegate = del
                request.dzrConnect = connect
            }
        }
    }
    override init() {
        super.init()
    }
    
    
    func request(_ request: DZRNetworkRequest!, didReceiveResponse response: Data!) {
        print("receive response")
    }
    
    func request(_ request: DZRNetworkRequest!, didFailWithError error: Error!) {
        print("fail request")
    }
    func deezerDidLogin() {
        print("login&")
    }
    func deezerDidLogout() {
        print("logout&")
    }
    func deezerDidNotLogin(_ cancelled: Bool) {
        print("Not login&")
    }
}
