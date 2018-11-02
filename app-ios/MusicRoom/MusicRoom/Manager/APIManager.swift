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
    
    var url : String {
        return  "https://\(self.ip):4242/"
    }

    func search(_ search: String, completion: @escaping ([Track], [Album]) -> ()){
        let w = search.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
        
        let tracksUrl = self.url + "search/track?q=\(w)"
        var tracksRequest = URLRequest(url: URL(string: tracksUrl)!)
        tracksRequest.httpMethod = "GET"
        
        let albumsUrl = self.url + "search/album?q=\(w)"
        var albumsRequest = URLRequest(url: URL(string: albumsUrl)!)
        albumsRequest.httpMethod = "GET"
        
        searchTracks(request: tracksRequest) { (tracks) in
            self.searchAlbums(request: albumsRequest, completion: { (albums) in
                completion(tracks, albums)
            })
        }
    }

    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        completionHandler(.useCredential, URLCredential(trust: challenge.protectionSpace.serverTrust!))
    }
    
    func searchAlbums(request: URLRequest, completion: @escaping ([Album]) -> ())
    {
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: request) { (data, response, err) in
            if err != nil {
                print("error while requesting")
            }
            if let d = data {
                do {
                    print(d)
                    let dic = try JSONDecoder().decode(AlbumData.self, from: d)
                    DispatchQueue.main.async {
                        completion(dic.data)
                    }
                } catch let err {
                    print("task dictionnary error: \(err)")
                }
            }
            }.resume()
    }
    
    func searchTracks(request: URLRequest, completion: @escaping ([Track]) -> ())
    {
        URLSession(configuration: .default, delegate: self, delegateQueue: .main).dataTask(with: request) { (data, response, err) in
            if err != nil {
                print("error while requesting")
            }
            if let d = data {
                do {
                    print(d)
                    let dic = try JSONDecoder().decode(TrackData.self, from: d)
                    DispatchQueue.main.async {
                        completion(dic.data)
                    }
                } catch let err {
                    print("task dictionnary error: \(err)")
                }
            }
        }.resume()
    }
}
