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
    let ip : String = "192.168.99.100"
    let token : String? = nil
    let delegate: Alamofire.SessionDelegate = Manager.delegate
    var url : String {
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
        print("je ;annceeee")
        self.searchAll([Event].self, request: request) { (res) in
            completion(res)
        }
        /*URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: request) { (data, response, err) in
            if err != nil {
                print("error while requesting")
            }
            do {
                let responseJSON = try JSONSerialization.jsonObject(with: data!, options: [])
                print(responseJSON)
                if let responseJSON = responseJSON as? [String: Any] {
                    print(responseJSON)
                }
            }
            catch (let err){
                print(err.localizedDescription)
            }
            }.resume()*/
    }
    
    func postEvent(_ token : String, event : Event, img : UIImage, onCompletion: @escaping ((Bool) -> Void)) {
        do {
            let jsonEncoder = JSONEncoder()
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
            
            
            /* var body = NSMutableData()
            body.append("Content-Disposition:form-data; name=\"body\"\r\n\r\n".data(using: String.Encoding.utf8)!)
            body.append(data)
            // body.append(("body=\(string)").data(using:String.Encoding.ascii, allowLossyConversion: false)!)
            body.append("Content-Disposition:form-data; name=\"file\"\r\n\r\n".data(using: String.Encoding.utf8)!)
            body.append("Content-Type: image/png\r\n\r\n".data(using: String.Encoding.utf8)!)
            body.append(("").data(using:String.Encoding.ascii, allowLossyConversion: false)!)
            body.append("\r\n".data(using: String.Encoding.utf8)!)
            body.append("--\(boundary)--\r\n".data(using: String.Encoding.utf8)!)
            print(body)
            request.httpBody = body as Data */
            /*let boundary = NSString(format: "---------------------------14737809831466499882746641449")
            var body = Data()
            body.append(NSString(format: "\r\n--%@\r\n", boundary).data(using: String.Encoding.utf8.rawValue)!)
            body.append(NSString(format:"Content-Disposition: form-data;name=\"uploaded_file\";filename=\"image.jpg\"\\r\n").data
                (using:String.Encoding.utf8.rawValue)!) //Here replace your image name and file name
            body.append(NSString(format: "Content-Type: image/jpeg\r\n\r\n").data(using: String.Encoding.utf8.rawValue)!)
            body.append(data)
            body.append(NSString(format: "\r\n--%@\r\n", boundary).data(using: String.Encoding.utf8.rawValue)!)
            request.httpBody = body*/
            /*print("j'ai tous set")
            URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: request) { (data, response, err) in
                if err != nil {
                    print("error while requesting")
                }
                if let d = data {
                    do {
                        print(d, response, err)
                        let responseJSON = try JSONSerialization.jsonObject(with: d, options: [])
                        
                        if let responseJSON = responseJSON as? [String: Any] {
                            print(responseJSON)
                        }
                    }
                    catch (let err){
                        print(err.localizedDescription)
                    }
                }
            }.resume()*/
            
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
                    print(d)
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


extension NSMutableData {
    func appendString(_ string: String) {
        let data = string.data(using: String.Encoding.utf8, allowLossyConversion: false)
        append(data!)
    }
}

