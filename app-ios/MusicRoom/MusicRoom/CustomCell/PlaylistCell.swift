//
//  PlaylistCell.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistCell: UITableViewCell {

    
    @IBOutlet weak var imageLayout: UIImageView!
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var auteurLabel: UILabel!
    @IBOutlet weak var titleLabel: UILabel!
    var data : Playlist? {
        didSet {
            if let d = data {
                titleLabel.text = d.title
                timeLabel.text = ""
                do {
                    let url = URL(string: d.picture)
                    let image = try Data(contentsOf: url!, options: Data.ReadingOptions.mappedIfSafe)
                    imageLayout.image = UIImage(data: image)
                } catch {
                    print("Error when loading image")
                }
                auteurLabel.text = d.title
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
