//
//  MusicCell.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/25/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class MusicCell: UITableViewCell {
    
    @IBOutlet weak var auteurLabel: UILabel!
    @IBOutlet weak var titreLabel: UILabel!
    @IBOutlet weak var imageLayout: UIImageView!
    @IBOutlet weak var timeLabel: UILabel!
    var data : Track? {
        didSet {
            if let d = data {
                titreLabel.text = d.title
                timeLabel.text = String(d.duration / 60) + ":" + String(d.duration % 60)
            }
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
