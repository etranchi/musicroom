//
//  SearchPlaylistCell.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 12/7/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SearchPlaylistCell: UITableViewCell {
    var rootTarget: PlaylistsController?
    var title : String?
    var isEditable : Bool = false
    var playlist: [Playlist]? {
        didSet {
            setupView()
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    let label: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 16, weight: .heavy)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    func setupView() {
        label.removeFromSuperview()
        label.text = title != nil ? title! : ""
        backgroundColor = .clear
        let eventsCollectionView = PlaylistCollectionView(playlist!, .horizontal, rootTarget)
        eventsCollectionView.isEditable = isEditable
        eventsCollectionView.eventCreation = false
        eventsCollectionView.removeFromSuperview()
        eventsCollectionView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(label)
        addSubview(eventsCollectionView)
        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: topAnchor),
            label.leadingAnchor.constraint(equalTo: leadingAnchor),
            label.trailingAnchor.constraint(equalTo: trailingAnchor),
            label.heightAnchor.constraint(equalToConstant: 40),
            eventsCollectionView.topAnchor.constraint(equalTo: label.bottomAnchor),
            eventsCollectionView.leadingAnchor.constraint(equalTo: leadingAnchor),
            eventsCollectionView.trailingAnchor.constraint(equalTo: trailingAnchor),
            eventsCollectionView.bottomAnchor.constraint(equalTo: bottomAnchor)
            ])
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
}
