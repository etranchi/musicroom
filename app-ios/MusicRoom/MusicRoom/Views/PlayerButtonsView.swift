//
//  PlayerButtonsView.swift
//  MusicRoom
//
//  Created by jdavin on 11/8/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlayerButtonsView: UIView {
    let playerController: PlayerController
    
    init(target: PlayerController) {
        self.playerController = target
        super.init(frame: .zero)
        
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    fileprivate func setupView() {
        
    }
}
