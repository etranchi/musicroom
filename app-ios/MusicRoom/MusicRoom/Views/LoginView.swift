//
//  LoginView.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 12/6/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
import FacebookLogin
import FacebookCore
import GoogleSignIn
import GoogleToolboxForMac

class LoginView: UIView, UITextFieldDelegate, GIDSignInDelegate ,GIDSignInUIDelegate, LoginButtonDelegate  {
    var googleButton : GIDSignInButton?
    var facebook : LoginButton?
    func loginButtonDidCompleteLogin(_ loginButton: LoginButton, result: LoginResult) {
        switch result {
        case .failed(let error):
            print(error)
        case .cancelled:
            print("User cancelled login.")
        case .success(_,_, let accessToken):
            apiManager.login("facebook", accessToken.authenticationToken, completion: { (data) in
                let d = data as [String : AnyObject]
                let user = userManager.newUser()
                user.token = d["token"] as? String
                user.login = (d["user"] as! [String : String])["login"]
                userManager.currentUser = user
                userManager.logedWith = .fb
                userManager.save()
                let kwin = UIApplication.shared.keyWindow
                let nav = TabBarController()
                    UIView.transition(with: kwin!, duration: 0.3, options: .transitionCrossDissolve, animations: {
                        kwin?.rootViewController = nav
                })
            })
        }
    }
    
    func loginButtonDidLogOut(_ loginButton: LoginButton) {
        print("logout")
    }
    
    
    
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        if let error = error {
            print("\(error.localizedDescription)")
        } else {
            apiManager.login("google", user.authentication.accessToken, completion:  { (data) in
                let d = data as [String : AnyObject]
                let user = userManager.newUser()
                user.token = d["token"] as? String
                user.login = (d["user"] as! [String : String])["login"]
                userManager.currentUser = user
                userManager.logedWith = .google
                userManager.save()
                let kwin = UIApplication.shared.keyWindow
                let nav = TabBarController()
                UIView.transition(with: kwin!, duration: 0.3, options: .transitionCrossDissolve, animations: {
                    kwin?.rootViewController = nav
                })
            })
        }
    }
}
