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
    var data : DZRTrack? {
        didSet {
            
            if let d = data {
                auteurLabel.text = d.identifier()
            }
            /*
                titreLabel.text = d.title
                timeLabel.text = String(d.duration / 60) + ":" + String(d.duration % 60)
                do {
                    let url = URL(string: d.album.cover)
                    let image = try Data(contentsOf: url!, options: Data.ReadingOptions.mappedIfSafe)
                    imageLayout.image = UIImage(data: image)
                } catch {
                    print("Error when loading image")
                }
                auteurLabel.text = d.artist.name
                
            }*/
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
