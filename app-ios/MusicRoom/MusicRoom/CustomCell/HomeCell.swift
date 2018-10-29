//
//  CustomMyProfileCell.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/24/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class HomeCell: UITableViewCell {
 
    @IBOutlet weak var titleLabel: UILabel!
    var data : String? {
        didSet {
            if let d = data {
                titleLabel.text = d
            }
        }
    }
    override func awakeFromNib() {
        super.awakeFromNib()
        let bP = UIBezierPath(rect: self.bounds)
        // let bezierPath = UIBezierPath(roundedRect: self.frame, byRoundingCorners: [.bottomLeft, .topLeft, .topRight, .bottomRight], cornerRadii: self.frame.size)
        let shape = CAShapeLayer()
        shape.path = bP.cgPath
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
