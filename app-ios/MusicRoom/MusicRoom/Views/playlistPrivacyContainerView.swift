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
    
    let switchButton = UISwitch(frame: CGRect(x: 0, y: 0, width: 22, height: 22))
    
    let privacyLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 17, weight: .medium)
        label.textColor = .white
        label.text = "public"
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    @objc func backToDetails() {
        rootView?.backToDetails()
    }
    
    func setupView() {
        rightArrowButton.addTarget(self, action: #selector(backToDetails), for: .touchUpInside)
        switchButton.translatesAutoresizingMaskIntoConstraints = false
        addSubview(rightArrowButton)
        addSubview(privacyContainer)
        privacyContainer.addSubview(switchButton)
        privacyContainer.addSubview(privacyLabel)
        
        NSLayoutConstraint.activate([
            rightArrowButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            rightArrowButton.trailingAnchor.constraint(equalTo: trailingAnchor),
            rightArrowButton.heightAnchor.constraint(equalToConstant: 30),
            rightArrowButton.widthAnchor.constraint(equalToConstant: 30),
            
            privacyContainer.topAnchor.constraint(equalTo: topAnchor, constant: 20),
            privacyContainer.leadingAnchor.constraint(equalTo: leadingAnchor),
            privacyContainer.trailingAnchor.constraint(equalTo: rightArrowButton.leadingAnchor),
            privacyContainer.heightAnchor.constraint(equalToConstant: 40),
            
            switchButton.topAnchor.constraint(equalTo: privacyContainer.topAnchor, constant: 4),
            switchButton.trailingAnchor.constraint(equalTo: privacyContainer.trailingAnchor, constant: -22 - 7),
            switchButton.widthAnchor.constraint(equalToConstant: 22),
            switchButton.bottomAnchor.constraint(equalTo: privacyContainer.bottomAnchor, constant: -10),
            
            privacyLabel.topAnchor.constraint(equalTo: privacyContainer.topAnchor, constant: 7),
            privacyLabel.leadingAnchor.constraint(equalTo: privacyContainer.leadingAnchor, constant: 7),
            privacyLabel.trailingAnchor.constraint(equalTo: switchButton.leadingAnchor, constant: -5),
            privacyLabel.bottomAnchor.constraint(equalTo: privacyContainer.bottomAnchor, constant: -7)
        ])
        if playlist!.public! == true {
            switchButton.isOn = true
        }
    }
}
