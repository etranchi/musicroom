//
//  CoverContainerView.swift
//  MusicRoom
//
//  Created by jdavin on 11/4/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class CoverContainerView: UIView {
    
    let previousTrack: Track?
    let currentTrack: Track
    let nextTrack: Track?
    let playerController: PlayerController
    
    init(target: UIViewController, _ previousTrack: Track?, _ currentTrack: Track, _ nextTrack: Track?) {
        self.playerController = target as! PlayerController
        self.previousTrack = previousTrack
        self.currentTrack = currentTrack
        self.nextTrack = nextTrack
        super.init(frame: .zero)
        
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let previousCoverImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFit
        return iv
    }()
    
    let currentCoverImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFit
        return iv
    }()
    
    let nextCoverImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFit
        return iv
    }()
    
    func handleNextAnimation() {
        let moveOffset = -UIApplication.shared.keyWindow!.bounds.width * 0.78
        
        nextRightAnchor?.constant = 0
        nextWidthAnchor?.constant = 0
        nextTopAnchor?.constant = 0
        nextBottomAnchor?.constant = 0
        
        currentRightAnchor?.constant = moveOffset
        currentWidthAnchor?.constant = moveOffset
        currentTopAnchor?.constant = 10
        currentBottomAnchor?.constant = -10
        
        previousRightAnchor?.constant = moveOffset * 2
        previousWidthAnchor?.constant = moveOffset * 2
    
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.nextCoverImageView.alpha = 1
            self.currentCoverImageView.alpha = 0.5
            self.layoutIfNeeded()
        }) { (finished) in
            self.playerController.setupTrack(indexOffset: 1)
        }
    }
    
    func handlePreviousAnimation() {
        let moveOffset = UIApplication.shared.keyWindow!.bounds.width * 0.78
        previousRightAnchor?.constant = 0
        previousWidthAnchor?.constant = 0
        previousTopAnchor?.constant = 0
        previousBottomAnchor?.constant = 0
        
        currentRightAnchor?.constant = moveOffset
        currentWidthAnchor?.constant = moveOffset
        currentTopAnchor?.constant = 10
        currentBottomAnchor?.constant = -10
        
        nextRightAnchor?.constant = moveOffset * 2
        nextWidthAnchor?.constant = moveOffset * 2
        
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.previousCoverImageView.alpha = 1
            self.currentCoverImageView.alpha = 0.5
            self.layoutIfNeeded()
        }){ (finished) in
            self.playerController.setupTrack(indexOffset: -1)
        }
    }
    
    var previousTopAnchor: NSLayoutConstraint?
    var previousBottomAnchor: NSLayoutConstraint?
    var previousRightAnchor: NSLayoutConstraint?
    var previousWidthAnchor: NSLayoutConstraint?
    
    var currentTopAnchor: NSLayoutConstraint?
    var currentBottomAnchor: NSLayoutConstraint?
    var currentRightAnchor: NSLayoutConstraint?
    var currentWidthAnchor: NSLayoutConstraint?
    
    var nextTopAnchor: NSLayoutConstraint?
    var nextBottomAnchor: NSLayoutConstraint?
    var nextRightAnchor: NSLayoutConstraint?
    var nextWidthAnchor: NSLayoutConstraint?
    
    func setupView() {
        let offset = UIApplication.shared.keyWindow!.bounds.width * 0.78
        downLoadImagesIfNeeded()
        addSubview(currentCoverImageView)
        addSubview(previousCoverImageView)
        addSubview(nextCoverImageView)
        previousCoverImageView.alpha = 0.5
        nextCoverImageView.alpha = 0.5
        
        previousTopAnchor = previousCoverImageView.topAnchor.constraint(equalTo: topAnchor, constant: 10)
        previousBottomAnchor = previousCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -10)
        previousRightAnchor = previousCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -offset)
        previousWidthAnchor = previousCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: -offset)
        
        currentTopAnchor = currentCoverImageView.topAnchor.constraint(equalTo: topAnchor)
        currentBottomAnchor = currentCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        currentRightAnchor = currentCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: 0)
        currentWidthAnchor = currentCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 0)
        
        nextTopAnchor = nextCoverImageView.topAnchor.constraint(equalTo: topAnchor, constant: 10)
        nextBottomAnchor = nextCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -10)
        nextRightAnchor = nextCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: offset)
        nextWidthAnchor = nextCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: offset)
        
        NSLayoutConstraint.activate([
            previousTopAnchor!, previousBottomAnchor!, previousRightAnchor!, previousWidthAnchor!,
            currentTopAnchor!, currentBottomAnchor!, currentRightAnchor!, currentWidthAnchor!,
            nextTopAnchor!, nextBottomAnchor!, nextRightAnchor!, nextWidthAnchor!
        ])
    }
    
    func downLoadImagesIfNeeded() {
        if let previous = previousTrack {
            previousCoverImageView.loadImageUsingCacheWithUrlString(urlString: previous.album.cover_medium)
        }
        currentCoverImageView.loadImageUsingCacheWithUrlString(urlString: currentTrack.album.cover_medium)
        if let next = nextTrack {
            nextCoverImageView.loadImageUsingCacheWithUrlString(urlString: next.album.cover_medium)
        }
    }
}
