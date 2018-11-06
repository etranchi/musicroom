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
    
    func handleAnimation(_ top: NSLayoutConstraint?, _ bottom: NSLayoutConstraint?, _ trailing: NSLayoutConstraint?, _ leading: NSLayoutConstraint?,
                         _ dismissLeading: NSLayoutConstraint?, _ dismissTrailing: NSLayoutConstraint? ,multiplier: CGFloat, iv: UIImageView) {
        let moveOffset = UIApplication.shared.keyWindow!.bounds.width
        
        if multiplier == -1 {
            currentLeadingAnchor?.constant -= moveOffset - 110
            currentTrailingAnchor?.constant -= moveOffset - 70
            nextTrailingAnchor?.constant += 40
        } else {
            currentLeadingAnchor?.constant += (moveOffset - 70)
            currentTrailingAnchor?.constant += (moveOffset - 110)
            previousLeadingAnchor?.constant -= 40
        }
        
        
        
        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            iv.alpha = 1
            self.currentCoverImageView.alpha = 0.5
            self.layoutIfNeeded()
        }) { (finished) in
            self.playerController.setupTrack(indexOffset: Int(-multiplier))
        }
    }
    
    func handleNextAnimation() {
        handleAnimation(nextTopAnchor, nextBottomAnchor, nextTrailingAnchor, nextLeadingAnchor, previousLeadingAnchor, previousTrailingAnchor, multiplier: -1, iv: nextCoverImageView)
    }
    
    func handlePreviousAnimation() {
        handleAnimation(previousTopAnchor, previousBottomAnchor, previousTrailingAnchor, previousLeadingAnchor, nextLeadingAnchor, nextTrailingAnchor, multiplier: 1, iv: previousCoverImageView)
    }
    
    var previousTopAnchor: NSLayoutConstraint?
    var previousBottomAnchor: NSLayoutConstraint?
    var previousLeadingAnchor: NSLayoutConstraint?
    var previousTrailingAnchor: NSLayoutConstraint?
    
    var currentTopAnchor: NSLayoutConstraint?
    var currentBottomAnchor: NSLayoutConstraint?
    var currentLeadingAnchor: NSLayoutConstraint?
    var currentTrailingAnchor: NSLayoutConstraint?
    
    var nextTopAnchor: NSLayoutConstraint?
    var nextBottomAnchor: NSLayoutConstraint?
    var nextLeadingAnchor: NSLayoutConstraint?
    var nextTrailingAnchor: NSLayoutConstraint?
    
    func setupView() {
        let offset = UIApplication.shared.keyWindow!.bounds.width - 80
        downLoadImagesIfNeeded()
        addSubview(currentCoverImageView)
        addSubview(previousCoverImageView)
        addSubview(nextCoverImageView)
        previousCoverImageView.alpha = 0.5
        nextCoverImageView.alpha = 0.5
        
        previousTopAnchor = previousCoverImageView.topAnchor.constraint(equalTo: topAnchor)
        previousBottomAnchor = previousCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        previousLeadingAnchor = previousCoverImageView.leadingAnchor.constraint(equalTo: currentCoverImageView.leadingAnchor, constant: -offset + 30)
        previousTrailingAnchor = previousCoverImageView.trailingAnchor.constraint(equalTo: currentCoverImageView.leadingAnchor, constant: -10)
        
        currentTopAnchor = currentCoverImageView.topAnchor.constraint(equalTo: topAnchor)
        currentBottomAnchor = currentCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        currentLeadingAnchor = currentCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 40)
        currentTrailingAnchor = currentCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -40)
        
        nextTopAnchor = nextCoverImageView.topAnchor.constraint(equalTo: topAnchor)
        nextBottomAnchor = nextCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        nextLeadingAnchor = nextCoverImageView.leadingAnchor.constraint(equalTo: currentCoverImageView.trailingAnchor, constant: 10)
        nextTrailingAnchor = nextCoverImageView.trailingAnchor.constraint(equalTo: currentCoverImageView.trailingAnchor, constant: offset - 30)
        
        NSLayoutConstraint.activate([
            previousTopAnchor!, previousBottomAnchor!, previousLeadingAnchor!, previousTrailingAnchor!,
            currentTopAnchor!, currentBottomAnchor!, currentLeadingAnchor!, currentTrailingAnchor!,
            nextTopAnchor!, nextBottomAnchor!, nextLeadingAnchor!, nextTrailingAnchor!
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
