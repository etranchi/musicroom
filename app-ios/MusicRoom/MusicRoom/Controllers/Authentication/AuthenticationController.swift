//
//  AuthenticationController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/7/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class AuthenticationController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = .black
        setupView()
        setupButton()
    }
    
    
    func setupButton() {
        let button = UIButton(type: .roundedRect)
        button.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        button.backgroundColor = UIColor.gray
        button.layer.cornerRadius = 8
        button.setAttributedTitle(NSAttributedString(string: "Login", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.addTarget(self, action: #selector(handleLoginView), for: .touchUpInside)
        view.addSubview(button)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            button.topAnchor.constraint(equalTo: welcomeTF.bottomAnchor, constant: 10),
            button.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor)
            ])
        
        let button1 = UIButton(type: .roundedRect)
        button1.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        button1.setTitle("Register", for: .normal)
        button1.backgroundColor = UIColor.gray
        button1.layer.cornerRadius = 8
        button1.setAttributedTitle(NSAttributedString(string: "Register", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button1.addTarget(self, action: #selector(handleRegisterView), for: .touchUpInside)
        view.addSubview(button1)
        button1.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            button1.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 10),
            button1.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            button1.centerXAnchor.constraint(equalTo: view.centerXAnchor)
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
    
    @objc func handleLoginView() {
        self.navigationController?.pushViewController(LoginController(), animated: true)
    }
    
    @objc func handleRegisterView() {
        self.navigationController?.pushViewController(RegisterController(), animated: true)
    }
    
    func setupView() {
        self.view.addSubview(welcomeTF)
        self.view.addSubview(imageDeezer)
        imageDeezer.image = #imageLiteral(resourceName: "logo_deezer")
        
        NSLayoutConstraint.activate([
            imageDeezer.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            imageDeezer.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
            imageDeezer.heightAnchor.constraint(equalTo: view.heightAnchor, multiplier: 0.3),
            imageDeezer.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            welcomeTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier : 0.9),
            welcomeTF.topAnchor.constraint(equalTo: imageDeezer.bottomAnchor, constant: 0),
            welcomeTF.centerXAnchor.constraint(equalTo: view.centerXAnchor)
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
