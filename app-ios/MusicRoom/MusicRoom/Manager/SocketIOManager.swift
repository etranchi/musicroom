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
    static let          manager = SocketManager(socketURL: URL(string: "http://www.come-over.com:3000")!, config: [.log(false), .compress])
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
    
    func                lockPlaylist(_ playlistId: String) {
        socket.emit("blockPlaylist", playlistId)
    }
    
    func                unlockPlaylist(_ playlistId: String, playlist: Playlist) {
        
    }
    
    func                joinPlayList(_ playlistId: String) {
        socket.emit("joinPlaylist", playlistId)
    }
    
    func                leavePlaylist(_ playlistId: String) {
        socket.emit("leavePlaylist", playlistId)
    }
    
    
}
