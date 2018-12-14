//
//  SocketIOManager.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 11/29/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import SocketIO

var userID: String = "HAHAHA"
var eventID: String = "blavla"

class                   SocketIOManager: NSObject
{
    static let          sharedInstance = SocketIOManager()
    static let          manager = SocketManager(socketURL: URL(string: "https://www.come-over.com:4242")!, config: [.log(false),
                                                                                                                    .compress,
                                                                                                                    .sessionDelegate(apiManager),
                                                                                                                    .reconnectWait(5),
                                                                                                                    .reconnects(true),
                                                                                                                    .forceWebsockets(true),
                                                                                                                    .forceNew(true),
                                                                                                                    .selfSigned(true),
                                                                                                                    .secure(true)])
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
    
    func                listenToTracksChanges(completionHandler: @escaping (_ tracks: [Track]?) -> Void) {
        socket.on("updateScore") { ( dataArray, ack) -> Void in
            guard dataArray.count > 0 else {
                completionHandler(nil)
                return
            }
            let data = dataArray[0]
            let jsonData = try? JSONSerialization.data(withJSONObject:data)
            guard let json = jsonData else { return }
            let tracks = try? JSONDecoder().decode([Track].self, from: json)
            completionHandler(tracks)
        }
    }
    
    func                listenToPlaylistChanges(_ playlistId: String, completionHandler: @escaping (_ trackedUsersListUpdate: Int?, _ playlist: Playlist?) -> Void) {
        socket.on("blockPlaylist") { ( dataArray, ack) -> Void in
            completionHandler(0, nil)
        }
        socket.on("playlistUpdated") { ( dataArray, ack) -> Void in
            guard dataArray.count > 0 else {
                completionHandler(1, nil)
                return
            }
            let data = dataArray[0]
            let jsonData = try? JSONSerialization.data(withJSONObject:data)
            guard let json = jsonData else { return }
            let playlist = try? JSONDecoder().decode(Playlist.self, from: json)
            completionHandler(1, playlist)
        }
    }
    
    func                createEventRoom(roomID: String, userID: String) {
        let toSend = CreateEventRoom(roomID: roomID, userID: userID)
        let json = try? JSONEncoder().encode(toSend)
        guard json != nil else { return }
        socket.emit("createRoom", json!)
    }
    
    func                updateTrackScore(roomID: String, trackID: String, points: Int, userID: String, userCoord: Coord) {
        let toSend = UpdateEventTrackScore(roomID: eventID, trackID: trackID, points: points, userID: userID, userCoord: userCoord)
        print(toSend)
        let json = try? JSONEncoder().encode(toSend)
        guard json != nil else { return } 
        socket.emit("updateScore", json!)
    }
    
    func                lockPlaylist(_ playlistId: String) {
        socket.emit("blockPlaylist", playlistId)
    }
    
    func                unlockPlaylist(_ playlistId: String, playlist: Playlist) {
        apiManager.updatePlaylist(playlist) { (ll) in }
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
