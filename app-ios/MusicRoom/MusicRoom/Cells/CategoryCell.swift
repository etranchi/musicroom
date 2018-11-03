//
//  CategoryCell.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class AlbumCell: UICollectionViewCell {
    
    var album: Album! {
        didSet {
            authorLabel.text = album.artist.name
            titleLabel.text = album.title
            imageView.loadImageUsingCacheWithUrlString(urlString: album.cover_medium)
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        return iv
    }()
    
    let timeLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .light)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
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
    
    func setupViews() {
        
        addSubview(imageView)
        addSubview(titleLabel)
        addSubview(authorLabel)
        
        NSLayoutConstraint.activate([
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor, constant: -30),
            imageView.centerXAnchor.constraint(equalTo: centerXAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 150),
            imageView.widthAnchor.constraint(equalToConstant: 150),
            
            titleLabel.centerXAnchor.constraint(equalTo: imageView.centerXAnchor),
            titleLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            
            authorLabel.centerXAnchor.constraint(equalTo: titleLabel.centerXAnchor),
            authorLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 2),
            authorLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            authorLabel.leadingAnchor.constraint(equalTo: leadingAnchor)
        ])
    }
}

class SongCell: UICollectionViewCell {
    var track: Track! {
        didSet {
            authorLabel.text = track.artist.name
            titleLabel.text = track.title
            let sec = track.duration % 60
            if sec < 10 {
                timeLabel.text = String(track.duration / 60) + ":0" + String(sec)
            } else {
                timeLabel.text = String(track.duration / 60) + ":" + String(sec)
            }
            imageView.loadImageUsingCacheWithUrlString(urlString: track.album.cover_small)
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        return iv
    }()
    
    let timeLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 12, weight: .light)
        label.textColor = .lightGray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let authorLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .lightGray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    func setupViews() {
        
        addSubview(imageView)
        addSubview(titleLabel)
        addSubview(authorLabel)
        addSubview(timeLabel)
        
        NSLayoutConstraint.activate([
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 50),
            imageView.widthAnchor.constraint(equalToConstant: 50),
            imageView.leadingAnchor.constraint(equalTo: safeAreaLayoutGuide.leadingAnchor, constant: 14),
            
            titleLabel.topAnchor.constraint(equalTo: imageView.topAnchor),
            titleLabel.heightAnchor.constraint(lessThanOrEqualToConstant: 30),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: imageView.trailingAnchor, constant: 5),
            
            authorLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor),
            authorLabel.heightAnchor.constraint(equalToConstant: 18),
            authorLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            authorLabel.leadingAnchor.constraint(equalTo: titleLabel.leadingAnchor),
            
            timeLabel.topAnchor.constraint(equalTo: authorLabel.bottomAnchor, constant: 2),
            timeLabel.heightAnchor.constraint(equalToConstant: 10),
            timeLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            timeLabel.leadingAnchor.constraint(equalTo: authorLabel.leadingAnchor)
        ])
    }
}

class ArtistCell: UICollectionViewCell {
    var artist: Artist! {
        didSet {
            artistLabel.text = artist.name
            fanLabel.text = "\(artist.nb_fan) fans"
            imageView.loadImageUsingCacheWithUrlString(urlString: artist.picture_medium)
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        iv.layer.cornerRadius = 50
        return iv
    }()
    
    let artistLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let fanLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .lightGray
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    func setupViews() {
        
        addSubview(imageView)
        addSubview(artistLabel)
        addSubview(fanLabel)
        
        NSLayoutConstraint.activate([
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor, constant: -30),
            imageView.centerXAnchor.constraint(equalTo: centerXAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 100),
            imageView.widthAnchor.constraint(equalToConstant: 100),
            
            artistLabel.centerXAnchor.constraint(equalTo: imageView.centerXAnchor),
            artistLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 5),
            artistLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            artistLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            
            fanLabel.centerXAnchor.constraint(equalTo: artistLabel.centerXAnchor),
            fanLabel.topAnchor.constraint(equalTo: artistLabel.bottomAnchor, constant: 2),
            fanLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            fanLabel.leadingAnchor.constraint(equalTo: leadingAnchor)
        ])
    }}

class SeeAllSongsCell: UICollectionViewCell {
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let messageLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 14, weight: .heavy)
        label.textColor = .white
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = "See all songs"
        return label
    }()
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        
        iv.contentMode = .scaleAspectFit
        iv.image = UIImage(named: "allSongs_icon")
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        return iv
    }()
    
    func setupViews() {
        
        addSubview(messageLabel)
        addSubview(imageView)
        
        NSLayoutConstraint.activate([
            messageLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            messageLabel.heightAnchor.constraint(equalToConstant: 40),
            messageLabel.leadingAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.leadingAnchor, constant: 14),
            
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 15),
            imageView.widthAnchor.constraint(equalToConstant: 15),
            imageView.rightAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.rightAnchor, constant: -24)
            ])
        
    }
}

