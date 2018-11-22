//
//  SongDetailView.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/22/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SongDetailView: UIView {
    let track: Track

    init(_ track: Track) {
        self.track = track
        super.init(frame: UIApplication.shared.keyWindow!.frame)
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setupView() {
        backgroundColor = .red
    }
}
