//
//  SettingsController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

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
        print(userManager.currentUser)
        let user = userManager.currentUser
        if user != nil {
            print(deezerManager.deezerConnect?.accessToken)
            user!.deezer_token = deezerManager.deezerConnect?.accessToken
            userManager.save()
            updateButton()
            
        }
    }
    
    func updateButton() {
        print("update")
        let text = userManager.currentUser?.deezer_token == nil ? "Link with Deezer" : "Unlink with Deezer"
        deezerButton!.setAttributedTitle(NSAttributedString(string: text, attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        setupButton()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        
    }
    
    func setupButton() {
        deezerButton = UIButton(type: .roundedRect)
        deezerButton!.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        deezerButton!.backgroundColor = UIColor.gray
        deezerButton!.layer.cornerRadius = 8
        updateButton()
        deezerButton!.addTarget(self, action: #selector(handleDeezer), for: .touchUpInside)
        view.addSubview(deezerButton!)
        deezerButton!.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            deezerButton!.topAnchor.constraint(equalTo: view.topAnchor, constant: 110),
            deezerButton!.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
            deezerButton!.centerXAnchor.constraint(equalTo: view.centerXAnchor)
            ])
    }
}
