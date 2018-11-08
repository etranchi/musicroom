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
    
    init(_ tracks: [Track], _ index: Int) {
        self.tracks = tracks
        self.index = index
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    var hasPaused = false
    var isChangingMusic = false
    var isPlaying = true
    var firstPlay = true
    
    let request = DZRRequestManager.default().sub()
    var cancelable : DZRCancelable?
    var deezer = DeezerManager()
    var track : DZRTrack?
    
    var coverContainerView: CoverContainerView?
    var backgroundCoverView: BackgroundCoverView?
    var playerButtonView: PlayerButtonsView?

    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 1
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
    
    private lazy var player: DZRPlayer? = {
        guard let deezerConnect = DeezerManager.sharedInstance.deezerConnect,
            var _player = DZRPlayer(connection: deezerConnect) else { return nil }
        _player.shouldUpdateNowPlayingInfo = true
        _player.delegate = self
        _player.networkType = .wifiAnd3G
        _player.shouldUpdateNowPlayingInfo = true
        return _player
    }()
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(true)
        
        player?.stop()
        AppUtility.lockOrientation(.all)
        guard let navi = navigationController as? CustomNavigationController, let tabBar = tabBarController as? TabBarController else { return }
        navi.animatedShowNavigationBar()
        tabBar.animatedShowTabBar()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        guard let navi = navigationController as? CustomNavigationController, let tabBar = tabBarController as? TabBarController else { return }
        navi.animatedHideNavigationBar()
        tabBar.animatedHideTabBar()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupUI()
        loadTrackInplayer()
        playerButtonView?.handlePlay()
    }

    func player(_ player: DZRPlayer!, didPlay playedBytes: Int64, outOf totalBytes: Int64) {
        
        let progress = CGFloat(playedBytes) / CGFloat(totalBytes)
        if isChangingMusic == false {
            playerButtonView?.progressCircle?.updateProgress(progress)
        } else {
            playerButtonView?.progressCircle?.updateProgress(0)
        }
        if progress > 0.99 {
            playerButtonView?.handleNext()
        }
    }
    
    func handleNext() {
        if index + 1 < tracks.count, isChangingMusic == false {
            isChangingMusic = true
            index += 1
            loadTrackInplayer()
            backgroundCoverView?.handleNextAnimation()
            coverContainerView?.handleNextAnimation()
        }
    }
    
    func handlePrevious() {
        if index - 1 >= 0, isChangingMusic == false {
            index -= 1
            loadTrackInplayer()
            isChangingMusic = true
            backgroundCoverView?.handlePreviousAnimation()
            coverContainerView?.handlePreviousAnimation()
        }
    }
    
    func handlePlay() {
        isPlaying = true
        if firstPlay == true {
            self.player?.play(track)
            firstPlay = false
        } else {
            self.player?.play()
        }
    }
    
   func handlePause() {
        self.player?.pause()
        isPlaying = false
        hasPaused = true
        firstPlay = false
    }
    
    fileprivate func loadTrackInplayer() {
        cancelable?.cancel()
        cancelable = DZRTrack.object(withIdentifier: String(tracks[index].id), requestManager: request, callback: { (response, err) in
            if let err = err {
                print("Player error: \(err.localizedDescription)")
                return
            }
            DispatchQueue.main.async {
                self.player?.stop()
                guard let res = response as? DZRTrack else { return }
                self.track = res
                self.hasPaused = true
                self.player?.play(res)
                if self.isPlaying == true {
                    self.playerButtonView?.handlePlay()
                }
            }
        })
    }
    
    func setupTrack(indexOffset: Int) {
        backgroundCoverView?.removeFromSuperview()
        coverContainerView?.removeFromSuperview()
        titleLabel.removeFromSuperview()
        authorLabel.removeFromSuperview()
        playerButtonView?.removeFromSuperview()
        setupUI()
        hasPaused = false
        self.isChangingMusic = false
    }

    fileprivate func setupUI() {
        backgroundCoverView = setupBackgroudView()
        coverContainerView = setupCoverContainer()
        playerButtonView = PlayerButtonsView(target: self, isPlaying)
        playerButtonView?.translatesAutoresizingMaskIntoConstraints = false
        
        titleLabel.text = tracks[index].title
        authorLabel.text = tracks[index].artist!.name
        
        view.addSubview(backgroundCoverView!)
        view.addSubview(coverContainerView!)
        view.addSubview(titleLabel)
        view.addSubview(authorLabel)
        view.addSubview(playerButtonView!)
        
        NSLayoutConstraint.activate([
            backgroundCoverView!.topAnchor.constraint(equalTo: view.topAnchor),
            backgroundCoverView!.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            backgroundCoverView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            backgroundCoverView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            
            coverContainerView!.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: -40),
            coverContainerView!.bottomAnchor.constraint(equalTo: titleLabel.topAnchor, constant: -5),
            coverContainerView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            coverContainerView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            
            titleLabel.heightAnchor.constraint(equalToConstant: 20),
            titleLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            titleLabel.bottomAnchor.constraint(equalTo: authorLabel.topAnchor, constant: -5),
            
            authorLabel.bottomAnchor.constraint(equalTo: playerButtonView!.topAnchor, constant: -20),
            authorLabel.heightAnchor.constraint(equalToConstant: 20),
            authorLabel.trailingAnchor.constraint(equalTo: titleLabel.trailingAnchor),
            authorLabel.leadingAnchor.constraint(equalTo: titleLabel.leadingAnchor),
            
            playerButtonView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            playerButtonView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            playerButtonView!.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -view.bounds.height * 0.2),
            playerButtonView!.heightAnchor.constraint(equalToConstant: 80)
        ])
    }
}

extension PlayerController {
    fileprivate func setupCoverContainer() -> CoverContainerView {
        var underPreviousTrack: Track? = nil
        var previousTrack: Track? = nil
        var nextTrack: Track? = nil
        var overNextTrack: Track? = nil
        if index - 2 >= 0 {
            underPreviousTrack = tracks[index - 2]
        }
        if index - 1 >= 0 {
            previousTrack = tracks[index - 1]
        }
        let currentTrack = tracks[index]
        if index + 1 < tracks.count {
            nextTrack = tracks[index + 1]
        }
        if index + 2 < tracks.count {
            overNextTrack = tracks[index + 2]
        }
        let ccv = CoverContainerView(target: self, underPreviousTrack, previousTrack, currentTrack, nextTrack, overNextTrack)
        ccv.translatesAutoresizingMaskIntoConstraints = false
        ccv.clipsToBounds = true
        return ccv
    }
    
    fileprivate func setupBackgroudView() -> BackgroundCoverView {
        var previousTrack: Track? = nil
        var nextTrack: Track? = nil
        if index - 1 >= 0 {
            previousTrack = tracks[index - 1]
        }
        let currentTrack = tracks[index]
        if index + 1 < tracks.count {
            nextTrack = tracks[index + 1]
        }
        let bcv = BackgroundCoverView(previousTrack, currentTrack, nextTrack)
        bcv.translatesAutoresizingMaskIntoConstraints = false
        bcv.clipsToBounds = true
        return bcv
    }
}
