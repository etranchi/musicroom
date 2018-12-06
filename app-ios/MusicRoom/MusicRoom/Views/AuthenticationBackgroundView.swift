//
//  AuthenticationBackgroundView.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 12/6/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class AuthenticationBackgroundView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setupView() {
        backgroundColor = UIColor(white: 0.1, alpha: 1)
        
    }
}
