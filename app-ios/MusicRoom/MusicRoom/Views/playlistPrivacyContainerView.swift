//
//  playlistPrivacyContainerView.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 12/7/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class playlistPrivacyContainerView: UIView {
    var rootView: AlbumHeaderView?
    var playlist: Playlist? {
        didSet {
            setupView()
        }
    }
    
    let privacyContainer: UIView = {
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        view.layer.masksToBounds = true
        return view
    }()
    
    let rightArrowButton: UIButton = {
        let button = UIButton(type: .system)
        let arrowIcon = #imageLiteral(resourceName: "right_arrow")
        let tintedIcon = arrowIcon.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.isUserInteractionEnabled = true
        return button
    }()
    
    let friendShareButton: UIButton = {
        let button = UIButton(type: .system)
        let shareIcon = #imageLiteral(resourceName: "share_icon")
        let tintedIcon = shareIcon.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.isUserInteractionEnabled = true
        return button
    }()
    
    let switchButton: UISwitch = {
        let sw = UISwitch()
        sw.translatesAutoresizingMaskIntoConstraints = false
        return sw
    }()
    
    let privacyLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        label.textColor = .white
        label.text = "Public sharing"
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let friendsLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        label.textColor = .white
        label.text = "share with friends"
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let separator: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = UIColor(white: 0.3, alpha: 0.6)
        return view
    }()
    let separator1: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = UIColor(white: 0.3, alpha: 0.6)
        return view
    }()
    
    @objc func backToDetails() {
        rootView?.backToDetails()
    }
    
    @objc func valueChanged(_ sender: UISwitch) {
        playlist?.public = sender.isOn
        
    }
    
    func setupView() {
        rightArrowButton.addTarget(self, action: #selector(backToDetails), for: .touchUpInside)
        switchButton.addTarget(self, action: #selector(valueChanged), for: .valueChanged)
        addSubview(rightArrowButton)
        addSubview(privacyContainer)
        privacyContainer.addSubview(switchButton)
        privacyContainer.addSubview(privacyLabel)
        privacyContainer.addSubview(separator)
        addSubview(friendsLabel)
        addSubview(separator1)
        addSubview(friendShareButton)
        
        NSLayoutConstraint.activate([
            rightArrowButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            rightArrowButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -10),
            rightArrowButton.heightAnchor.constraint(equalToConstant: 30),
            rightArrowButton.widthAnchor.constraint(equalToConstant: 30),
            
            privacyContainer.topAnchor.constraint(equalTo: topAnchor),
            privacyContainer.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 30),
            privacyContainer.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -70),
            privacyContainer.heightAnchor.constraint(equalToConstant: 50),
            
            switchButton.topAnchor.constraint(equalTo: privacyContainer.topAnchor, constant: 10.5),
            switchButton.trailingAnchor.constraint(equalTo: privacyContainer.trailingAnchor),
            switchButton.widthAnchor.constraint(equalToConstant: 51),
            switchButton.heightAnchor.constraint(equalToConstant: 31),

            privacyLabel.topAnchor.constraint(equalTo: privacyContainer.topAnchor),
            privacyLabel.leadingAnchor.constraint(equalTo: privacyContainer.leadingAnchor),
            privacyLabel.trailingAnchor.constraint(equalTo: switchButton.leadingAnchor, constant: -5),
            privacyLabel.bottomAnchor.constraint(equalTo: privacyContainer.bottomAnchor),
            
            separator.bottomAnchor.constraint(equalTo: privacyContainer.bottomAnchor),
            separator.leadingAnchor.constraint(equalTo: privacyContainer.leadingAnchor),
            separator.trailingAnchor.constraint(equalTo: privacyContainer.trailingAnchor),
            
            friendsLabel.topAnchor.constraint(equalTo: separator.bottomAnchor),
            friendsLabel.leadingAnchor.constraint(equalTo: privacyContainer.leadingAnchor),
            friendsLabel.trailingAnchor.constraint(equalTo: privacyContainer.trailingAnchor),
            friendsLabel.heightAnchor.constraint(equalToConstant: 50),
            
            friendShareButton.topAnchor.constraint(equalTo: friendsLabel.topAnchor, constant: 10),
            friendShareButton.trailingAnchor.constraint(equalTo: privacyContainer.trailingAnchor),
            friendShareButton.heightAnchor.constraint(equalToConstant: 30),
            friendShareButton.widthAnchor.constraint(equalToConstant: 30),
            
            separator1.bottomAnchor.constraint(equalTo: friendsLabel.bottomAnchor),
            separator1.leadingAnchor.constraint(equalTo: friendsLabel.leadingAnchor),
            separator1.trailingAnchor.constraint(equalTo: friendsLabel.trailingAnchor),
        ])
        if playlist?.public == true {
            switchButton.isOn = true
        }
    }
}
