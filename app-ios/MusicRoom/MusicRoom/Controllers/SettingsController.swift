//
//  SettingsController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
import FacebookLogin
import GoogleSignIn
import FBSDKLoginKit
class SettingsController: UIViewController, DeezerSessionDelegate {

    var deezerButton : UIButton?

    @objc func handleDeezer() {
        guard let manager = DeezerManager.sharedInstance.deezerConnect else { return }
        manager.sessionDelegate = self
        deezerManager.deezerConnect = manager
        if userManager.currentUser?.deezer_token == nil {
            manager.authorize([DeezerConnectPermissionEmail, DeezerConnectPermissionBasicAccess, DeezerConnectPermissionDeleteLibrary, DeezerConnectPermissionManageLibrary, DeezerConnectPermissionOfflineAccess, DeezerConnectPermissionListeningHistory])
        } else {
            manager.logout()
            userManager.currentUser?.deezer_token = nil
            userManager.save()
            updateButton()
        }
    }
    func deezerDidLogin() {
        let user = userManager.currentUser
        if user != nil {
            user!.deezer_token = deezerManager.deezerConnect?.accessToken
            userManager.save()
            apiManager.giveDeezerToken(user!)
            updateButton()
            
        }
    }
    
    @objc func deleteUser() {
        if userManager.logedWith == .fb {
            let manager = LoginManager()
            FBSDKAccessToken.setCurrent(nil)
            FBSDKProfile.setCurrent(nil)
            manager.loginBehavior = .web
            manager.logOut()
        }
        else if userManager.logedWith == .google {
            let manager = GIDSignIn.sharedInstance()
            manager!.signOut()
            
        }
        userManager.deleteAllData()
        userManager.save()
        URLCache.shared.removeAllCachedResponses()
        let cookies = HTTPCookieStorage.shared
        let toDel = cookies.cookies
        for cookie in toDel! {
            cookies.deleteCookie(cookie)
        }
        let nav = CustomNavigationController(rootViewController: AuthenticationController())
        let kwin = UIApplication.shared.keyWindow
        UIView.transition(with: kwin!, duration: 0.3, options: .transitionCrossDissolve, animations: {
            kwin?.rootViewController = nav
        })
        
    }
    
    func updateButton() {
        let text = userManager.currentUser?.deezer_token == nil ? "Link with Deezer" : "Unlink with Deezer"
        deezerButton!.setAttributedTitle(NSAttributedString(string: text, attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        setupButton()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        
    }
    
    func setupButton() {
        let logout = UIButton(type:.roundedRect)
        logout.backgroundColor = UIColor.gray
        logout.layer.cornerRadius = 8
        logout.setAttributedTitle(NSAttributedString(string: "Disconnect", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        deezerButton = UIButton(type: .roundedRect)
        deezerButton!.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        deezerButton!.backgroundColor = UIColor.gray
        deezerButton!.layer.cornerRadius = 8
        updateButton()
        logout.addTarget(self, action: #selector(deleteUser), for: .touchUpInside)
        logout.translatesAutoresizingMaskIntoConstraints = false
        deezerButton!.addTarget(self, action: #selector(handleDeezer), for: .touchUpInside)
        view.addSubview(deezerButton!)
        view.addSubview(logout)
        deezerButton!.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            deezerButton!.topAnchor.constraint(equalTo: view.topAnchor, constant: 110),
            deezerButton!.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
            deezerButton!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            logout.topAnchor.constraint(equalTo: deezerButton!.bottomAnchor , constant: 20),
            logout.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
            logout.centerXAnchor.constraint(equalTo: view.centerXAnchor)
            ])
    }
}
