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
        
        UIView.animate(withDuration: 0.4, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
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
        addSubview(currentCoverImageView)
        addSubview(previousCoverImageView)
        addSubview(nextCoverImageView)
        previousCoverImageView.alpha = 0.5
        nextCoverImageView.alpha = 0.5
        
        previousLeadingAnchor = previousCoverImageView.leadingAnchor.constraint(equalTo: currentCoverImageView.leadingAnchor, constant: -offset + 30)
        previousTrailingAnchor = previousCoverImageView.trailingAnchor.constraint(equalTo: currentCoverImageView.leadingAnchor, constant: -10)
        currentLeadingAnchor = currentCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 40)
        currentTrailingAnchor = currentCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -40)
        nextLeadingAnchor = nextCoverImageView.leadingAnchor.constraint(equalTo: currentCoverImageView.trailingAnchor, constant: 10)
        nextTrailingAnchor = nextCoverImageView.trailingAnchor.constraint(equalTo: currentCoverImageView.trailingAnchor, constant: offset - 30)
        
        NSLayoutConstraint.activate([
            previousCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            previousCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            currentCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            currentCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            nextCoverImageView.topAnchor.constraint(equalTo: topAnchor),
            nextCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])
        
        NSLayoutConstraint.activate([
            previousLeadingAnchor!, previousTrailingAnchor!,
            currentLeadingAnchor!, currentTrailingAnchor!,
            nextLeadingAnchor!, nextTrailingAnchor!
        ])
    }
    
    func downLoadImagesIfNeeded() {
        if let previous = previousTrack {
            previousCoverImageView.loadImageUsingCacheWithUrlString(urlString: (previous.album!.cover_medium!))
        }
        currentCoverImageView.loadImageUsingCacheWithUrlString(urlString: currentTrack.album!.cover_medium!)
        if let next = nextTrack {
            nextCoverImageView.loadImageUsingCacheWithUrlString(urlString: next.album!.cover_medium!)
        }
    }
}
