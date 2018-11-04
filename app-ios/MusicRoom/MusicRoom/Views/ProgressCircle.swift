//
//  progressCircle.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class ProgressCircle: UIView, CAAnimationDelegate {
    let shapeLayer = CAShapeLayer()
    var playButton: UIButton
    
    init(_ playButton: UIButton) {
        self.playButton = playButton
        
        super.init(frame: CGRect(x: 0, y: 0, width: 79, height: 79))
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func animationDidStop(_ anim: CAAnimation, finished flag: Bool) {
        if flag == true {
            let playIcon = UIImage(named: "play_icon")
            let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
            playButton.setImage(tintedIcon, for: .normal)
            playButton.tintColor = UIColor(white: 1, alpha: 1)
        }
    }
    
    let basicAnimation = CABasicAnimation(keyPath: "strokeEnd")
    var fromValue: CGFloat = 0.0
    
    func updateProgress(_ progress: CGFloat) {
        basicAnimation.fromValue = fromValue
        basicAnimation.toValue = progress
        basicAnimation.duration = 1
        fromValue = progress
        shapeLayer.add(basicAnimation, forKey: "progress")
    }
    
    fileprivate func setupView() {
        
        let circularPath = UIBezierPath(arcCenter: center, radius: 39, startAngle: -0.5 * .pi, endAngle: 1.5 * .pi, clockwise: true)
        shapeLayer.path = circularPath.cgPath
        shapeLayer.strokeColor = UIColor(red: 20 / 255, green: 160 / 255, blue: 20 / 255, alpha: 1).cgColor
        shapeLayer.lineWidth = 2
        shapeLayer.strokeEnd = 0
        shapeLayer.fillColor = UIColor.clear.cgColor
        shapeLayer.lineCap = CAShapeLayerLineCap.round
        basicAnimation.delegate = self
        
        layer.addSublayer(shapeLayer)
        
    }
}
