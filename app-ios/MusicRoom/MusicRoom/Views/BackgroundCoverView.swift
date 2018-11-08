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
    
    fileprivate func handleAnimation(_ top: NSLayoutConstraint?, _ bottom: NSLayoutConstraint?, multiplier: CGFloat, iv: UIImageView) {
        let moveOffset = UIApplication.shared.keyWindow!.bounds.width * multiplier
        
        top?.constant = 0
        bottom?.constant = 0
        
        currentTopAnchor?.constant = zoomingEffect
        currentBottomAnchor?.constant = -zoomingEffect
        currentTrailingAnchor?.constant = moveOffset
        currentLeadingAnchor?.constant = moveOffset
        UIView.animate(withDuration: animationTime, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            iv.alpha = 1
            self.currentImageView.alpha = self.transparencyEffect
            self.layoutIfNeeded()
        })
    }
    
    func handleNextAnimation() {
        if currentTrack.album!.cover_big == nextTrack?.album!.cover_big {
            return
        }
        handleAnimation(nextTopAnchor, nextBottomAnchor, multiplier: -1, iv: nextImageView)
    }
    
    func handlePreviousAnimation() {
        if currentTrack.album!.cover_big == previousTrack?.album!.cover_big {
            return
        }
        handleAnimation(previousTopAnchor, previousBottomAnchor, multiplier: 1, iv: previousImageView)
    }
    
    var previousTopAnchor: NSLayoutConstraint?
    var previousBottomAnchor: NSLayoutConstraint?
    
    var currentTopAnchor: NSLayoutConstraint?
    var currentBottomAnchor: NSLayoutConstraint?
    var currentLeadingAnchor: NSLayoutConstraint?
    var currentTrailingAnchor: NSLayoutConstraint?
    
    var nextTopAnchor: NSLayoutConstraint?
    var nextBottomAnchor: NSLayoutConstraint?
    
    fileprivate func setupView() {
        downLoadImagesIfNeeded()
        
        addSubview(currentImageView)
        addSubview(previousImageView)
        addSubview(nextImageView)
        addSubview(blurEffectView)
        addSubview(darkView)
        
        previousImageView.alpha = transparencyEffect
        nextImageView.alpha = transparencyEffect
        
        previousTopAnchor = previousImageView.topAnchor.constraint(equalTo: topAnchor, constant: zoomingEffect)
        previousBottomAnchor = previousImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -zoomingEffect)
        
        currentTopAnchor = currentImageView.topAnchor.constraint(equalTo: topAnchor)
        currentBottomAnchor = currentImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        currentLeadingAnchor = currentImageView.leadingAnchor.constraint(equalTo: leadingAnchor)
        currentTrailingAnchor = currentImageView.trailingAnchor.constraint(equalTo: trailingAnchor)
        
        nextTopAnchor = nextImageView.topAnchor.constraint(equalTo: topAnchor, constant: zoomingEffect)
        nextBottomAnchor = nextImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -zoomingEffect)
        
        
        NSLayoutConstraint.activate([
            nextImageView.leadingAnchor.constraint(equalTo: currentImageView.trailingAnchor),
            nextImageView.trailingAnchor.constraint(equalTo: currentImageView.trailingAnchor, constant: offset),
            previousImageView.leadingAnchor.constraint(equalTo: currentImageView.leadingAnchor, constant: -offset),
            previousImageView.trailingAnchor.constraint(equalTo: currentImageView.leadingAnchor),
            
            blurEffectView.topAnchor.constraint(equalTo: topAnchor),
            blurEffectView.bottomAnchor.constraint(equalTo: bottomAnchor),
            blurEffectView.leadingAnchor.constraint(equalTo: leadingAnchor),
            blurEffectView.trailingAnchor.constraint(equalTo: trailingAnchor),
            darkView.topAnchor.constraint(equalTo: topAnchor),
            darkView.bottomAnchor.constraint(equalTo: bottomAnchor),
            darkView.leadingAnchor.constraint(equalTo: leadingAnchor),
            darkView.trailingAnchor.constraint(equalTo: trailingAnchor),
        ])
        
        
        NSLayoutConstraint.activate([
            previousTopAnchor!, previousBottomAnchor!,
            currentTopAnchor!, currentBottomAnchor!, currentLeadingAnchor!, currentTrailingAnchor!,
            nextTopAnchor!, nextBottomAnchor!
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
