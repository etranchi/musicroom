//
//  SocketIOManager.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/29/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import SocketIO

class                   SocketIOManager: NSObject
{
    static let          sharedInstance = SocketIOManager()
    static let          manager = SocketManager(socketURL: URL(string: "https://www.come-over.com:4242")!, config: [.log(false), .compress, .sessionDelegate(apiManager)])
    var                 socket = manager.socket(forNamespace: "/")
    
    override init() {
        super.init()
    }
    
    var                 connectionStatus: SocketIOStatus {
        return socket.status
    }
    
    func                socketConnect() {
        
        socket.connect()
    }
    
    func                socketDisconnect() {
        socket.disconnect()
    }
    
    func                listenToPlaylistChanges(_ playlistId: String, completionHandler: @escaping (_ trackedUsersListUpdate: Int?, _ playlist: Playlist?) -> Void) {
        socket.on("blockPlaylist") { ( dataArray, ack) -> Void in
            completionHandler(0, nil)
        }
        socket.on("playlistUpdated") { ( dataArray, ack) -> Void in
            guard dataArray.count > 0 else {
                print("coco")
                completionHandler(1, nil)
                return
            }
            let data = dataArray[0]
            let jsonData = try! JSONSerialization.data(withJSONObject:data)
            let playlist = try! JSONDecoder().decode(Playlist.self, from: jsonData)
            completionHandler(1, playlist)
        }
    }
    
    func                lockPlaylist(_ playlistId: String) {
        socket.emit("blockPlaylist", playlistId)
    }
    
    func                unlockPlaylist(_ playlistId: String, playlist: Playlist) {
        apiManager.updatePlaylist(playlist)
    }
    
    func                joinPlayList(_ playlistId: String) {
        socket.emit("joinPlaylist", playlistId)
    }
    
    func                leavePlaylist(_ playlistId: String) {
        socket.emit("leavePlaylist", playlistId)
    }
    
    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        completionHandler(.useCredential, URLCredential(trust: challenge.protectionSpace.serverTrust!))
    }
}
