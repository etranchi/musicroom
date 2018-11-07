//
//  LoginController.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 06/11/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class LoginController: UIViewController, UITextFieldDelegate {
    let userManager : UserManager = UserManager()
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .black
        setupView()
        setupButton()
        loginTF.delegate = self
        loginTF.tag = 0
        passTF.delegate = self
        passTF.tag = 1
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField.tag {
        case 0 : passTF.becomeFirstResponder()
        case 1 : handleLogin()
        default : return true
        }
        return true
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
        button.addTarget(self, action: #selector(handleLogin), for: .touchUpInside)
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
    
    @objc func handleLogin() {
        print("Login")
        var user = User(login: loginTF.text!, email: "", password: passTF.text!, token: nil)
        let apiManager = APIManager()
        let json = [
            "email" : "toto@yopmail.fr",
            "password" : "totototo"
        ]
        let data = try? JSONSerialization.data(withJSONObject: json, options: [])
        print(JSONSerialization.isValidJSONObject(json))
        apiManager.loginUser(data) { (json) in
            user.token = json
        }
        print(user.token)

    }
    
    func setupView() {
        self.view.addSubview(loginTF)
        self.view.addSubview(passTF)
        self.view.addSubview(welcomeTF)
        self.view.addSubview(imageDeezer)
        imageDeezer.image = UIImage(named: "logo_deezer")
        NSLayoutConstraint.activate([
            imageDeezer.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            imageDeezer.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
            imageDeezer.heightAnchor.constraint(equalTo: view.heightAnchor, multiplier: 0.3),
            imageDeezer.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            welcomeTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier : 0.9),
            welcomeTF.topAnchor.constraint(equalTo: imageDeezer.bottomAnchor, constant: 0),
            welcomeTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
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
