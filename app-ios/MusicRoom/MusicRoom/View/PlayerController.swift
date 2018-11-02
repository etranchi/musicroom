//
//  PlayerController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlayerController: UIViewController, DZRPlayerDelegate {
    var networkType : DZRPlayerNetworkType?
    var request : DZRRequestManager?
    var cancelable : DZRCancelable?
    var deezer = DeezerManager()
    var track : DZRTrack?
    var pause : Bool =  false
    @IBOutlet weak var playPauseButton: UIButton!
    @IBOutlet weak var imageLayout: UIImageView!
    var input : Track?
    var previewTime = 30 // User connected or not
    @IBOutlet weak var allTime: UILabel!
    @IBOutlet weak var currentTime: UILabel!
    @IBOutlet weak var progress: UIProgressView!
    private lazy var player: DZRPlayer? = {
        guard let deezerConnect = DeezerManager.sharedInstance.deezerConnect,
            var _player = DZRPlayer(connection: deezerConnect) else {
                return nil
        }
        _player.shouldUpdateNowPlayingInfo = true
        _player.delegate = self
        return _player
    }()
    
    
    func getImage(_ track : Track) {
        do {
            let url = URL(string: track.album!.cover)
            let image = try Data(contentsOf: url!, options: Data.ReadingOptions.mappedIfSafe)
            if (imageLayout != nil) {
                imageLayout.image = UIImage(data: image)
            }
        } catch {
            print("Error when loading image")
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        currentTime.text = "0:00"
        allTime.text = "0:30"
        player?.networkType = .wifiAnd3G
        player?.shouldUpdateNowPlayingInfo = true
        request = DZRRequestManager.default().sub()
        progress.progress = 0
        if (input != nil) {
            getImage(input!)
        }
        
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func playButton(_ sender: Any) {
        if (player?.isPlaying())! {
            self.player?.pause()
            pause = true
        }
        else if pause == true {
            pause = false
            self.player?.play()
            
        }
        else {
            self.cancelable?.cancel()
            self.player?.stop()
            self.cancelable = DZRTrack.object(withIdentifier: String(input!.id), requestManager: request) { (response, err) in
                if err != nil {
                    print("Error")
                } else {
                    if let res = response as? DZRTrack {
                        self.player?.play(res)
                    } else {
                        print("Error DZRplayable")
                    }
                }
            }
        }
    }
    
    func player(_ player: DZRPlayer!, didEncounterError error: Error!) {
        print("error")
    }
    
    func player(_ player: DZRPlayer!, didStartPlaying track: DZRTrack!) {
        print("start")
    }
    
    func player(_ player: DZRPlayer!, didPlay playedBytes: Int64, outOf totalBytes: Int64) {
        let progress = Float(playedBytes) /  Float(totalBytes)
        self.progress.progress = progress
        let current = Float(previewTime) * progress
        currentTime.text = "0:" + String(Int(current))
        print("play")
        playPauseButton.imageView?.image = UIImage(named: "pause")
    }
    
    func player(_ player: DZRPlayer!, didBuffer bufferedBytes: Int64, outOf totalBytes: Int64) {
        print("buffer")
    }
    
    func playerDidPause(_ player: DZRPlayer!) {
        playPauseButton.imageView?.image = UIImage(named: "play")
        print("pause")
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
