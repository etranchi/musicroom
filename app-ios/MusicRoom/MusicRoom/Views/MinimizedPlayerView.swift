//
//  MinimizedPlayerView.swift
//  MusicRoom
//
//  Created by jdavin on 11/8/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class MinimizedPlayerView: UIView {
    var playerIsPushable = false
    
    init() {
        super.init(frame: .zero)
        
        setupView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let playerContainerView: UIView = {
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        view.isUserInteractionEnabled = true
        return view
    }()
    
    let playButton: UIButton = {
        let button = UIButton(type: .system)
        let playIcon = UIImage(named: "play_icon")
        let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.isUserInteractionEnabled = true
        return button
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 12, weight: .medium)
        label.text = "Ready to play"
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        label.isUserInteractionEnabled = true
        return label
    }()
    
    
    
    let authorLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 12, weight: .medium)
        label.text = "Your favorite songs"
        label.textColor = .lightGray
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        label.isUserInteractionEnabled = true
        return label
    }()
    
    let downButton: UIButton = {
        let button = UIButton(type: .system)
        let playIcon = UIImage(named: "like_icon")
        let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.isUserInteractionEnabled = true
        return button
    }()
    
    let separator0: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = UIColor(white: 0.3, alpha: 0.6)
        return view
    }()
    
    let separator1: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        
        view.heightAnchor.constraint(equalToConstant: 1).isActive = true
        view.backgroundColor = UIColor(white: 0.3, alpha: 0.6)
        return view
    }()
    
    func setPlayIcon() {
        let playIcon = UIImage(named: "play_icon")
        
        let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
        playButton.setImage(tintedIcon, for: .normal)
    }
    
    func setPauseIcon() {
        let playIcon = UIImage(named: "pause_icon")
        let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
        playButton.setImage(tintedIcon, for: .normal)
    }
    
    @objc func handlePlay() {
        playButton.addTarget(self, action: #selector(handlePause), for: .touchUpInside)
        setPauseIcon()
        playerController.handlePlay()
    }
    
    @objc func handlePause() {
        playButton.addTarget(self, action: #selector(handlePlay), for: .touchUpInside)
        setPlayIcon()
        playerController.handlePause()
    }
    
    func update(isPlaying: Bool, title: String, artist: String) {
        if isPlaying {
            playButton.removeTarget(self, action: #selector(handlePlay), for: .touchUpInside)
            playButton.addTarget(self, action: #selector(handlePause), for: .touchUpInside)
            setPauseIcon()
            playerIsPushable = true
        } else {
            playButton.removeTarget(self, action: #selector(handlePause), for: .touchUpInside)
            playButton.addTarget(self, action: #selector(handlePlay), for: .touchUpInside)
            setPlayIcon()
            playerIsPushable = true
        }
        titleLabel.text = playerController.titleLabel.text
        authorLabel.text = playerController.authorLabel.text
    }
    
    @objc func pushPlayer() {
        if playerIsPushable {
            let tabBarController = UIApplication.shared.keyWindow?.rootViewController as! TabBarController
            tabBarController.showPlayerFromMinimized()
        }
    }
    
    @objc func handleLike() {
        
    }
    
    fileprivate func setupPlayerContainerBackground() {
        playerContainerView.backgroundColor = UIColor(white: 0.4, alpha: 0.6)
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .dark))
        visualEffectView.translatesAutoresizingMaskIntoConstraints = false
        visualEffectView.isUserInteractionEnabled = false
        playerContainerView.addSubview(visualEffectView)
        NSLayoutConstraint.activate([
            visualEffectView.topAnchor.constraint(equalTo: playerContainerView.topAnchor),
            visualEffectView.trailingAnchor.constraint(equalTo: playerContainerView.trailingAnchor),
            visualEffectView.leadingAnchor.constraint(equalTo: playerContainerView.leadingAnchor),
            visualEffectView.bottomAnchor.constraint(equalTo: playerContainerView.bottomAnchor),
        ])
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        visualEffectView.layer.zPosition = -1
        playerContainerView.addSubview(separator0)
        playerContainerView.addSubview(separator1)
        NSLayoutConstraint.activate([
            separator0.trailingAnchor.constraint(equalTo: playerContainerView.trailingAnchor),
            separator0.leadingAnchor.constraint(equalTo: playerContainerView.leadingAnchor),
            separator0.topAnchor.constraint(equalTo: playerContainerView.bottomAnchor),
            
            separator1.trailingAnchor.constraint(equalTo: playerContainerView.trailingAnchor),
            separator1.leadingAnchor.constraint(equalTo: playerContainerView.leadingAnchor),
            separator1.bottomAnchor.constraint(equalTo: playerContainerView.topAnchor),
        ])
        
    }
    
    fileprivate func setupView() {
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(pushPlayer))
        titleLabel.addGestureRecognizer(tapGesture)
        authorLabel.addGestureRecognizer(tapGesture)
        downButton.addTarget(self, action: #selector(handleLike), for: .touchUpInside)
        translatesAutoresizingMaskIntoConstraints = false
        playerContainerView.layer.zPosition = 10
        playerContainerView.backgroundColor = .red
        addSubview(playerContainerView)
        setupPlayerContainerBackground()
        playerContainerView.addSubview(playButton)
        playerContainerView.addSubview(downButton)
        playerContainerView.addSubview(titleLabel)
        playerContainerView.addSubview(authorLabel)
        
        NSLayoutConstraint.activate([
            playerContainerView.topAnchor.constraint(equalTo: topAnchor),
            playerContainerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            playerContainerView.heightAnchor.constraint(equalToConstant: 44),
            playerContainerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            
            playButton.centerYAnchor.constraint(equalTo: playerContainerView.centerYAnchor),
            playButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -14),
            playButton.widthAnchor.constraint(equalToConstant: 30),
            playButton.heightAnchor.constraint(equalToConstant: 30),
            
            downButton.centerYAnchor.constraint(equalTo: playerContainerView.centerYAnchor),
            downButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            downButton.widthAnchor.constraint(equalToConstant: 28),
            downButton.heightAnchor.constraint(equalToConstant: 28),
            
            titleLabel.leadingAnchor.constraint(equalTo: downButton.trailingAnchor, constant: 10),
            titleLabel.trailingAnchor.constraint(equalTo: playButton.leadingAnchor, constant: -10),
            titleLabel.topAnchor.constraint(equalTo: playerContainerView.topAnchor, constant: 4),
            titleLabel.heightAnchor.constraint(equalToConstant: 18),
            
            authorLabel.leadingAnchor.constraint(equalTo: downButton.trailingAnchor, constant: 10),
            authorLabel.trailingAnchor.constraint(equalTo: playButton.leadingAnchor, constant: -10),
            authorLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: -2),
            authorLabel.heightAnchor.constraint(equalToConstant: 22)
        ])
    }
}
