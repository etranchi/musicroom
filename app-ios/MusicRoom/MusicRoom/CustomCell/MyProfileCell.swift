//
//  CustomMyProfileCell.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/24/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class MyProfileCell: UITableViewCell {
 
    
    @IBOutlet weak var imageLayout: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    var data : String? {
        didSet {
            if let d = data {
                titleLabel.text = d
                imageLayout.image = UIImage(named: "arrowR")
            }
        }
    }
    override func awakeFromNib() {
        super.awakeFromNib()
        let bezierPath = UIBezierPath(roundedRect: self.bounds, byRoundingCorners: [.bottomLeft, .topLeft], cornerRadii: self.frame.size)
        let shape = CAShapeLayer()
        shape.path = bezierPath.cgPath
        self.layer.mask = shape
        self.layer.masksToBounds = true
        
    }
    
    /*override func layoutSubviews() {
        super.layoutSubviews()
        let margins = UIEdgeInsetsMake(10, 0, 0, 0)
        self.frame = UIEdgeInsetsInsetRect(contentView.frame, margins)
    }*/
    

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
