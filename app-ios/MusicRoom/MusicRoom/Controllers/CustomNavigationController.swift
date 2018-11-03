//
//  CustomNavigationController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class CustomNavigationController: UINavigationController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationBar.setBackgroundImage(UIImage(), for: .default)
        navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white, .font: UIFont.systemFont(ofSize: 15, weight: .heavy)]
        var bounds = navigationBar.bounds
        bounds.size.height += 50
        bounds.origin.y -= 50
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .light))
        visualEffectView.isUserInteractionEnabled = false
        visualEffectView.frame = bounds
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        navigationBar.addSubview(visualEffectView)
        visualEffectView.layer.zPosition = -1
        
    }
}
