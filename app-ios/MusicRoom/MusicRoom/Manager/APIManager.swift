//
//  APIManager.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/25/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class APIManager: NSObject, URLSessionDelegate {
    let ip : String = "192.168.99.100"
    let token : String? = nil
    // Route google url +  user/login/google?access_token=\(token)
    var url : String {
        return  "https://\(self.ip):4242/"
    }
    
    func getAlbumTracks(_ album: Album, completion: @escaping (Album) -> ()) {
        let tracksUrl = self.url + "album/\(album.id)"
        var request = URLRequest(url: URL(string: tracksUrl)!)
        request.httpMethod = "GET"
        
        searchAll(Album.self, request: request) { (tracksData) in
            var album = album
            album = tracksData
            completion(album)
        }
    }
    
    func searchAlbums(_ search: String, completion: @escaping ([Album]) -> ()) {
        let w = search.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
        
        let albumsUrl = self.url + "search/album?q=\(w)"
        var albumsRequest = URLRequest(url: URL(string: albumsUrl)!)
        albumsRequest.httpMethod = "GET"
        self.searchAll(AlbumData.self, request: albumsRequest, completion: { (albumData) in
            completion(albumData.data)
        })
    }
    
    func searchTracks(_ search: String, completion: @escaping ([Track]) -> ()) {
        let w = search.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
        
        let tracksUrl = self.url + "search/track?q=\(w)"
        var tracksRequest = URLRequest(url: URL(string: tracksUrl)!)
        tracksRequest.httpMethod = "GET"
        self.searchAll(TrackData.self, request: tracksRequest, completion: { (trackData) in
            completion(trackData.data)
        })
    }

    
    func login(_ forg: String, _ token : String, completion: @escaping ( (DataUser) -> ())) {
        let loginUrl = self.url + "user/login/" + forg + "?access_token=" + token
        var loginRequest = URLRequest(url : URL(string : loginUrl)!)
        loginRequest.httpMethod = "GET"
        searchAll(DataUser.self, request: loginRequest, completion: { (res) in
            completion(res)
        })
    }
    
    func searchArtists(_ search: String, completion: @escaping ([Artist]) -> ()) {
        let w = search.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
        
        let artistsUrl = self.url + "search/artist?q=\(w)"
        var artistsRequest = URLRequest(url: URL(string: artistsUrl)!)
        artistsRequest.httpMethod = "GET"
        self.searchAll(ArtistData.self, request: artistsRequest, completion: { (artistData) in
            completion(artistData.data)
        })
    }

    func searchATA(_ search: String, completion: @escaping ([Track], [Album], [Artist]) -> ()){
        searchAlbums(search) { (albums) in
            self.searchTracks(search, completion: { (tracks) in
                self.searchArtists(search, completion: { (artists) in
                    completion(tracks, albums, artists)
                })
            })
        }
    }

    func searchPlaylist(_ search: String, completion: @escaping ([Playlist]) -> ()){
        let w = search.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
        
        let playlistsUrl = self.url + "search/playlist?q=\(w)"
        var playlistsRequest = URLRequest(url: URL(string: playlistsUrl)!)
        playlistsRequest.httpMethod = "GET"
        self.searchAll(PlaylistData.self, request: playlistsRequest, completion: { (playlistData) in
            completion(playlistData.data)
        })
    }
    
    func registerUser(_ user : Data?) {
        let registerUrl = self.url + "user/"
        var registerRequest = URLRequest(url: URL(string: registerUrl)!)
        registerRequest.httpMethod = "POST"
        registerRequest.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        registerRequest.httpBody = user
        
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: registerRequest) { (data, response, err) in
            if err != nil {
                print("error while requesting")
            }
            do {
                let responseJSON = try JSONSerialization.jsonObject(with: data!, options: [])
                if let responseJSON = responseJSON as? [String: Any] {
                    print(responseJSON)
                }
            }
            catch (let err){
                print(err.localizedDescription)
            }
        }.resume()
    }
    
    func loginUser(_ json : Data?, completion : @escaping (DataUser?) -> ()) {
        let loginUrl = self.url + "user/login"
        var loginRequest = URLRequest(url: URL(string: loginUrl)!)
        loginRequest.httpMethod = "POST"
        loginRequest.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        loginRequest.httpBody = json
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: loginRequest) { (data, response, err) in
            if err != nil {
                completion(nil)
            }
            if let d = data {
                do {
                    let dic = try JSONDecoder().decode(DataUser.self, from: d)
                    completion(dic)
                }
                catch (let err){
                    print(err.localizedDescription)
                }
            }
            }.resume()
    }
    
    func postEvent(_ token : String, event : Event, completion: @escaping (Event) -> ()) {
        let postEventUrl = self.url + "event"
        print("1")
        var request = URLRequest(url: URL(string: postEventUrl)!)
        print("1.1")
        var jsonData = Event.archive(w: event)
        print("3")
        request.httpMethod = "POST"
        request.httpBody = jsonData
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        print("j'ai tous set")
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: request) { (data, response, err) in
            if err != nil {
                print("error while requesting")
            }
            do {
                print(data, response, err)
                let responseJSON = try JSONSerialization.jsonObject(with: data!, options: [])
                
                if let responseJSON = responseJSON as? [String: Any] {
                    print(responseJSON)
                }
            }
            catch (let err){
                print(err.localizedDescription)
            }
            }.resume()
        
    }
    
    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        completionHandler(.useCredential, URLCredential(trust: challenge.protectionSpace.serverTrust!))
    }
    
    func searchAll<T: Decodable>(_ myType: T.Type, request: URLRequest, completion: @escaping (T) -> ())
    {
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: request) { (data, response, err) in
            if err != nil {
                print("error while requesting")
            }
            if let d = data {
                do {
                    print("J'ai tous")
                    let dic = try JSONDecoder().decode(myType.self, from: d)
                    DispatchQueue.main.async {
                        completion(dic)
                    }
                } catch let err {
                    print("task dictionnary error: \(err)")
                }
            }
        }.resume()
    }
}
