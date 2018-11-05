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
        let moveOffset = UIApplication.shared.keyWindow!.bounds.width * 0.78 * multiplier
        
        top?.constant = 0
        bottom?.constant = 0
        trailing?.constant = 0
        leading?.constant = 0
        
        currentLeadingAnchor?.constant = moveOffset
        currentTrailingAnchor?.constant = moveOffset
        currentTopAnchor?.constant = 10
        currentBottomAnchor?.constant = -10
        
        dismissLeading?.constant = moveOffset * 2
        dismissLeading?.constant = moveOffset * 2
        
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
        let offset = UIApplication.shared.keyWindow!.bounds.width * 0.78
        downLoadImagesIfNeeded()
        addSubview(currentCoverImageView)
        addSubview(previousCoverImageView)
        addSubview(nextCoverImageView)
        previousCoverImageView.alpha = 0.5
        nextCoverImageView.alpha = 0.5
        
        previousTopAnchor = previousCoverImageView.topAnchor.constraint(equalTo: topAnchor, constant: 10)
        previousBottomAnchor = previousCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -10)
        previousLeadingAnchor = previousCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: -offset)
        previousTrailingAnchor = previousCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -offset)
        
        currentTopAnchor = currentCoverImageView.topAnchor.constraint(equalTo: topAnchor)
        currentBottomAnchor = currentCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor)
        currentLeadingAnchor = currentCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 0)
        currentTrailingAnchor = currentCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: 0)
        
        nextTopAnchor = nextCoverImageView.topAnchor.constraint(equalTo: topAnchor, constant: 10)
        nextBottomAnchor = nextCoverImageView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -10)
        nextLeadingAnchor = nextCoverImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: offset)
        nextTrailingAnchor = nextCoverImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: offset)
        
        NSLayoutConstraint.activate([
            previousTopAnchor!, previousBottomAnchor!, previousLeadingAnchor!, previousTrailingAnchor!,
            currentTopAnchor!, currentBottomAnchor!, currentLeadingAnchor!, currentTrailingAnchor!,
            nextTopAnchor!, nextBottomAnchor!, nextLeadingAnchor!, nextTrailingAnchor!
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
