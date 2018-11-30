//
//  PlaylistDetailController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/21/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistDetailController: UITableViewController {

    var playlist: Playlist
    var tracks: [Track]
    let playlistCover: UIImage
    var isUnlocked = true
    
    var headerView: AlbumHeaderView!
    let songCellId = "SongCellId"
    
    private let headerHeight: CGFloat = 200
    
    init(_ playlist: Playlist, _ playlistCover: UIImage, _ root : UIView) {
        self.playlist = playlist
        self.playlistCover = playlistCover
        self.tracks = playlist.tracks != nil ? playlist.tracks!.data : []
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        let navi = navigationController as? CustomNavigationController
        navi?.animatedHideNavigationBar()
        navigationController?.navigationBar.topItem?.title = ""
        SocketIOManager.sharedInstance.joinPlayList(playlist._id!)
        SocketIOManager.sharedInstance.listenToPlaylistChanges(playlist._id!) { (resp, playlist) in
            if resp == 0 {
                self.lockPlaylist()
            } else {
                self.unlockPlaylist(playlist)
            }
        }
    }
    
    private func lockPlaylist() {
        isUnlocked = false
        
        tableView.reloadData()
    }
    
    private func unlockPlaylist(_ playlist: Playlist?) {
        if let p = playlist {
            self.playlist = p
            tracks = p.tracks!.data
            guard self.tracks.count > 0, let album = self.tracks[0].album, let imageURL = album.cover_medium else { return }
            UIImageView().getImageUsingCacheWithUrlString(urlString: imageURL) { (image) in
                self.headerView.albumImageBackground.image = image
                self.headerView.albumImageView.image = image
            }
        }
        isUnlocked = true
        isEditing = false
        tableView.reloadData()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        let navi = navigationController as? CustomNavigationController
        navi?.animatedShowNavigationBar()
        navigationController?.navigationBar.topItem?.title = "Search"
        SocketIOManager.sharedInstance.leavePlaylist(playlist._id!)
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        
        updateHeaderView()
        let navi = navigationController as? CustomNavigationController
        if tableView.contentOffset.y < -90 {
            navi?.animatedHideNavigationBar()
        } else {
            navi?.animatedShowNavigationBar()
        }
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        updateHeaderView()
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.separatorStyle = .none
        
        tableView.backgroundColor = UIColor(white: 0.1, alpha: 1)
        tableView.alwaysBounceVertical = false
        setupHeader()
    }
    
    func hideDots(_ hide: Bool) {
        tableView.reloadData()
    }
    
    @objc func edit() {
        SocketIOManager.sharedInstance.lockPlaylist(playlist._id!)
        tableView.isEditing = isUnlocked
        hideDots(isUnlocked)
    }
    
    override func tableView(_ tableView: UITableView, editingStyleForRowAt indexPath: IndexPath) -> UITableViewCellEditingStyle {
        return .none
    }

    override func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
        let movedObject = self.tracks[sourceIndexPath.row]
        tracks.remove(at: sourceIndexPath.row)
        tracks.insert(movedObject, at: destinationIndexPath.row)
        tableView.isEditing = false
        tableView.reloadData()
        playlist.tracks?.data = tracks
        SocketIOManager.sharedInstance.unlockPlaylist(playlist._id!, playlist: playlist)
        tableView.reloadData()
        guard tracks.count > 0, let album = tracks[0].album, let imageURL = album.cover_medium else { return }
        UIImageView().getImageUsingCacheWithUrlString(urlString: imageURL) { (image) in
            self.headerView.albumImageBackground.image = image
            self.headerView.albumImageView.image = image
        }
        
    }
    
    func updateHeaderView() {
        var headerRect = CGRect(x: 0, y: -headerHeight, width: tableView.bounds.width, height: headerHeight)
        headerRect.origin.y = tableView.contentOffset.y
        headerRect.size.height = -tableView.contentOffset.y
        headerView.frame = headerRect
        headerView.titleBottomConstraint?.constant = -10 - headerRect.height + 288
    }
    
    fileprivate func setupHeader() {
        headerView = AlbumHeaderView(frame: .zero, albumCover: playlistCover, title: playlist.title)
        headerView.isUserInteractionEnabled = false
        tableView.register(AlbumTrackListCell.self, forCellReuseIdentifier: songCellId)
        view.addSubview(headerView)
        headerView.layer.zPosition = -1
        tableView.contentInset = UIEdgeInsets(top: headerHeight, left: 0, bottom: 45, right: 0)
        tableView.contentOffset = CGPoint(x: 0, y: -headerHeight)
        updateHeaderView()
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: songCellId, for: indexPath) as! AlbumTrackListCell
        cell.isInPlaylist = true
        cell.backgroundColor = UIColor(white: 0.1, alpha: 1)
        cell.track = tracks[indexPath.row]
        cell.authorLabel.text = tracks[indexPath.row].artist?.name
        cell.selectionStyle = .none
        cell.rootController = self
        cell.indexPath = indexPath
        cell.dotsLabel.isUserInteractionEnabled = true
        cell.dotsLabel.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(edit)))
        if isEditing {
            cell.dotsLabel.isHidden = true
        } else {
            cell.dotsLabel.isHidden = false
        }
        return cell
    }
    
    func deleteTrackFromPlaylist(track: Track, index: IndexPath) {
        if playlist._id != nil {
            apiManager.deleteTrackFromPlaylist(String(describing: playlist._id!), track, target: self)
            tracks.remove(at: index.row)
            tableView.deleteRows(at: [index], with: .fade)
        } else {
            ToastView.shared.short(self.view, txt_msg: "Can't modify deezer playlist", color: UIColor.red)
        }
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        (tabBarController as? TabBarController)?.showPlayerForSong(indexPath.row, tracks: tracks)
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tracks.count
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 44.0
    }
}
