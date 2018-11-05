//
//  SongCell.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SongCell: UICollectionViewCell {
    var track: Track! {
        didSet {
            authorLabel.text = track.artist!.name
            titleLabel.text = track.title
            let sec = track.duration % 60
            if sec < 10 {
                timeLabel.text = String(track.duration / 60) + ":0" + String(sec)
            } else {
                timeLabel.text = String(track.duration / 60) + ":" + String(sec)
            }
            imageView.loadImageUsingCacheWithUrlString(urlString: (track.album!.cover_small))
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
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
    
    let timeLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 12, weight: .light)
        label.textColor = .lightGray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let authorLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .lightGray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let dotsLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .lightGray
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = "..."
        return label
    }()
    
    func setupViews() {
        addSubview(imageView)
        addSubview(titleLabel)
        addSubview(authorLabel)
        addSubview(timeLabel)
        addSubview(dotsLabel)
        
        NSLayoutConstraint.activate([
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 50),
            imageView.widthAnchor.constraint(equalToConstant: 50),
            imageView.leadingAnchor.constraint(equalTo: safeAreaLayoutGuide.leadingAnchor),
            
            titleLabel.topAnchor.constraint(equalTo: imageView.topAnchor),
            titleLabel.heightAnchor.constraint(lessThanOrEqualToConstant: 30),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: imageView.trailingAnchor, constant: 14),
            
            authorLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor),
            authorLabel.heightAnchor.constraint(equalToConstant: 18),
            authorLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            authorLabel.leadingAnchor.constraint(equalTo: titleLabel.leadingAnchor),
            
            timeLabel.topAnchor.constraint(equalTo: authorLabel.bottomAnchor, constant: 2),
            timeLabel.heightAnchor.constraint(equalToConstant: 10),
            timeLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            timeLabel.leadingAnchor.constraint(equalTo: authorLabel.leadingAnchor),
            
            dotsLabel.rightAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.rightAnchor),
            dotsLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            dotsLabel.widthAnchor.constraint(equalToConstant: 40),
            dotsLabel.heightAnchor.constraint(equalToConstant: 30)
        ])
    }
}



class SeeAllSongsCell: UICollectionViewCell {
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let messageLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = "See all songs"
        return label
    }()
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.image = UIImage(named: "allSongs_icon")
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        return iv
    }()
    
    func setupViews() {
        addSubview(messageLabel)
        addSubview(imageView)
        
        NSLayoutConstraint.activate([
            messageLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            messageLabel.heightAnchor.constraint(equalToConstant: 40),
            messageLabel.leadingAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.leadingAnchor),
            
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 15),
            imageView.widthAnchor.constraint(equalToConstant: 15),
            imageView.rightAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.rightAnchor, constant: -24)
        ])
    }
}
