//
//  PlaylistCell.swift
//  MusicRoom
//
//  Created by Cheloudiakoff on 07/11/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistCell: UITableViewCell {
    
    var track : PlaylistTrack? {
        didSet {
            nameLabel.text = track?.name
            artistLabel.text = track?.artist
        }
    }
    
    private let nameLabel : UILabel = {
        let label = UILabel()
        label.textColor = .white
        
        return label
    }()
    
    private let artistLabel : UILabel = {
        let label = UILabel()
        label.textColor = .white
        
        return label
    }()
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        backgroundColor = UIColor(white: 0.15, alpha: 1)
        addSubview(artistLabel)
        addSubview(nameLabel)
        
        nameLabel.anchor(top: topAnchor, leading: leadingAnchor, bottom: bottomAnchor, trailing: nil, padding: .init(top: 12, left: 12, bottom: 12, right: 0))
        artistLabel.anchor(top: topAnchor, leading: nameLabel.trailingAnchor, bottom: bottomAnchor, trailing: nil, padding: .init(top: 12, left: 12, bottom: 12, right: 0))
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}

class PlaylistHomeCell: UICollectionViewCell {
    override init(frame: CGRect) {
        super.init(frame: .zero)
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    var playlist : PlaylistHome? {
        didSet {
            nameLabel.text = playlist?.name
        }
    }
    
    let nameLabel : UILabel = {
        let label = UILabel()
        
        label.textColor = .white
        
        return label
    }()
    
    let imagePlst : UIImageView = {
        let image = UIImageView()
        
        image.backgroundColor = .lightGray
        return image
    }()
    
    func setupViews() {
        backgroundColor = UIColor(white: 0.15, alpha: 1)
        addSubview(nameLabel)
        addSubview(imagePlst)
        
        imagePlst.anchor(top: topAnchor, leading: leadingAnchor, bottom: bottomAnchor, trailing: nil, padding: .init(top: 12, left: 12, bottom: 12, right: 0), size: .init(width: 120, height: 100))
        nameLabel.anchor(top: topAnchor, leading: imagePlst.trailingAnchor, bottom: bottomAnchor, trailing: nil, padding: .init(top: 0, left: 12, bottom: 0, right: 0))
    }
}
