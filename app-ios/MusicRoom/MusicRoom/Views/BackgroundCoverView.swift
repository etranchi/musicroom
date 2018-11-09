//
//  BackgroundCoverView.swift
//  MusicRoom
//
//  Created by jdavin on 11/4/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class BackgroundCoverView: UIView {

    let previousTrack: Track?
    let currentTrack: Track
    let nextTrack: Track?
    
    let offset = UIApplication.shared.keyWindow!.bounds.width
    let zoomingEffect: CGFloat = 200.0
    let transparencyEffect: CGFloat = 0.5
    let animationTime = 0.5
    
    let previousImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFill
        iv.clipsToBounds = true
        return iv
    }()
    
    let currentImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFill
        iv.clipsToBounds = true
        return iv
    }()

    let nextImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFill
        iv.clipsToBounds = true
        return iv
    }()
    
    let blurEffectView: UIVisualEffectView = {
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .regular))
        visualEffectView.isUserInteractionEnabled = false
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        visualEffectView.translatesAutoresizingMaskIntoConstraints = false
        return visualEffectView
    }()
    
    let darkView: UIView = {
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        view.backgroundColor = UIColor(white: 0, alpha: 0.7)
        return view
    }()

    init(_ previousTrack: Track?, _ currentTrack: Track, _ nextTrack: Track?) {
        self.previousTrack = previousTrack
        self.currentTrack = currentTrack
        self.nextTrack = nextTrack
        super.init(frame: .zero)
        
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    fileprivate func handleAnimation(iv: UIImageView) {
        UIView.animate(withDuration: animationTime, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            iv.alpha = 1
            self.currentImageView.alpha = 0
            self.currentImageView.alpha = self.transparencyEffect
            self.layoutIfNeeded()
        })
    }
    
    func handleNextAnimation() {
        if currentTrack.album!.cover_big == nextTrack?.album!.cover_big {
            return
        }
        handleAnimation(iv: nextImageView)
    }
    
    func handlePreviousAnimation() {
        if currentTrack.album!.cover_big == previousTrack?.album!.cover_big {
            return
        }
        handleAnimation(iv: previousImageView)
    }
    
    fileprivate func setupView() {
        downLoadImagesIfNeeded()
        
        addSubview(currentImageView)
        addSubview(previousImageView)
        addSubview(nextImageView)
        addSubview(blurEffectView)
        addSubview(darkView)
        
        previousImageView.alpha = 0
        nextImageView.alpha = 0
    
        NSLayoutConstraint.activate([
            currentImageView.topAnchor.constraint(equalTo: topAnchor),
            currentImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            currentImageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            currentImageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            
            nextImageView.topAnchor.constraint(equalTo: topAnchor),
            nextImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            nextImageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            nextImageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            
            previousImageView.topAnchor.constraint(equalTo: topAnchor),
            previousImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            previousImageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            previousImageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            
            blurEffectView.topAnchor.constraint(equalTo: topAnchor),
            blurEffectView.bottomAnchor.constraint(equalTo: bottomAnchor),
            blurEffectView.leadingAnchor.constraint(equalTo: leadingAnchor),
            blurEffectView.trailingAnchor.constraint(equalTo: trailingAnchor),
            
            darkView.topAnchor.constraint(equalTo: topAnchor),
            darkView.bottomAnchor.constraint(equalTo: bottomAnchor),
            darkView.leadingAnchor.constraint(equalTo: leadingAnchor),
            darkView.trailingAnchor.constraint(equalTo: trailingAnchor),
        ])
    }
    
    fileprivate func downLoadImagesIfNeeded() {
        if let previous = previousTrack {
            previousImageView.loadImageUsingCacheWithUrlString(urlString: previous.album!.cover_big!)
        }
        currentImageView.loadImageUsingCacheWithUrlString(urlString: currentTrack.album!.cover_big!)
        if let next = nextTrack {
            nextImageView.loadImageUsingCacheWithUrlString(urlString: next.album!.cover_big!)
        }
    }
}
