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
    
    var previousTopAnchor: NSLayoutConstraint?
    var previousBottomAnchor: NSLayoutConstraint?
    var previousTrailingAnchor: NSLayoutConstraint?
    var previousLeadingAnchor: NSLayoutConstraint?
    
    var currentTopAnchor: NSLayoutConstraint?
    var currentBottomAnchor: NSLayoutConstraint?
    var currentTrailingAnchor: NSLayoutConstraint?
    var currentLeadingAnchor: NSLayoutConstraint?
    
    var nextTopAnchor: NSLayoutConstraint?
    var nextBottomAnchor: NSLayoutConstraint?
    var nextTrailingAnchor: NSLayoutConstraint?
    var nextLeadingAnchor: NSLayoutConstraint?
    
    
    fileprivate func handleAnimation(_ top: NSLayoutConstraint?, _ bottom: NSLayoutConstraint?, _ trailing: NSLayoutConstraint?, _ leading: NSLayoutConstraint?, multiplier: CGFloat, iv: UIImageView) {
        let moveOffset = UIApplication.shared.keyWindow!.bounds.width * multiplier
        
        top?.constant = 0
        bottom?.constant = 0
        trailing?.constant = 0
        leading?.constant = 0
        
        currentTopAnchor?.constant = 100
        currentBottomAnchor?.constant = -100
        currentTrailingAnchor?.constant = moveOffset
        currentLeadingAnchor?.constant = moveOffset
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            iv.alpha = 1
            self.currentImageView.alpha = 0.5
            self.layoutIfNeeded()
        })
    }
    
    func handleNextAnimation() {
        if currentTrack.album!.cover_big == nextTrack?.album!.cover_big {
            return
        }
        handleAnimation(nextTopAnchor, nextBottomAnchor, nextTrailingAnchor, nextLeadingAnchor, multiplier: -1, iv: nextImageView)
    }
    
    func handlePreviousAnimation() {
        if currentTrack.album!.cover_big == previousTrack?.album!.cover_big {
            return
        }
        handleAnimation(previousTopAnchor, previousBottomAnchor, previousTrailingAnchor, previousLeadingAnchor, multiplier: 1, iv: previousImageView)
    }
    
    fileprivate func setupView() {
        downLoadImagesIfNeeded()
        let offset = UIApplication.shared.keyWindow!.bounds.width
        
        addSubview(previousImageView)
        addSubview(currentImageView)
        addSubview(nextImageView)
        
        previousImageView.alpha = 0.5
        nextImageView.alpha = 0.5
        
        previousTopAnchor = previousImageView.topAnchor.constraint(equalTo: topAnchor, constant: 100)
        previousBottomAnchor = previousImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -100)
        previousTrailingAnchor = previousImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -offset)
        previousLeadingAnchor = previousImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: -offset)
        
        currentTopAnchor = currentImageView.topAnchor.constraint(equalTo: topAnchor)
        currentBottomAnchor = currentImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        currentTrailingAnchor = currentImageView.trailingAnchor.constraint(equalTo: trailingAnchor)
        currentLeadingAnchor = currentImageView.leadingAnchor.constraint(equalTo: leadingAnchor)
        
        nextTopAnchor = nextImageView.topAnchor.constraint(equalTo: topAnchor, constant: 100)
        nextBottomAnchor = nextImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -100)
        nextTrailingAnchor = nextImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: offset)
        nextLeadingAnchor = nextImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: offset)
        
        NSLayoutConstraint.activate([
            previousTopAnchor!, previousBottomAnchor!, previousLeadingAnchor!, previousTrailingAnchor!,
            currentTopAnchor!, currentBottomAnchor!, currentLeadingAnchor!, currentTrailingAnchor!,
            nextTopAnchor!, nextBottomAnchor!, nextTrailingAnchor!, nextLeadingAnchor!
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
