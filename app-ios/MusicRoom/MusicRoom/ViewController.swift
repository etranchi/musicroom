//
//  ViewController.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 22/10/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
let APP_ID = "306764"
class ViewController: UIViewController , DeezerSessionDelegate{
    var connect : DeezerConnect?
    var session : DeezerSessionDelegate?
    override func viewDidLoad() {
        super.viewDidLoad()
        print("coucou")
        connect = DeezerConnect()
        connect = DeezerConnect.init(appId: APP_ID, andDelegate: session.self)
        print(session?.deezerDidLogin!())
        print(connect?.accessToken)
        // Do any additional setup after loading the view, typically from a nib.
    }


}

