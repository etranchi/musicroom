//
//  CategoryCell.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class CategoryCell: UICollectionViewCell, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    private let albumCellId = "albumCellId"
    private let songCellId = "songCellId"
    private let seeAllSongsCellId = "seeAllSongsCellId"
    private let artistCellId = "artistCellId"
    var searchController: SearchController?
    
    var     musicCategory: MusicCategory! {
        didSet {
            guard musicCategory.tracks?.count != 0 else {
                musicCollectionView.reloadData()
                return
            }
            switch musicCategory.name {
            case "Songs":
                let layout = UICollectionViewFlowLayout()
                layout.scrollDirection = .vertical
                musicCollectionView.collectionViewLayout.invalidateLayout()
                musicCollectionView.collectionViewLayout = layout
            case "Albums":
                let layout = UICollectionViewFlowLayout()
                layout.scrollDirection = .horizontal
                musicCollectionView.collectionViewLayout.invalidateLayout()
                guard let alb = musicCategory.albums else { return }
                guard alb.count != 0 else { return }
                musicCollectionView.collectionViewLayout = layout
            case "Atrists":
                let layout = UICollectionViewFlowLayout()
                layout.scrollDirection = .horizontal
                musicCollectionView.collectionViewLayout.invalidateLayout()
                musicCollectionView.collectionViewLayout = layout
            default:
                musicCollectionView.reloadData()
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
        musicCollectionView.backgroundColor = UIColor(white: 0.15, alpha: 1)
        
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
            guard let tracks = musicCategory.tracks else {
                let cell = UICollectionViewCell()
                return cell }
            let max = tracks.count
            if max < 4 && indexPath.item == max || indexPath.item == 4 {
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
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        switch musicCategory.name {
        case "Albums":
            print("album selected")
        case "Songs":
            guard let song = musicCategory.tracks?[indexPath.item] else { return }
            searchController?.showPlayerForSong(song, 0)
        default:
            return
        }
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
