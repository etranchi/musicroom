//
//  PlayerController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class PlayerController: UIViewController, DZRPlayerDelegate {
    var player : DZRPlayer?
    var networkType : DZRPlayerNetworkType?
    var request : DZRRequestManager?
    var cancelable : DZRCancelable?
    var deezer = DeezerManager()
    var track : DZRTrack?
    
    @IBOutlet weak var imageLayout: UIImageView!
    var input : Track?
    
    func getImage(_ track : Track) {
        do {
            let url = URL(string: track.album.cover)
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
        player = DZRPlayer.init(connection: deezer.deezerConnect)
        player?.networkType = .wifiOnly
        player?.delegate = self
        request = DZRRequestManager.default().sub()
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
        self.cancelable?.cancel()
        self.player?.stop()
        let url = "https://api.deezer.com/track/" + String(describing: input?.id)
        // self.player.
        self.cancelable = DZRTrack.object(withIdentifier: String(input!.id), requestManager: request) { (response, err) in
            if err != nil {
                print("Error")
            } else {
                print(response)
                print(self.input?.id)
                if let res = response as? DZRPlayable {
                    print(res.isKind(of: DZRPlayable.self))
                    print("before ready")
                    print(self.player?.isReady())
                } else {
                    print("Error DZRplayable")
                }
            }
        }
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
