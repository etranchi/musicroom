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
    var isCreating : Bool?
    var root: PlaylistController?
    var title : String {
        didSet {
            setupView()
        }
    }
    
    let createButton: UIButton = {
        let createButton = UIButton(type: .system)
        
        createButton.translatesAutoresizingMaskIntoConstraints = false
        createButton.setTitleColor(.white, for: .normal)
        // createButton.setAttributedTitle(NSAttributedString(string: t"CREATE PLAYLIST", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white, .font: UIFont.systemFont(ofSize: 15, weight: .heavy)]), for: .normal)
        createButton.layer.masksToBounds = true
        createButton.layer.cornerRadius = 40 / 2
        return createButton
    }()
    
    override init(frame: CGRect) {
        title = ""
        root = nil
        super.init(frame: .zero)
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc func      handleCreate()
    {
        print("plouf")
        if isCreating != nil && isCreating! == true {
            guard let vc = self.vc as? PlaylistCollectionView else { return }
            vc.createPlaylistPopUp()
        } else {
            print("yooo")
            let vc = SearchDeezerPlaylistController()
            root!.navigationController?.pushViewController(vc, animated: true)
        }
        
    }
    
    
    
    func setupView() {
        createButton.setAttributedTitle(NSAttributedString(string: title , attributes: [NSAttributedStringKey.foregroundColor: UIColor.white, .font: UIFont.systemFont(ofSize: 15, weight: .heavy)]), for: .normal)
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
