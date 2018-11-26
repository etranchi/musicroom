//
//  CreatePlaylistButtonCell.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/20/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class CreatePlaylistButtonCell: UICollectionViewCell {
    var vc : UICollectionView?
    
    let createButton: UIButton = {
        let createButton = UIButton(type: .system)
        
        createButton.translatesAutoresizingMaskIntoConstraints = false
        createButton.setTitleColor(.white, for: .normal)
        createButton.backgroundColor = UIColor(red: 40 / 255, green: 180 / 255, blue: 40 / 255, alpha: 1)
        createButton.setAttributedTitle(NSAttributedString(string: "CREATE PLAYLIST", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white, .font: UIFont.systemFont(ofSize: 15, weight: .heavy)]), for: .normal)
        createButton.layer.masksToBounds = true
        createButton.layer.cornerRadius = 40 / 2
        return createButton
    }()
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc func      handleCreate()
    {
        if let vc = vc as? PlaylistCollectionView {
            vc.createPlaylistPopUp()
        }
    }
    
    func setupView() {
        createButton.addTarget(self, action: #selector(handleCreate), for: .touchUpInside)
        addSubview(createButton)
        NSLayoutConstraint.activate([
            createButton.topAnchor.constraint(equalTo: topAnchor),
            createButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 28),
            createButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -28),
            createButton.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}
