//
//  APIManager.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 10/25/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
import Alamofire

class APIManager: NSObject, URLSessionDelegate {
    let ip: String = "192.168.99.100"
    let token: String? = nil
    let delegate: Alamofire.SessionDelegate = Manager.delegate
    var url: String {
        return  "https://\(self.ip):4242/"
    }
    private static var Manager: Alamofire.SessionManager = {
        let serverTrustPolicies: [String: ServerTrustPolicy] = [
            "https://192.168.99.100:4242/event": .disableEvaluation,
            "https://192.168.99.100:4242/": .disableEvaluation,
        ]
        let configuration = URLSessionConfiguration.default
        configuration.httpAdditionalHeaders = Alamofire.SessionManager.defaultHTTPHeaders
        let manager = Alamofire.SessionManager(
            configuration: URLSessionConfiguration.default,
            serverTrustPolicyManager: ServerTrustPolicyManager(policies: serverTrustPolicies)
        )
        return manager
    }()
    let jsonEncoder: JSONEncoder = JSONEncoder()
    
    override init() {
        delegate.sessionDidReceiveChallenge = { session, challenge in
            var disposition: URLSession.AuthChallengeDisposition = .performDefaultHandling
            var credential: URLCredential?
            if challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust {
                disposition = URLSession.AuthChallengeDisposition.useCredential
                credential = URLCredential(trust: challenge.protectionSpace.serverTrust!)
            } else {
                if challenge.previousFailureCount > 0 {
                    disposition = .cancelAuthenticationChallenge
                } else {
                    credential = APIManager.Manager.session.configuration.urlCredentialStorage?.defaultCredential(for: challenge.protectionSpace)
                    if credential != nil {
                        disposition = .useCredential
                    }
                }
            }
            return (disposition, credential)
        }
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

    
    func giveDeezerToken(_ user : MyUser) {
        let url = self.url + "user/login/deezer?deezerToken=\(user.deezer_token!)"
        var req = URLRequest(url : URL(string : url)!)
        req.httpMethod = "PUT"
        req.setValue("Bearer " + user.token!, forHTTPHeaderField: "Authorization")
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: req) { (data, response, err) in
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
    
    func getUserPlaylists(completion: @escaping ([Playlist]) -> ()) {
        let playlistsUrl = self.url + "playlist"
        var playlistsRequest = URLRequest(url: URL(string: playlistsUrl)!)
        playlistsRequest.httpMethod = "GET"
        print(userManager.currentUser?.token!)
        playlistsRequest.addValue("Bearer \(userManager.currentUser?.token!)", forHTTPHeaderField: "Authorization")
        self.searchAll([Playlist].self, request: playlistsRequest, completion: { (playlists) in
            completion(playlists)
        })
    }
    
    func getDeezerPlaylistById(_ id : Int, completion : @escaping((Playlist) -> ())) {
        let getPlaylistUrl = self.url + "playlist/\(id)"
        var playlistDeezerRequest = URLRequest(url : URL(string: getPlaylistUrl)!)
        playlistDeezerRequest.httpMethod = "GET"
        playlistDeezerRequest.addValue("Bearer \(userManager.currentUser!.token!)", forHTTPHeaderField: "Authorization")
        self.searchAll(Playlist.self, request: playlistDeezerRequest, completion: { (playlists) in
            completion(playlists)
        })
    }
    
    func createPlaylist(_ title: String, _ target: PlaylistController?) {
        let postString = "title=\(title)"
        let playlistsUrl = self.url + "playlist"
        var createPlaylistRequest = URLRequest(url: URL(string: playlistsUrl)!)
        createPlaylistRequest.httpMethod = "POST"
        createPlaylistRequest.addValue("Bearer \(userManager.currentUser!.token!)", forHTTPHeaderField: "Authorization")
        createPlaylistRequest.httpBody = postString.data(using: .utf8)
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: createPlaylistRequest) { (data, response, error) in

            target?.reloadPlaylists()
        }.resume()
    }
    
    func deletePlaylist(_ id: String, _ target: PlaylistController?) {
        let playlistsUrl = self.url + "playlist/\(id)"
        var createPlaylistRequest = URLRequest(url: URL(string: playlistsUrl)!)
        createPlaylistRequest.httpMethod = "DELETE"
        createPlaylistRequest.addValue("Bearer \(userManager.currentUser!.token!)", forHTTPHeaderField: "Authorization")
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: createPlaylistRequest) { (data, response, error) in
            target?.reloadPlaylists()
        }.resume()
    }
    
