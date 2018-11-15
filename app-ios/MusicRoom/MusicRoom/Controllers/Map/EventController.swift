//
//  EventController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/15/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class EventController: UIViewController , UINavigationControllerDelegate {

    let imagePicker = UIImagePickerController()
    
    let titleTF : UITextField = {
        let tf = UITextField()
        
        return tf
    }()
    

    let imageView : UIImageView = {
        let iv = UIImageView()
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        iv.image = #imageLiteral(resourceName: "album_test")
        return iv
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imagePicker.delegate = self
        let button = UIButton(type: UIButtonType.contactAdd)
        button.frame = CGRect(x: 0, y: 0, width: 24, height: 24)
        button.addTarget(self, action: #selector(createEvent), for: .touchUpInside)
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: button)
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        setupView()
        // Do any additional setup after loading the view.
    }
    
    func setupView() {
        let button = UIButton(type: .roundedRect)
        button.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        button.backgroundColor = UIColor.gray
        button.layer.cornerRadius = 8
        button.setAttributedTitle(NSAttributedString(string: "Pick a picture", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.addTarget(self, action: #selector(imagePick), for: .touchUpInside)
        view.addSubview(button)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            button.topAnchor.constraint(equalTo: view.topAnchor, constant: 100),
            button.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor)
            ])
        
        view.addSubview(imageView)
        
        NSLayoutConstraint.activate([
            imageView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.8),
            imageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 30)
            ])
    }
    
    @objc func imagePick() {
        imagePicker.allowsEditing = false
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            imagePicker.sourceType = .photoLibrary
            present(imagePicker, animated: true, completion: nil)
        }
        else {
            print("not allowed")
        }
    }
    
    @objc func createEvent() {
        print("create")
        self.removeFromParentViewController()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
        
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

extension EventController : UIImagePickerControllerDelegate {
    @objc func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        if let pickedImage = info[UIImagePickerControllerOriginalImage] as? UIImage {
            imageView.image = pickedImage
        }
        dismiss(animated: true, completion: nil)
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
}
