//
//  ArtistCell.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class ArtistCell: UICollectionViewCell {
    var artist: Artist! {
        didSet {
            artistLabel.text = artist.name
<<<<<<< HEAD
            fanLabel.text = "\(artist.nb_fan!) fans"
=======
            fanLabel.text = String(describing: artist.nb_fan) + " fans"
>>>>>>> etranchiv2
            imageView.loadImageUsingCacheWithUrlString(urlString: artist.picture_medium)
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
        iv.layer.cornerRadius = 50
        return iv
    }()
    
    let artistLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let fanLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .lightGray
        label.numberOfLines = 2
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    func setupViews() {
        addSubview(imageView)
        addSubview(artistLabel)
        addSubview(fanLabel)
        
        NSLayoutConstraint.activate([
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor, constant: -30),
            imageView.centerXAnchor.constraint(equalTo: centerXAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 100),
            imageView.widthAnchor.constraint(equalToConstant: 100),
            
            artistLabel.centerXAnchor.constraint(equalTo: imageView.centerXAnchor),
            artistLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 5),
            artistLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            artistLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            
            fanLabel.centerXAnchor.constraint(equalTo: artistLabel.centerXAnchor),
            fanLabel.topAnchor.constraint(equalTo: artistLabel.bottomAnchor, constant: 2),
            fanLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            fanLabel.leadingAnchor.constraint(equalTo: leadingAnchor)
        ])
    }
}
