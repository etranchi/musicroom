//
//  LoginController.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 06/11/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class LoginController: UIViewController {
    let userManager : UserManager = UserManager()
    var button : UIButton?
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = UIColor(white: 1, alpha: 1)
        setupView()
        setupButton()
    }
    
    let loginTF : UITextField = {
        let tf = UITextField()
        tf.font = UIFont.systemFont(ofSize: 14, weight: .light)
        tf.attributedPlaceholder = NSAttributedString(string: "Login")
        tf.textAlignment = .center
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    func setupButton() {
        button = UIButton(type: .roundedRect)
        button!.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        button!.setTitle("Register", for: .normal)
        button!.addTarget(self, action: #selector(handleRegister), for: .touchUpInside)
        view.addSubview(button!)
        button!.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            button!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            button!.topAnchor.constraint(equalTo: passTF.bottomAnchor, constant: 10)
            ])
    }
    
    let passTF : UITextField = {
        let tf = UITextField()
        tf.font = UIFont.systemFont(ofSize: 14, weight: .light)
        tf.attributedPlaceholder = NSAttributedString(string: "Password")
        tf.textAlignment = .center
        tf.translatesAutoresizingMaskIntoConstraints = false
        tf.isSecureTextEntry = true
        return tf
    }()
    
    @objc func handleRegister() {
        print("message recu")
        print(loginTF.text!)
        print(passTF.text!)
        _ = userManager.newUser(login: loginTF.text!, mdp: passTF.text!)
        userManager.save()
        let tmp = userManager.getAllArticles()
        for t in tmp {
            print(t.login)
        }
    }
    
    func setupView() {
        self.view.addSubview(loginTF)
        self.view.addSubview(passTF)
        NSLayoutConstraint.activate([
            loginTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            loginTF.topAnchor.constraint(equalTo: view.topAnchor, constant: view.frame.height / 3),
            loginTF.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            loginTF.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            
            passTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            passTF.topAnchor.constraint(equalTo: loginTF.bottomAnchor, constant: 10),
            passTF.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            passTF.leadingAnchor.constraint(equalTo: view.leadingAnchor)
            ])
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
