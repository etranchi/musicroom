//
//  SongDetailView.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/22/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class SongDetailView: UIView {
    
    var playlistView : PlaylistCollectionView?
    var track: Track? {
        didSet {
            titleLabel.text = track!.title
            authorLabel.text = track!.artist!.name
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        print("yo")
        /*apiManager.getUserPlaylists(completion: { (res) in
            print(res)
            self.playlistView!.eventCreation = true
            self.playlistView!.playlists = res
            print("yp")
            self.playlistView!.reloadData()
        })*/
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
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
        
        label.font = UIFont.systemFont(ofSize: 13, weight: .heavy)
        label.textColor = .lightGray
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let blurEffectView: UIVisualEffectView = {
        let visualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .dark))
        visualEffectView.isUserInteractionEnabled = false
        visualEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        visualEffectView.translatesAutoresizingMaskIntoConstraints = false
        return visualEffectView
    }()
    
    let cancelButton: UIButton = {
        let button = UIButton()
        button.setAttributedTitle(NSAttributedString(string: "Cancel", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white, .font: UIFont.systemFont(ofSize: 14, weight: .medium)]), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        return iv
    }()
    
    let detailView: UIView = {
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    func hideView() {
        isUserInteractionEnabled = false
        UIView.animate(withDuration: 0.75, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.detailView.transform = CGAffineTransform(translationX: 0, y: self.bounds.height)
        })
        UIView.animate(withDuration: 0.25, delay: 0.375, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.alpha = 0
        })
        
    }
    
    func showView() {
        isUserInteractionEnabled = true
        UIView.animate(withDuration: 0.25, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.alpha = 1
        })
        UIView.animate(withDuration: 0.75, delay: 0.125, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
            self.detailView.transform = .identity
        })
    }
    
    @objc func handleCancel() {
        hideView()
    }
    
    let containerView: UIView = {
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    @objc func handleAddToPlaylist() {
        playlistView?.isHidden = (playlistView?.isHidden)!
        print("track to add to a playlist")
    }
    
    @objc func handleAddToSongs() {
        print("track to add to songs")
    }
    
    func addButtons() {
        let addtoPlayListView = UIView()
        let addtoSongsView = UIView()
        let playListImageView: UIImageView = {
            let iv = UIImageView()
            
            iv.translatesAutoresizingMaskIntoConstraints = false
            iv.image = #imageLiteral(resourceName: "playlists_icon")
            iv.contentMode = .scaleAspectFit
            return iv
        }()
        
        let songsImageView: UIImageView = {
            let iv = UIImageView()
            
            iv.translatesAutoresizingMaskIntoConstraints = false
            iv.contentMode = .scaleAspectFit
            iv.image = #imageLiteral(resourceName: "songs_icon")
            return iv
        }()
        
        let playlistLabel: UILabel = {
            let label = UILabel()
            label.text = "add to playlist"
            label.font = UIFont.systemFont(ofSize: 12, weight: .heavy)
            label.textColor = .white
            label.textAlignment = .left
            label.numberOfLines = 1
            label.translatesAutoresizingMaskIntoConstraints = false
            return label
        }()
        
        let songsLabel: UILabel = {
            let label = UILabel()
            label.text = "add to songs library"
            label.font = UIFont.systemFont(ofSize: 12, weight: .heavy)
            label.textColor = .white
            label.textAlignment = .left
            label.numberOfLines = 1
            label.translatesAutoresizingMaskIntoConstraints = false
            return label
        }()
        
        addtoPlayListView.translatesAutoresizingMaskIntoConstraints = false
        addtoSongsView.translatesAutoresizingMaskIntoConstraints = false
        addtoPlayListView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleAddToPlaylist)))
        addtoSongsView.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(handleAddToSongs)))
        
        
        playlistView = PlaylistCollectionView([], .horizontal, nil)
        playlistView!.translatesAutoresizingMaskIntoConstraints = false
        
        containerView.addSubview(addtoSongsView)
        containerView.addSubview(addtoPlayListView)
        addtoPlayListView.addSubview(playListImageView)
        addtoPlayListView.addSubview(playlistLabel)
        addtoPlayListView.addSubview(playlistView!)
        playlistView?.isHidden = true
        addtoSongsView.addSubview(songsImageView)
        addtoSongsView.addSubview(songsLabel)
        NSLayoutConstraint.activate([
            addtoPlayListView.topAnchor.constraint(equalTo: containerView.topAnchor, constant: -2),
            addtoPlayListView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 2),
            addtoPlayListView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -2),
            addtoPlayListView.bottomAnchor.constraint(equalTo: containerView.centerYAnchor, constant: -1),
            
            addtoSongsView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -2),
            addtoSongsView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 2),
            addtoSongsView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -2),
            addtoSongsView.topAnchor.constraint(equalTo: containerView.centerYAnchor, constant: 1),
            
            playListImageView.centerYAnchor.constraint(equalTo: addtoPlayListView.centerYAnchor),
            playListImageView.leadingAnchor.constraint(equalTo: addtoPlayListView.leadingAnchor, constant: 3),
            playListImageView.widthAnchor.constraint(equalToConstant: 22),
            playListImageView.heightAnchor.constraint(equalToConstant: 22),
            
            songsImageView.centerYAnchor.constraint(equalTo: addtoSongsView.centerYAnchor),
            songsImageView.leadingAnchor.constraint(equalTo: addtoSongsView.leadingAnchor, constant: 3),
            songsImageView.widthAnchor.constraint(equalToConstant: 22),
            songsImageView.heightAnchor.constraint(equalToConstant: 22),
            
            playlistLabel.centerYAnchor.constraint(equalTo: addtoPlayListView.centerYAnchor),
            playlistLabel.leadingAnchor.constraint(equalTo: playListImageView.trailingAnchor, constant: 14),
            playlistLabel.heightAnchor.constraint(equalToConstant: 30),
            playlistLabel.trailingAnchor.constraint(equalTo: addtoPlayListView.trailingAnchor, constant: -5),
            
            songsLabel.centerYAnchor.constraint(equalTo: addtoSongsView.centerYAnchor),
            songsLabel.leadingAnchor.constraint(equalTo: songsImageView.trailingAnchor, constant: 14),
            songsLabel.heightAnchor.constraint(equalToConstant: 30),
            songsLabel.trailingAnchor.constraint(equalTo: addtoSongsView.trailingAnchor, constant: -5),
            
            playlistView!.topAnchor.constraint(equalTo: playListImageView.bottomAnchor, constant: 5),
            playlistView!.widthAnchor.constraint(equalTo: containerView.widthAnchor, multiplier: 0.9),
            playlistView!.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
            playlistView!.heightAnchor.constraint(equalToConstant: 200)
        ])
    }
    
    func setupView() {
        layer.masksToBounds = true
        cancelButton.addTarget(self, action: #selector(handleCancel), for: .touchUpInside)
        isUserInteractionEnabled = false
        alpha = 0
        let size = self.bounds.width * 0.65
        
        addSubview(blurEffectView)
        addSubview(detailView)
        detailView.addSubview(cancelButton)
        detailView.addSubview(imageView)
        detailView.addSubview(titleLabel)
        detailView.addSubview(authorLabel)
        detailView.addSubview(containerView)
        NSLayoutConstraint.activate([
            blurEffectView.topAnchor.constraint(equalTo: topAnchor),
            blurEffectView.bottomAnchor.constraint(equalTo: bottomAnchor),
            blurEffectView.leadingAnchor.constraint(equalTo: leadingAnchor),
            blurEffectView.trailingAnchor.constraint(equalTo: trailingAnchor),
            
            detailView.topAnchor.constraint(equalTo: topAnchor),
            detailView.bottomAnchor.constraint(equalTo: bottomAnchor),
            detailView.leadingAnchor.constraint(equalTo: leadingAnchor),
            detailView.trailingAnchor.constraint(equalTo: trailingAnchor),
            
            cancelButton.bottomAnchor.constraint(equalTo: detailView.safeAreaLayoutGuide.bottomAnchor, constant: -20),
            cancelButton.centerXAnchor.constraint(equalTo: centerXAnchor),
            cancelButton.widthAnchor.constraint(equalToConstant: 300),
            cancelButton.heightAnchor.constraint(equalToConstant: 30),
            
            imageView.topAnchor.constraint(equalTo: detailView.safeAreaLayoutGuide.topAnchor, constant: 100),
            imageView.centerXAnchor.constraint(equalTo: centerXAnchor),
            imageView.widthAnchor.constraint(equalToConstant: size),
            imageView.heightAnchor.constraint(equalToConstant: size),
            
            titleLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 20),
            titleLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
            titleLabel.widthAnchor.constraint(equalToConstant: size),
            titleLabel.heightAnchor.constraint(lessThanOrEqualToConstant: 40),
            
            authorLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 5),
            authorLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
            authorLabel.widthAnchor.constraint(equalToConstant: size),
            authorLabel.heightAnchor.constraint(equalToConstant: 15),
            
            containerView.topAnchor.constraint(equalTo: authorLabel.bottomAnchor, constant: 40),
            containerView.centerXAnchor.constraint(equalTo: centerXAnchor),
            containerView.widthAnchor.constraint(equalToConstant: size),
            containerView.heightAnchor.constraint(equalToConstant: 88)
        ])
        addButtons()
        self.detailView.transform = CGAffineTransform(translationX: 0, y: self.bounds.height)
    }
}
