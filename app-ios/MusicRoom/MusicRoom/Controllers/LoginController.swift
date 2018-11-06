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
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .black
        setupView()
        setupButton()
    }
    
    let loginTF : UITextField = {
        let tf = UITextField()
        tf.font = UIFont.systemFont(ofSize: 14, weight: .light)
        tf.textAlignment = .center
        tf.borderStyle = .roundedRect
        tf.textColor = .white
        tf.returnKeyType = .done
        tf.enablesReturnKeyAutomatically = true
        tf.attributedPlaceholder = NSAttributedString(string: "Email", attributes: [NSAttributedString.Key.foregroundColor: UIColor.white])
        tf.backgroundColor = UIColor.gray
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    func setupButton() {
        let button = UIButton(type: .roundedRect)
        button.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        button.setTitle("Register", for: .normal)
        button.backgroundColor = UIColor.gray
        button.layer.cornerRadius = 8
        button.setAttributedTitle(NSAttributedString(string: "Login", attributes: [NSAttributedString.Key.foregroundColor: UIColor.white]), for: .normal)
        button.addTarget(self, action: #selector(handleRegister), for: .touchUpInside)
        view.addSubview(button)
        button.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            button.topAnchor.constraint(equalTo: passTF.bottomAnchor, constant: 10),
            button.widthAnchor.constraint(equalTo: passTF.widthAnchor, multiplier: 0.3),
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor)
            ])
    }
    let welcomeTF : UILabel = {
        let tf = UILabel()
        tf.font = UIFont.systemFont(ofSize: 50, weight: .bold)
        tf.textAlignment = .center
        tf.text = "Music Room"
        tf.textColor = .white
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    let imageDeezer : UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true

        return iv
    }()
    
    let passTF : UITextField = {
        let tf = UITextField()
        tf.font = UIFont.systemFont(ofSize: 14, weight: .light)
        tf.textAlignment = .center
        tf.backgroundColor = UIColor.gray
        tf.borderStyle = .roundedRect
        tf.textColor = .white
        tf.returnKeyType = .done
        tf.enablesReturnKeyAutomatically = true
        tf.attributedPlaceholder = NSAttributedString(string: "Password", attributes: [NSAttributedString.Key.foregroundColor: UIColor.white])
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
        self.view.addSubview(welcomeTF)
        self.view.addSubview(imageDeezer)
        imageDeezer.image = UIImage(named: "logo_deezer")
        NSLayoutConstraint.activate([
            welcomeTF.widthAnchor.constraint(equalTo: view.widthAnchor),
            welcomeTF.topAnchor.constraint(equalTo: view.topAnchor, constant: 200),
            welcomeTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            imageDeezer.widthAnchor.constraint(equalTo: welcomeTF.widthAnchor, multiplier: 0.2),
            imageDeezer.topAnchor.constraint(equalTo: welcomeTF.bottomAnchor, constant: 30),
            imageDeezer.centerXAnchor.constraint(equalToSystemSpacingAfter: view.centerXAnchor, multiplier: 1.2),
            
            loginTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            loginTF.topAnchor.constraint(equalTo: welcomeTF.bottomAnchor, constant: 125),
            loginTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            passTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            passTF.topAnchor.constraint(equalTo: loginTF.bottomAnchor, constant: 10),
            passTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            
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
