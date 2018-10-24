//
//  ViewController.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 22/10/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
import SafariServices

class ViewController: UIViewController , DeezerSessionDelegate, SFSafariViewControllerDelegate {
    
    @IBAction func loginButton(_ sender: Any) {
        performSegue(withIdentifier: "GoToProfile", sender: nil)
        /*DispatchQueue.main.async {
            let url = URL(string: "https://connect.deezer.com/oauth/auth.php?app_id=\(APP_ID)&redirect_uri=http://localhost&perms=basic_access,email")
            let vc = SFSafariViewController(url: url!)
            vc.delegate = self
            self.present(vc, animated: true, completion: nil)
        }*/
    }
    
    func safariViewControllerDidFinish(_ controller: SFSafariViewController) {
        print("yo")
    }
    var deezerManager : DeezerManager?
    override func viewDidLoad() {
        super.viewDidLoad()
        deezerManager = DeezerManager()
        deezerManager?.delegate = self
        
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    func deezerDidLogin() {
        print("login")
    }
    func deezerDidLogout() {
        print("logout")
    }
    func deezerDidNotLogin(_ cancelled: Bool) {
        print("Not login")
    }


}

