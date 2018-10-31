//
//  CategoryCell.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class AlbumCell: UICollectionViewCell {
    
    var track: Track! {
        didSet {
            authorLabel.text = track.artist.name
            titleLabel.text = track.title
            imageView.loadImageUsingCacheWithUrlString(urlString: track.album.cover)
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
        
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 12, weight: .light)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 12, weight: .medium)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let authorLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 12, weight: .heavy)
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
            imageView.topAnchor.constraint(equalTo: topAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 160),
            imageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            
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
                timeLabel.text = String(track.duration / 60) + ":0" + String(track.duration % 60)
            } else {
                timeLabel.text = String(track.duration / 60) + ":0" + String(track.duration % 60)
            }
            imageView.loadImageUsingCacheWithUrlString(urlString: track.album.cover)
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
        
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 10, weight: .light)
        label.textColor = .lightGray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 12, weight: .medium)
        label.textColor = .white
        label.numberOfLines = 2
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    let authorLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 12, weight: .heavy)
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
            imageView.heightAnchor.constraint(equalToConstant: 60),
            imageView.widthAnchor.constraint(equalToConstant: 60),
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            
            titleLabel.topAnchor.constraint(equalTo: imageView.topAnchor),
            titleLabel.heightAnchor.constraint(equalToConstant: 30),
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

class SearchCell: UICollectionViewCell, UITextFieldDelegate {
    override init(frame: CGRect) {
        super.init(frame: .zero)
        
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let textField: UITextField = {
        let tf = UITextField()
        
        tf.placeholder = "artists, songs, or albums"
        tf.translatesAutoresizingMaskIntoConstraints = false
        tf.font = UIFont.monospacedDigitSystemFont(ofSize: 14, weight: .medium)
        return tf
    }()
    
    let containerView: UIView = {
        let view = UIView()
        
        view.translatesAutoresizingMaskIntoConstraints = false
        view.backgroundColor = UIColor(white: 0.95, alpha: 0.8)
        view.layer.masksToBounds = true
        view.layer.cornerRadius = 15
        view.layer.borderColor = UIColor(white: 0.1, alpha: 0.8).cgColor
        view.layer.borderWidth = 2
        return view
    }()
    
    @objc func      handleSearch()
    {
        let tabBarController = UIApplication.shared.keyWindow?.rootViewController as! TabBarController
        let navi = tabBarController.selectedViewController as! CustomNavigationController
        let searchController = navi.viewControllers[0] as! SearchController
        
        guard let text = textField.text, text != "" else { return }
        searchController.handleStearch(text)
    }
    
    func setupViews() {
        textField.delegate = self
        let searchButton = UIButton(type: .system)
        let searchIcon = UIImage(named: "search_icon")
        let tintedIcon = searchIcon?.withRenderingMode(.alwaysTemplate)
        searchButton.setImage(tintedIcon, for: .normal)
        searchButton.tintColor = UIColor(white: 0.2, alpha: 1)
        searchButton.translatesAutoresizingMaskIntoConstraints = false
        searchButton.addTarget(self, action: #selector(handleSearch), for: .touchUpInside)
        
        addSubview(containerView)
        containerView.addSubview(textField)
        containerView.addSubview(searchButton)
        
        
        NSLayoutConstraint.activate([
            containerView.centerYAnchor.constraint(equalTo: centerYAnchor, constant: 5),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -14),
            containerView.heightAnchor.constraint(equalToConstant: 30),
            
            textField.leftAnchor.constraint(equalTo: containerView.leftAnchor, constant: 15),
            textField.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
            textField.rightAnchor.constraint(equalTo: searchButton.leftAnchor),
            textField.heightAnchor.constraint(equalTo: containerView.heightAnchor),
            
            searchButton.rightAnchor.constraint(equalTo: containerView.rightAnchor, constant: -5),
            searchButton.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
            searchButton.widthAnchor.constraint(equalToConstant: 22),
            searchButton.heightAnchor.constraint(equalToConstant: 22)
        ])
    }
}

class CategoryCell: UICollectionViewCell, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    private let cellId0 = "cellId0"
    private let cellId1 = "cellId1"
    private let cellId2 = "cellId2"
    
    var     musicCategory: MusicCategory! {
        didSet {
            if musicCategory.name == "Songs" ||  musicCategory.name == "Search" {
                let layout = UICollectionViewFlowLayout()
                layout.scrollDirection = .vertical
                musicCollectionView.collectionViewLayout = layout
            }
        }
    }
    
    let albumLabel: UILabel = {
        let label = UILabel()
        
        label.font = UIFont.monospacedDigitSystemFont(ofSize: 16, weight: .medium)
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
        musicCollectionView.register(AlbumCell.self, forCellWithReuseIdentifier: cellId0)
        musicCollectionView.register(SongCell.self, forCellWithReuseIdentifier: cellId1)
        musicCollectionView.register(SearchCell.self, forCellWithReuseIdentifier: cellId2)
    }

    func setupViews() {
        musicCollectionView.dataSource = self
        musicCollectionView.delegate = self
        musicCollectionView.backgroundColor = UIColor(white: 0.2, alpha: 1)
        
        addSubview(musicCollectionView)
        addSubview(dividerLineView)
        addSubview(albumLabel)
        
        NSLayoutConstraint.activate([
            albumLabel.topAnchor.constraint(equalTo: topAnchor),
            albumLabel.trailingAnchor.constraint(lessThanOrEqualTo: trailingAnchor),
            albumLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            albumLabel.heightAnchor.constraint(equalToConstant: 30),
            
            musicCollectionView.topAnchor.constraint(equalTo: albumLabel.bottomAnchor),
            musicCollectionView.trailingAnchor.constraint(equalTo: trailingAnchor),
            musicCollectionView.leadingAnchor.constraint(equalTo: leadingAnchor),
            musicCollectionView.bottomAnchor.constraint(equalTo: bottomAnchor),
            
            dividerLineView.topAnchor.constraint(equalTo: musicCollectionView.bottomAnchor),
            dividerLineView.trailingAnchor.constraint(equalTo: trailingAnchor),
            dividerLineView.heightAnchor.constraint(equalToConstant: 1),
            dividerLineView.leadingAnchor.constraint(equalTo: musicCollectionView.leadingAnchor, constant: 15)
        ])
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        albumLabel.text = musicCategory.name!
        if musicCategory.name == "Search" {
            return 1
        }
        return musicCategory.tracks!.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if musicCategory.name == "Search" {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId2, for: indexPath) as! SearchCell
            return cell
        } else if musicCategory.name == "Songs" {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId1, for: indexPath) as! SongCell
            cell.track = musicCategory.tracks![indexPath.item]
            return cell
        } else {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellId0, for: indexPath) as! AlbumCell
            cell.track = musicCategory.tracks![indexPath.item]
            return cell
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if musicCategory.name == "Songs" {
            return CGSize(width: frame.width, height: 60)
        } else if musicCategory.name == "Search" {
            return CGSize(width: frame.width, height: 30)
        }
        return CGSize(width: 150, height: frame.height)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsetsMake(0, 14, 0, 14)
    }
    
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
