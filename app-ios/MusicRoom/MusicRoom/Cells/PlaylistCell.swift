//
//  PlaylistCell.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/20/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistCell: UICollectionViewCell {
    var vc : PlaylistCollectionView?
    var playlist: Playlist! {
        didSet {
            titleLabel.text = playlist.title
            if let pic = playlist.picture_medium {
                imageView.loadImageUsingCacheWithUrlString(urlString: pic)
            } else if playlist.tracks!.data.count > 0 {
                imageView.loadImageUsingCacheWithUrlString(urlString: playlist.tracks!.data[0].album!.cover_big!)
            } else {
                imageView.image = #imageLiteral(resourceName: "album_placeholder")
            }
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        setupViews()
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        return iv
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 12, weight: .medium)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let deleteView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.image = #imageLiteral(resourceName: "delete_icon")
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        return iv
    }()
    
    func setupViews() {
        addSubview(imageView)
        addSubview(titleLabel)
        
        NSLayoutConstraint.activate([
            imageView.topAnchor.constraint(equalTo: topAnchor),
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            imageView.widthAnchor.constraint(equalToConstant: bounds.width),
            imageView.heightAnchor.constraint(equalToConstant: bounds.width),
            titleLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 5),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            titleLabel.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])
        addSubview(deleteView)
        NSLayoutConstraint.activate([
            deleteView.centerXAnchor.constraint(equalTo: imageView.centerXAnchor),
            deleteView.centerYAnchor.constraint(equalTo: imageView.centerYAnchor),
            deleteView.heightAnchor.constraint(equalToConstant: 100),
            deleteView.widthAnchor.constraint(equalToConstant: 100)
        ])
        deleteView.isHidden = true
    }
}
