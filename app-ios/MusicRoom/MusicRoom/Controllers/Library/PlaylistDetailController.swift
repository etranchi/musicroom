//
//  PlaylistDetailController.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/21/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlaylistDetailController: UITableViewController {

    let playlist: Playlist
    var tracks: [Track]
    let playlistCover: UIImage
    
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
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        let navi = navigationController as? CustomNavigationController
        navi?.animatedShowNavigationBar()
        navigationController?.navigationBar.topItem?.title = "Search"
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
