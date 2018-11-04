//
//  PlayerController.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlayerController: UIViewController, DZRPlayerDelegate {
    let tracks: [Track]
    var index: Int
    var hasPaused = false
    var isChangingMusic = false
    
    var networkType : DZRPlayerNetworkType?
    var request : DZRRequestManager?
    var cancelable : DZRCancelable?
    var deezer = DeezerManager()
    var track : DZRTrack?
    
    init(_ tracks: [Track], _ index: Int) {
        self.tracks = tracks
        self.index = index
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    let backgroundImageView: UIImageView = {
        let iv = UIImageView()
        
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.contentMode = .scaleAspectFill
        iv.clipsToBounds = true
        return iv
    }()

    let visualEffectView: UIVisualEffectView = {
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .dark))
        visualEffectView.isUserInteractionEnabled = false
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        visualEffectView.translatesAutoresizingMaskIntoConstraints = false
        return visualEffectView
    }()

    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let authorLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .lightGray
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let playButton: UIButton = {
        let button = UIButton(type: .system)
        let playIcon = UIImage(named: "play_icon")
        let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        return button
    }()
    
    let nextButton: UIButton = {
        let button = UIButton(type: .system)
        let playIcon = UIImage(named: "nextTrack_icon")
        let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        return button
    }()
    
    let previousButton: UIButton = {
        let button = UIButton(type: .system)
        let playIcon = UIImage(named: "previousTrack_icon")
        let tintedIcon = playIcon?.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        
        return button
    }()
    
    private lazy var player: DZRPlayer? = {
        guard let deezerConnect = DeezerManager.sharedInstance.deezerConnect,
            var _player = DZRPlayer(connection: deezerConnect) else { return nil }
        _player.shouldUpdateNowPlayingInfo = true
        _player.delegate = self
        return _player
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupBackground()
        setupPlayer()
        
        cancelable?.cancel()
        player?.stop()
        self.cancelable = DZRTrack.object(withIdentifier: String(tracks[index].id), requestManager: request, callback: { (response, err) in
            if let err = err {
                print("Player error: \(err.localizedDescription)")
                return
            }
            guard let res = response as? DZRTrack else { return }
            self.track = res
            self.setupButtons()
            self.setupProgressCircle()
        })
        
    }
    
    func setupPlayer() {
        player?.networkType = .wifiAnd3G
        player?.shouldUpdateNowPlayingInfo = true
        request = DZRRequestManager.default().sub()
    }
    
    func player(_ player: DZRPlayer!, didPlay playedBytes: Int64, outOf totalBytes: Int64) {
        progressCircle!.updateProgress(CGFloat(playedBytes) / CGFloat(totalBytes))
        if player.progress > 0.96 {
            hasPaused = false
            playButton.removeTarget(self, action: #selector(handlePause), for: .touchUpInside)
            playButton.addTarget(self, action: #selector(handlePlay), for: .touchUpInside)
            setPlayIcon()
            progressCircle?.updateProgress(0)
        }
    }
    
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
        if hasPaused == false {
            self.player?.play(track)
            print("playing \(tracks[index].title)")
        } else {
            self.player?.play()
            print("resuming \(tracks[index].title)")
            
        }
        setPauseIcon()
        playButton.removeTarget(self, action: #selector(handlePlay), for: .touchUpInside)
        playButton.addTarget(self, action: #selector(handlePause), for: .touchUpInside)
    }
    
    @objc func handlePause () {
        print("paused \(tracks[index].title)")
        self.player?.pause()
        hasPaused = true
        setPlayIcon()
        playButton.removeTarget(self, action: #selector(handlePause), for: .touchUpInside)
        playButton.addTarget(self, action: #selector(handlePlay), for: .touchUpInside)
    }
    
    @objc func handleNext() {
        if index + 1 < tracks.count, isChangingMusic == false {
            isChangingMusic = true
            coverContainerView?.handleNextAnimation()
        }
    }
    
    @objc func handlePrevious() {
        if index - 1 >= 0, isChangingMusic == false {
            isChangingMusic = true
            coverContainerView?.handlePreviousAnimation()
        }
    }
    
    func setupNextTrack() {
        isChangingMusic = false
    }
    
    func setupPreviousTrack() {
        isChangingMusic = false
    }
    
    fileprivate func setupCoverContainer() -> CoverContainerView {
        
        var previousTrack: Track? = nil
        var nextTrack: Track? = nil
        if index - 1 >= 0 {
            previousTrack = tracks[index - 1]
        }
        let currentTrack = tracks[index]
        if index + 1 < tracks.count {
            nextTrack = tracks[index + 1]
        }
        let coverContainerView = CoverContainerView(target: self, previousTrack, currentTrack, nextTrack)
        return coverContainerView
    }
    
    var coverContainerView: CoverContainerView?
    
    fileprivate func setupBackground() {
        navigationController?.navigationBar.topItem?.title = ""
        navigationController?.navigationBar.tintColor = .white
        backgroundImageView.loadImageUsingCacheWithUrlString(urlString: tracks[index].album.cover_big)
        coverContainerView = setupCoverContainer()
        coverContainerView?.translatesAutoresizingMaskIntoConstraints = false
        coverContainerView?.clipsToBounds = true
        
        titleLabel.text = tracks[index].title
        authorLabel.text = tracks[index].artist.name
        
        view.addSubview(backgroundImageView)
        view.addSubview(visualEffectView)
        view.addSubview(coverContainerView!)
        view.addSubview(titleLabel)
        view.addSubview(authorLabel)
        
        NSLayoutConstraint.activate([
            backgroundImageView.topAnchor.constraint(equalTo: view.topAnchor),
            backgroundImageView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            backgroundImageView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            backgroundImageView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            
            visualEffectView.topAnchor.constraint(equalTo: view.topAnchor),
            visualEffectView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            visualEffectView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            visualEffectView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            
            coverContainerView!.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            coverContainerView!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            coverContainerView!.heightAnchor.constraint(equalToConstant: view.bounds.width - 80),
            coverContainerView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            coverContainerView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            
            titleLabel.centerXAnchor.constraint(equalTo: coverContainerView!.centerXAnchor),
            titleLabel.topAnchor.constraint(equalTo: coverContainerView!.bottomAnchor, constant: 40),
            titleLabel.trailingAnchor.constraint(equalTo: coverContainerView!.trailingAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: coverContainerView!.leadingAnchor),
            
            authorLabel.centerXAnchor.constraint(equalTo: titleLabel.centerXAnchor),
            authorLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 5),
            authorLabel.trailingAnchor.constraint(equalTo: titleLabel.trailingAnchor),
            authorLabel.leadingAnchor.constraint(equalTo: titleLabel.leadingAnchor)
        ])
    }
    
    fileprivate func setupButtons() {
        previousButton.addTarget(self, action: #selector(handlePrevious), for: .touchUpInside)
        playButton.addTarget(self, action: #selector(handlePlay), for: .touchUpInside)
        nextButton.addTarget(self, action: #selector(handleNext), for: .touchUpInside)
        view.addSubview(previousButton)
        view.addSubview(playButton)
        view.addSubview(nextButton)
        
        NSLayoutConstraint.activate([
            previousButton.centerXAnchor.constraint(equalTo: view.centerXAnchor, constant: -80),
            previousButton.centerYAnchor.constraint(equalTo: playButton.centerYAnchor),
            previousButton.widthAnchor.constraint(equalToConstant: 30),
            previousButton.heightAnchor.constraint(equalToConstant: 30),
            
            playButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            playButton.topAnchor.constraint(equalTo: authorLabel.bottomAnchor, constant: 40),
            playButton.widthAnchor.constraint(equalToConstant: 80),
            playButton.heightAnchor.constraint(equalToConstant: 80),
            
            nextButton.centerXAnchor.constraint(equalTo: view.centerXAnchor, constant: 80),
            nextButton.centerYAnchor.constraint(equalTo: playButton.centerYAnchor),
            nextButton.widthAnchor.constraint(equalToConstant: 30),
            nextButton.heightAnchor.constraint(equalToConstant: 30)
        ])
    }
    
    
    var progressCircle: ProgressCircle?
    
    fileprivate func setupProgressCircle() {
        progressCircle = ProgressCircle(frame: CGRect(x: 0, y: 0, width: 76, height: 76))
        view.addSubview(progressCircle!)
        progressCircle!.translatesAutoresizingMaskIntoConstraints = false
        progressCircle!.isUserInteractionEnabled = false
        progressCircle!.layer.zPosition = playButton.layer.zPosition
        NSLayoutConstraint.activate([
            progressCircle!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            progressCircle!.centerYAnchor.constraint(equalTo: playButton.centerYAnchor),
            progressCircle!.widthAnchor.constraint(equalToConstant: 76),
            progressCircle!.heightAnchor.constraint(equalToConstant: 76)
        ])
    }
}