class CategoryCell: UICollectionViewCell, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    private let albumCellId = "albumCellId"
    private let songCellId = "songCellId"
    private let seeAllSongsCellId = "seeAllSongsCellId"
    private let artistCellId = "artistCellId"
    
    var     musicCategory: MusicCategory! {
        didSet {
            guard musicCategory.tracks?.count != 0 else {
                
                musicCollectionView.reloadData()
                return
            }
            if musicCategory.name == "Songs" {
                let layout = UICollectionViewFlowLayout()
                layout.scrollDirection = .vertical
                musicCollectionView.collectionViewLayout.invalidateLayout()
                musicCollectionView.collectionViewLayout = layout
                
                addSubview(dividerLineView)
                
                NSLayoutConstraint.activate([
                    dividerLineView.topAnchor.constraint(equalTo: bottomAnchor),
                    dividerLineView.trailingAnchor.constraint(equalTo: trailingAnchor),
                    dividerLineView.heightAnchor.constraint(equalToConstant: 1),
                    dividerLineView.leadingAnchor.constraint(equalTo: safeAreaLayoutGuide.leadingAnchor, constant: 15)
                    ])
            }
            else {
                let layout = UICollectionViewFlowLayout()
                layout.scrollDirection = .horizontal
                musicCollectionView.collectionViewLayout.invalidateLayout()
                musicCollectionView.collectionViewLayout = layout
                addSubview(dividerLineView)
                
                NSLayoutConstraint.activate([
                    dividerLineView.topAnchor.constraint(equalTo: bottomAnchor),
                    dividerLineView.trailingAnchor.constraint(equalTo: trailingAnchor),
                    dividerLineView.heightAnchor.constraint(equalToConstant: 1),
                    dividerLineView.leadingAnchor.constraint(equalTo: safeAreaLayoutGuide.leadingAnchor, constant: 15)
                ])
            }
            musicCollectionView.reloadData()
        }
    }
    
    let albumLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.systemFont(ofSize: 16, weight: .heavy)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let dividerLineView: UIView = {
        let view = UIView()
        
        view.backgroundColor = UIColor(white: 0.4, alpha: 0.4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    let  musicCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        let collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        return collectionView
    }()
    
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupViews()
        musicCollectionView.register(AlbumCell.self, forCellWithReuseIdentifier: albumCellId)
        musicCollectionView.register(SongCell.self, forCellWithReuseIdentifier: songCellId)
        musicCollectionView.register(SeeAllSongsCell.self, forCellWithReuseIdentifier: seeAllSongsCellId)
        musicCollectionView.register(ArtistCell.self, forCellWithReuseIdentifier: artistCellId)
    }

    func setupViews() {
        musicCollectionView.dataSource = self
        musicCollectionView.delegate = self
        musicCollectionView.backgroundColor = UIColor(white: 0.2, alpha: 1)
        
        addSubview(musicCollectionView)
        addSubview(albumLabel)
        
        NSLayoutConstraint.activate([
            albumLabel.topAnchor.constraint(equalTo: topAnchor),
            albumLabel.trailingAnchor.constraint(lessThanOrEqualTo: trailingAnchor),
            albumLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
            albumLabel.leadingAnchor.constraint(equalTo: safeAreaLayoutGuide.leadingAnchor, constant: 14),
            albumLabel.heightAnchor.constraint(equalToConstant: 30),
            
            musicCollectionView.topAnchor.constraint(equalTo: albumLabel.bottomAnchor),
            musicCollectionView.trailingAnchor.constraint(equalTo: trailingAnchor),
            musicCollectionView.leadingAnchor.constraint(equalTo: safeAreaLayoutGuide.leadingAnchor),
            musicCollectionView.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        albumLabel.text = musicCategory.name!
        switch musicCategory.name {
        case "Albums":
            return musicCategory.albums!.count
        case "Songs":
            if musicCategory.tracks!.count == 0 {
                return 0
            }
            return musicCategory.tracks!.count <= 4 ? musicCategory.tracks!.count + 1 : 5
        case "Artists":
            return musicCategory.artists!.count
        
        default:
            return 0
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        switch musicCategory.name {
        case "Albums":
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: albumCellId, for: indexPath) as! AlbumCell
            cell.album = musicCategory.albums![indexPath.item]
            return cell
        case "Songs":
            let max = musicCategory.tracks?.count
            
            if max! < 4 && indexPath.item == max || indexPath.item == 4 {
                let cell = collectionView.dequeueReusableCell(withReuseIdentifier: seeAllSongsCellId, for: indexPath) as! SeeAllSongsCell
                return cell
            } else {
                let cell = collectionView.dequeueReusableCell(withReuseIdentifier: songCellId, for: indexPath) as! SongCell
                cell.track = musicCategory.tracks![indexPath.item]
                return cell
            }
        case "Artists":
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: artistCellId, for: indexPath) as! ArtistCell
            cell.artist = musicCategory.artists![indexPath.item]
            return cell
        default:
            let cell = UICollectionViewCell()
            return cell
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        switch musicCategory.name {
        case "Albums":
            return CGSize(width: 150, height: frame.height)
        case "Songs":
            if indexPath.item < 4 {
                return CGSize(width: frame.width, height: 60)
            } else {
                return CGSize(width: frame.width, height: 40)
            }
        case "Artists":
            return CGSize(width: 100, height: frame.height)
        default:
            return CGSize(width: 150, height: frame.height)
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets(top: 0, left: 14, bottom: 0, right: 14)
    }
    
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
