//
//  PlayerManager.swift
//  MusicRoom
//
//  Created by Etienne Tranchier on 03/11/2018.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlayerManager: NSObject, DZRPlayerDelegate{
    var request : DZRRequestManager?
    var tracks : [Track]? {
        didSet {
            playableTracks = getTracks(tracks!)
        }
    }
    var playable : DZRPlayable?
    var playableTracks : [DZRTrack]?
    private lazy var player: DZRPlayer? = {
        guard let deezerConnect = DeezerManager.sharedInstance.deezerConnect,
            var _player = DZRPlayer(connection: deezerConnect) else {
                return nil
        }
        _player.shouldUpdateNowPlayingInfo = true
        _player.delegate = self
        return _player
    }()
    
    func viewDidLoad() {
        player?.networkType = .wifiAnd3G
        player?.shouldUpdateNowPlayingInfo = true
        request = DZRRequestManager.default().sub()
        
        // Do any additional setup after loading the view.
    }
    
    func getTracks(_ data : [Track]) -> [DZRTrack] {
        var tracks : [DZRTrack] = []
        for t in data {
              DZRTrack.object(withIdentifier: String(t.id) , requestManager: request) { (response, err) in
                if err != nil {
                    print("Error")
                } else {
                    if let res = response as? DZRTrack {
                        tracks.append(res)
                    } else {
                        print("Error DZRplayable")
                    }
                }
            }
        }
        return tracks
    }
    
    func player(_ player: DZRPlayer!, didEncounterError error: Error!) {
        print("error")
    }
    
    func player(_ player: DZRPlayer!, didStartPlaying track: DZRTrack!) {
        print("start")
    }
    
    func player(_ player: DZRPlayer!, didPlay playedBytes: Int64, outOf totalBytes: Int64) {
        
    }
    
    func player(_ player: DZRPlayer!, didBuffer bufferedBytes: Int64, outOf totalBytes: Int64) {
        print("buffer")
    }
    
    func playerDidPause(_ player: DZRPlayer!) {
        print("pause")
    }
}
