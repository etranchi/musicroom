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
    
    func handleNextAnimation() {
        let moveOffset = -UIApplication.shared.keyWindow!.bounds.width
        
        nextTrailingAnchor?.constant = 0
        nextLeadingAnchor?.constant = 0
        
        currentTrailingAnchor?.constant = moveOffset
        currentLeadingAnchor?.constant = moveOffset
        
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.nextImageView.alpha = 1
            self.currentImageView.alpha = 0.5
            self.layoutIfNeeded()
        })
    }
    
    func handlePreviousAnimation() {
        let moveOffset = UIApplication.shared.keyWindow!.bounds.width
        previousTrailingAnchor?.constant = 0
        previousLeadingAnchor?.constant = 0
        
        currentTrailingAnchor?.constant = moveOffset
        currentLeadingAnchor?.constant = moveOffset
        
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.previousImageView.alpha = 1
            self.currentImageView.alpha = 0.5
            self.layoutIfNeeded()
        })
    }
    
    fileprivate func setupView() {
        downLoadImagesIfNeeded()
        let offset = UIApplication.shared.keyWindow!.bounds.width
        
        addSubview(previousImageView)
        addSubview(currentImageView)
        addSubview(nextImageView)
        
        previousImageView.alpha = 0.5
        nextImageView.alpha = 0.5
        
        previousTopAnchor = previousImageView.topAnchor.constraint(equalTo: topAnchor)
        previousBottomAnchor = previousImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        previousTrailingAnchor = previousImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -offset)
        previousLeadingAnchor = previousImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: -offset)
        
        currentTopAnchor = currentImageView.topAnchor.constraint(equalTo: topAnchor)
        currentBottomAnchor = currentImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        currentTrailingAnchor = currentImageView.trailingAnchor.constraint(equalTo: trailingAnchor)
        currentLeadingAnchor = currentImageView.leadingAnchor.constraint(equalTo: leadingAnchor)
        
        nextTopAnchor = nextImageView.topAnchor.constraint(equalTo: topAnchor)
        nextBottomAnchor = nextImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
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
            previousImageView.loadImageUsingCacheWithUrlString(urlString: previous.album.cover_big)
        }
        currentImageView.loadImageUsingCacheWithUrlString(urlString: currentTrack.album.cover_big)
        if let next = nextTrack {
            nextImageView.loadImageUsingCacheWithUrlString(urlString: next.album.cover_big)
        }
    }
}
