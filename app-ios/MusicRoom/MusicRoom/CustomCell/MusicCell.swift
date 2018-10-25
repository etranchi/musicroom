//
//  MusicCell.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/25/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class MusicCell: UITableViewCell {
    
    var data : NSDictionary? {
        didSet {
            if let d = data {
                titreLabel.text = String(describing: d["title"])
            }
        }
    }
    @IBOutlet weak var titreLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
