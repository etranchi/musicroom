//
//  CoverContainerView.swift
//  MusicRoom
//
//  Created by jdavin on 11/4/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class CoverContainerView: UIView {
    
    let underPreviousTrack: Track?
    let previousTrack: Track?
    let currentTrack: Track
    let nextTrack: Track?
    let overNextTrack: Track?
    let playerController: PlayerController
    
    init(target: UIViewController, _ underPreviousTrack: Track?, _ previousTrack: Track?, _ currentTrack: Track, _ nextTrack: Track?, _ overNextTrack: Track?) {
        self.playerController = target as! PlayerController
        self.underPreviousTrack = underPreviousTrack
        self.previousTrack = previousTrack
        self.currentTrack = currentTrack
        self.nextTrack = nextTrack
        self.overNextTrack = overNextTrack
        super.init(frame: .zero)
        
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let underPreviousCoverImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFit
        return iv
    }()
    
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
    
    let overNextCoverImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFit
        return iv
    }()
    
    func handleAnimation(iv: UIImageView, isNext: Bool) {
        if isNext {
            currentLeadingAnchor?.constant -= offset - 30
            currentTrailingAnchor?.constant -= offset + 10
            nextTrailingAnchor?.constant += 40
        } else {
            currentLeadingAnchor?.constant += offset + 10
            currentTrailingAnchor?.constant += offset - 30
            previousLeadingAnchor?.constant -= 40
        }
        
        UIView.animate(withDuration: 0.5, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            iv.alpha = 1
            self.currentCoverImageView.alpha = 0.5
            self.layoutIfNeeded()
        }) { (finished) in self.playerController.setupTrack(indexOffset: isNext ? 1 : -1) }
    }
    
    func handleNextAnimation() {
        handleAnimation(iv: nextCoverImageView, isNext: true)
    }
    
    func handlePreviousAnimation() {
        handleAnimation(iv: previousCoverImageView, isNext: false)
    }
    
    var previousLeadingAnchor: NSLayoutConstraint?
    var previousTrailingAnchor: NSLayoutConstraint?
    var currentLeadingAnchor: NSLayoutConstraint?
    var currentTrailingAnchor: NSLayoutConstraint?
    var nextLeadingAnchor: NSLayoutConstraint?
    var nextTrailingAnchor: NSLayoutConstraint?
    let offset = UIApplication.shared.keyWindow!.bounds.width - 80
    
    func setupView() {
        downLoadImagesIfNeeded()
        
        addSubview(underPreviousCoverImageView)
        addSubview(previousCoverImageView)
        addSubview(currentCoverImageView)
        addSubview(nextCoverImageView)
        addSubview(overNextCoverImageView)
        
        underPreviousCoverImageView.alpha = 0.5
        previousCoverImageView.alpha = 0.5
        nextCoverImageView.alpha = 0.5
        overNextCoverImageView.alpha = 0.5
        
        previousLeadingAnchor = previousCoverImageView.leadingAnchor.constraint(equalTo: currentCoverImageView.leadingAnchor, constant: -offset + 30)
        previousTrailingAnchor = previousCoverImageView.trailingAnchor.constraint(equalTo: currentCoverImageView.leadingAnchor, constant: -10)
        currentLeadingAnchor = currentCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 40)
        currentTrailingAnchor = currentCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -40)
        nextLeadingAnchor = nextCoverImageView.leadingAnchor.constraint(equalTo: currentCoverImageView.trailingAnchor, constant: 10)
        nextTrailingAnchor = nextCoverImageView.trailingAnchor.constraint(equalTo: currentCoverImageView.trailingAnchor, constant: offset - 30)
        
        NSLayoutConstraint.activate([
            underPreviousCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            underPreviousCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            underPreviousCoverImageView.leadingAnchor.constraint(equalTo: previousCoverImageView.leadingAnchor, constant: -offset + 30),
            underPreviousCoverImageView.trailingAnchor.constraint(equalTo: previousCoverImageView.leadingAnchor, constant: -10),
            
            previousCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            previousCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            currentCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            currentCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            nextCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            nextCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            
            overNextCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            overNextCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            overNextCoverImageView.leadingAnchor.constraint(equalTo: nextCoverImageView.trailingAnchor, constant: 10),
            overNextCoverImageView.trailingAnchor.constraint(equalTo: nextCoverImageView.trailingAnchor, constant: offset - 30)
        ])
        
        NSLayoutConstraint.activate([
            previousLeadingAnchor!, previousTrailingAnchor!,
            currentLeadingAnchor!, currentTrailingAnchor!,
            nextLeadingAnchor!, nextTrailingAnchor!
        ])
    }
    
    func downLoadImagesIfNeeded() {
        if let underPrevious = underPreviousTrack {
            underPreviousCoverImageView.loadImageUsingCacheWithUrlString(urlString: underPrevious.album!.cover_big!)
        }
        if let previous = previousTrack {
            previousCoverImageView.loadImageUsingCacheWithUrlString(urlString: (previous.album!.cover_big!))
        }
        currentCoverImageView.loadImageUsingCacheWithUrlString(urlString: currentTrack.album!.cover_big!)
        if let next = nextTrack {
            nextCoverImageView.loadImageUsingCacheWithUrlString(urlString: next.album!.cover_big!)
        }
        if let overNext = overNextTrack {
            overNextCoverImageView.loadImageUsingCacheWithUrlString(urlString: overNext.album!.cover_big!)
        }
    }
}
