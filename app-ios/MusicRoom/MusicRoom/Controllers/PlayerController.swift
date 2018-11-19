//
//  PlayerController.swift
//  MusicRoom
//
//  Created by jdavin on 11/3/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlayerController: UIViewController, DZRPlayerDelegate {
    
    var tracks: [Track]
    var index: Int
    var rootViewController: TabBarController?
    var minimizedPlayer: MinimizedPlayerView?
    
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
    var cancelable: DZRCancelable?
    var track: DZRTrack?
    
    var coverContainerView: CoverContainerView?
    var backgroundCoverView: BackgroundCoverView?
    var playerButtonView: PlayerButtonsView?
    
    let containerTitleLabel: UIView = {
        let container = UIView()
        
        container.alpha = 1
        container.clipsToBounds = true
        return container
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textAlignment = .center
        label.textColor = .white
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
    
    let downButton: UIButton = {
        let button = UIButton(type: .system)
        let icon = #imageLiteral(resourceName: "down_icon")
        let tintedIcon = icon.withRenderingMode(.alwaysTemplate)
        button.setImage(tintedIcon, for: .normal)
        button.tintColor = UIColor(white: 1, alpha: 1)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.isUserInteractionEnabled = true
        return button
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
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    func player(_ player: DZRPlayer!, didPlay playedBytes: Int64, outOf totalBytes: Int64) {
        guard totalBytes > 0 else { return }
        let progress = CGFloat(playedBytes) / CGFloat(totalBytes)
        if isChangingMusic == false {
            playerButtonView?.progressCircle?.updateProgress(progress)
        } else {
            playerButtonView?.progressCircle?.updateProgress(0)
        }
        if progress > 0.999 {
            handleNext()
        }
    }
    
    func viewDidPop() {
        guard index >= 0 else { return }
        loadTrackInplayer()
        setupTrack(indexOffset: index)
        playerButtonView?.handlePlay()
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
        playerButtonView?.playButton.removeTarget(playerButtonView, action: #selector(playerButtonView?.handlePlay), for: .touchUpInside)
        playerButtonView?.playButton.addTarget(playerButtonView, action: #selector(playerButtonView?.handlePause), for: .touchUpInside)
        playerButtonView?.setPauseIcon()
        isPlaying = true
        if firstPlay {
            self.player?.play(track)
            firstPlay = false
        } else {
            self.player?.play()
        }
        minimizedPlayer?.update(isPlaying: true, title: tracks[index].title, artist: tracks[index].artist!.name)
    }
    
    func handlePause() {
        playerButtonView?.playButton.removeTarget(playerButtonView, action: #selector(playerButtonView?.handlePause), for: .touchUpInside)
        playerButtonView?.playButton.addTarget(playerButtonView, action: #selector(playerButtonView?.handlePlay), for: .touchUpInside)
        playerButtonView?.setPlayIcon()
        self.player?.pause()
        isPlaying = false
        hasPaused = true
        firstPlay = false
        minimizedPlayer?.update(isPlaying: false, title: tracks[index].title, artist: tracks[index].artist!.name)
    }
    
    
    
    func loadTrackInplayer() {
        cancelable = DZRTrack.object(withIdentifier: String(tracks[index].id), requestManager: request, callback: { (response, err) in
            if err != nil {
                print(err!)
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
                self.minimizedPlayer?.update(isPlaying: self.isPlaying, title: self.tracks[self.index].title, artist: self.tracks[self.index].artist!.name)
                currentTrack = self.tracks[self.index]
                self.reloadView()
            }
        })
        
    }
    
    fileprivate func reloadView() {
        if let cu = (UIApplication.shared.keyWindow?.rootViewController as? TabBarController)?.selectedViewController as? CustomNavigationController {
            if let co = cu.topViewController as? UICollectionViewController {
                co.collectionView?.reloadData()
            }
            if let ta = cu.topViewController as? UITableViewController {
                ta.tableView.reloadData()
            }
        }
    }
    
    @objc func handleHide() {
        rootViewController?.animatedHidePlayer()
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
        if isPlaying {
            playerButtonView?.handlePlay()
        }
    }
    
    fileprivate func setupUI() {
        if firstPlay {
            cancelable?.cancel()
        }
        backgroundCoverView = setupBackgroudView()
        coverContainerView = setupCoverContainer()
        playerButtonView = PlayerButtonsView(target: self, isPlaying)
        downButton.addTarget(self, action: #selector(handleHide), for: .touchUpInside)
        playerButtonView?.translatesAutoresizingMaskIntoConstraints = false
        
        titleLabel.layer.removeAllAnimations()
        titleLabel.transform = CGAffineTransform.identity
        titleLabel.text = tracks[index].title
        authorLabel.text = tracks[index].artist!.name
        
        view.addSubview(backgroundCoverView!)
        view.addSubview(coverContainerView!)
        view.addSubview(containerTitleLabel)
        containerTitleLabel.addSubview(titleLabel)
        containerTitleLabel.addSubview(authorLabel)
        view.addSubview(playerButtonView!)
        view.addSubview(downButton)
        
        print(titleLabel.text!)
        print(titleLabel.text!.count)
        
        containerTitleLabel.anchor(top: coverContainerView?.bottomAnchor, leading: coverContainerView?.leadingAnchor, bottom: authorLabel.bottomAnchor, trailing: coverContainerView?.trailingAnchor, padding: .init(top: 0, left: 40, bottom: 0, right: 40),size: .init(width: 0, height: 45))
        
        
        
        if titleLabel.text!.count >= 41 {
            UIView.animate(withDuration: 4.0, delay: 2.0, options: [.autoreverse, .repeat], animations: {
                self.titleLabel.transform = CGAffineTransform(translationX: -150, y: 0)
            })
        } else {
            titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        }
        
        
        NSLayoutConstraint.activate([
            backgroundCoverView!.topAnchor.constraint(equalTo: view.topAnchor),
            backgroundCoverView!.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            backgroundCoverView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            backgroundCoverView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            
            downButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 45),
            downButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 7),
            downButton.widthAnchor.constraint(equalToConstant: 27),
            downButton.heightAnchor.constraint(equalToConstant: 26),
            
            coverContainerView!.topAnchor.constraint(equalTo: view.topAnchor, constant: 40),
            coverContainerView!.bottomAnchor.constraint(equalTo: containerTitleLabel.topAnchor),
            coverContainerView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            coverContainerView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            
            titleLabel.topAnchor.constraint(equalTo: containerTitleLabel.topAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: containerTitleLabel.leadingAnchor),
            titleLabel.widthAnchor.constraint(lessThanOrEqualToConstant: 3000),
            titleLabel.bottomAnchor.constraint(equalTo: authorLabel.bottomAnchor, constant: -20),
            
            authorLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            authorLabel.bottomAnchor.constraint(equalTo: containerTitleLabel.bottomAnchor),
            authorLabel.trailingAnchor.constraint(equalTo: containerTitleLabel.trailingAnchor),
            authorLabel.leadingAnchor.constraint(equalTo: containerTitleLabel.leadingAnchor),
            
            playerButtonView!.topAnchor.constraint(equalTo: containerTitleLabel.bottomAnchor, constant: 30),
            playerButtonView!.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            playerButtonView!.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            playerButtonView!.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -view.bounds.height * 0.17),
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
