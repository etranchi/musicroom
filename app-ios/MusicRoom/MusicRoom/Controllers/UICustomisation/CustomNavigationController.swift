//
//  CustomNavigationController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class CustomNavigationController: UINavigationController {

    let blurView: UIVisualEffectView = {
        let effect = UIVisualEffectView(effect: UIBlurEffect(style: .dark))
        
        effect.isUserInteractionEnabled = false
        effect.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        effect.translatesAutoresizingMaskIntoConstraints = false
        return effect
    }()
    
    let lightView: UIView = {
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        view.backgroundColor = UIColor(white: 1, alpha: 0.5)
        return view
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationBar.setBackgroundImage(UIImage(), for: .default)
        navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white, .font: UIFont.systemFont(ofSize: 15, weight: .heavy)]
        navigationBar.shadowImage = UIImage()
        addVisualEffect()
    }
    
    func addVisualEffect() {
        navigationBar.addSubview(lightView)
        navigationBar.addSubview(blurView)
        NSLayoutConstraint.activate([
            blurView.topAnchor.constraint(equalTo: navigationBar.topAnchor, constant: -50),
            blurView.bottomAnchor.constraint(equalTo: navigationBar.bottomAnchor),
            blurView.leadingAnchor.constraint(equalTo: navigationBar.leadingAnchor),
            blurView.trailingAnchor.constraint(equalTo: navigationBar.trailingAnchor),
            
            lightView.topAnchor.constraint(equalTo: blurView.topAnchor),
            lightView.bottomAnchor.constraint(equalTo: blurView.bottomAnchor, constant: -50),
            lightView.leadingAnchor.constraint(equalTo: blurView.leadingAnchor),
            lightView.trailingAnchor.constraint(equalTo: blurView.trailingAnchor)
        ])
        lightView.layer.zPosition = -1
        blurView.layer.zPosition = -1
    }
    
    func removeVisualEffect() {
        blurView.removeFromSuperview()
        lightView.removeFromSuperview()
    }
}