    func addTrackToPlaylist(_ playListId: String, _ track: Track) {
        let playlistsUrl = self.url + "playlist/\(playListId)/track"
        let postString = "id=\(track.id)"
        var addSongToPlaylistRequest = URLRequest(url: URL(string: playlistsUrl)!)
        addSongToPlaylistRequest.httpMethod = "PUT"
        addSongToPlaylistRequest.addValue("Bearer \(userManager.currentUser!.token!)", forHTTPHeaderField: "Authorization")
        addSongToPlaylistRequest.httpBody = postString.data(using: .utf8)
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: addSongToPlaylistRequest).resume()
    }
    
    func deleteTrackFromPlaylist(_ playListId: String, _ track: Track, target: PlaylistDetailController?) {
        print("playlistid")
        print(playListId)
        print(track)
        let playlistsUrl = self.url + "playlist/\(playListId)/\(track.id)"
        var createPlaylistRequest = URLRequest(url: URL(string: playlistsUrl)!)
        createPlaylistRequest.httpMethod = "DELETE"
        createPlaylistRequest.addValue("Bearer \(userManager.currentUser!.token!)", forHTTPHeaderField: "Authorization")
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: createPlaylistRequest) { (data, response, error) in
            target?.tableView.reloadData()
        }.resume()
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
    
    func getMe(_ token : String, completion : @escaping ((User) -> ())) {
        let meUrl = self.url + "user/me"
        var request = URLRequest(url: URL(string: meUrl)!)
        request.httpMethod = "GET"
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        searchAll(User.self, request: request) { (me) in
            completion(me)
        }
    }
    
    
    func getEvents(completion : @escaping (([Event]) -> ())){
        let eventsUrl = self.url + "event"
        var request = URLRequest(url: URL(string: eventsUrl)!)
        request.httpMethod = "GET"
        self.searchAll([Event].self, request: request) { (res) in
            completion(res)
        }
    }
    
    func getImgEvent(_ path : String, completion : @escaping (UIImage?) -> ()) {
        let url = URL(string: self.url + "eventPicture/" + path)
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: url!) { (data, response, err) in
            if err != nil {
                print(err?.localizedDescription)
                completion(nil)
            }
            if let res = response as? URLResponse {
                if let imageData = data {
                    completion(UIImage(data: imageData))
                } else {
                    print("image is nil")
                    completion(nil)
                }
            } else {
                print("No response from http request")
                completion(nil)
            }
        }.resume()
    }
    
    func postEvent(_ token : String, event : Event, img : UIImage, onCompletion: @escaping ((Bool) -> Void)) {
        do {
            let postEventUrl = self.url + "event/"
            let dataBody = try jsonEncoder.encode(event)
            let dataImg = UIImagePNGRepresentation(img)
            let headers : HTTPHeaders = [
                "Authorization": "Bearer \(token)",
                "Content-type": "multipart/form-data"
            ]
            APIManager.Manager.upload(multipartFormData: { (multipartFormData) in
                multipartFormData.append(dataBody, withName: "body")
                if let data = dataImg {
                    multipartFormData.append(data, withName: "file", fileName: "image.png", mimeType: "image/png")
                }
            }, usingThreshold: UInt64.init(), to: postEventUrl, method: .post, headers: headers) { (result) in
                switch result{
                case .success(let upload, _, _):
                    upload.responseJSON { response in
                        if let err = response.error {
                            onCompletion(false)
                            return
                        }
                        print("response")
                        print(response)
                        onCompletion(true)
                    }
                case .failure(let error):
                    print("Error in upload: \(error.localizedDescription)")
                    onCompletion(false)
                }
            }
        } catch (let err) {
            print(err.localizedDescription)
        }
        
    }
    
    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        completionHandler(.useCredential, URLCredential(trust: challenge.protectionSpace.serverTrust!))
    }
    
    func searchAll<T: Decodable>(_ myType: T.Type, request: URLRequest, completion: @escaping (T) -> ())
    {
        let config = URLSessionConfiguration()
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

