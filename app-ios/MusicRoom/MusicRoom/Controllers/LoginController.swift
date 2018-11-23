//
//  LoginController.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 06/11/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
import FacebookLogin
import FacebookCore
import GoogleSignIn
import GoogleToolboxForMac

class LoginController: UIViewController, UITextFieldDelegate, GIDSignInDelegate ,GIDSignInUIDelegate, LoginButtonDelegate {
    func loginButtonDidCompleteLogin(_ loginButton: LoginButton, result: LoginResult) {
        
        switch result {
            case .failed(let error):
                print(error)
            case .cancelled:
                print("User cancelled login.")
            case .success(let grantedPermissions, let declinedPermissions, let accessToken):
                apiManager.login("facebook", accessToken.authenticationToken, completion: { (data) in
                    print("login")
                    let user = userManager.newUser()
                    user.token = data.token
                    user.login = data.user.login
                    userManager.currentUser = user
                    userManager.save()
                    let nav = TabBarController()
                    self.present(nav, animated: true, completion: nil)
                })
        }
    }
    
    func loginButtonDidLogOut(_ loginButton: LoginButton) {
        print("logout")
    }
    
    var googleButton : GIDSignInButton?
    var facebook : LoginButton?
    
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        if let error = error {
            print("\(error.localizedDescription)")
        } else {
            // Perform any operations on signed in user here.
            let userId = user.userID                  // For client-side use only!
            let idToken = user.authentication.idToken // Safe to send to the server
            let fullName = user.profile.name
            let givenName = user.profile.givenName
            let familyName = user.profile.familyName
            let email = user.profile.email
            apiManager.login("google", user.authentication.accessToken, completion:  { (data) in
                let user = userManager.newUser()
                user.token = data.token
                user.login = data.user.login
                userManager.currentUser = user
                userManager.save()
                let nav = TabBarController()
                self.present(nav, animated: true, completion: nil)
            })
        }
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .black
        GIDSignIn.sharedInstance().clientID = "479103948820-79bl5vfu07j3u6r28ur77pj76i8apu1l.apps.googleusercontent.com"
        GIDSignIn.sharedInstance().delegate = self
        GIDSignIn.sharedInstance().uiDelegate = self

        loginTF.delegate = self
        loginTF.tag = 0
        passTF.delegate = self
        passTF.tag = 1
        googleButton = GIDSignInButton()
        
        facebook = LoginButton(readPermissions: [ReadPermission.publicProfile, ReadPermission.email])
        let fbButton = UIButton(type: .roundedRect)
        fbButton.backgroundColor = UIColor.darkGray
        fbButton.frame = CGRect(x: 0,y : 0,width: 90,height:  40);
        fbButton.center = view.center;
        fbButton.setTitle("My Login Button", for: .normal)
        // Handle clicks on the button
        facebook!.delegate = self
        // Add the button to the view
        // view.addSubview(fbButton)
        setupView()
        setupButton()
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
        tf.attributedPlaceholder = NSAttributedString(string: "Email", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white])
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
        button.setAttributedTitle(NSAttributedString(string: "Login", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.addTarget(self, action: #selector(handleLogin), for: .touchUpInside)
        view.addSubview(button)
        button.translatesAutoresizingMaskIntoConstraints = false

        self.view.addSubview(googleButton!)
        googleButton!.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(facebook!)
        facebook?.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            
            googleButton!.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            googleButton!.topAnchor.constraint(equalTo: welcomeTF.bottomAnchor, constant: 50),
            googleButton!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            googleButton!.heightAnchor.constraint(equalToConstant: 50),
            
            facebook!.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.55),
            facebook!.topAnchor.constraint(equalTo: googleButton!.bottomAnchor, constant: 5),
            facebook!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            facebook!.heightAnchor.constraint(equalToConstant: 40),
            
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
        tf.attributedPlaceholder = NSAttributedString(string: "Password", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white])
        tf.translatesAutoresizingMaskIntoConstraints = false
        tf.isSecureTextEntry = true
        return tf
    }()
    
    @objc func handleLogin() {
        print("Login")
        let apiManager = APIManager()
        let json = [
            "email" : "toto@yopmail.fr",
            "password" : "totototo"
        ]
        let data = try? JSONSerialization.data(withJSONObject: json, options: [])
        print(JSONSerialization.isValidJSONObject(json))
        apiManager.loginUser(data) { (user) in
            print(user)
        }
    }
    
    func setupView() {
        self.view.addSubview(loginTF)
        self.view.addSubview(passTF)
        self.view.addSubview(welcomeTF)
        self.view.addSubview(imageDeezer)

        imageDeezer.image = #imageLiteral(resourceName: "deezer_logo")
        NSLayoutConstraint.activate([
            imageDeezer.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            imageDeezer.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
            imageDeezer.heightAnchor.constraint(equalTo: view.heightAnchor, multiplier: 0.3),
            imageDeezer.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            welcomeTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier : 0.9),
            welcomeTF.topAnchor.constraint(equalTo: imageDeezer.bottomAnchor, constant: 0),
            welcomeTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            loginTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            loginTF.topAnchor.constraint(equalTo: welcomeTF.bottomAnchor, constant: 150),
            loginTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            passTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            passTF.topAnchor.constraint(equalTo: loginTF.bottomAnchor, constant: 10),
            passTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            
            ])
    }
}
