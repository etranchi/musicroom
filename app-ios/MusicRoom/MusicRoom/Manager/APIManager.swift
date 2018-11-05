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

    func search(_ search: String, completion: @escaping ([Track], [Album], [Artist]) -> ()){
        let w = search.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
        
        let tracksUrl = self.url + "search/track?q=\(w)"
        var tracksRequest = URLRequest(url: URL(string: tracksUrl)!)
        tracksRequest.httpMethod = "GET"
        
        let albumsUrl = self.url + "search/album?q=\(w)"
        var albumsRequest = URLRequest(url: URL(string: albumsUrl)!)
        albumsRequest.httpMethod = "GET"
        
        let artistsUrl = self.url + "search/artist?q=\(w)"
        var artistsRequest = URLRequest(url: URL(string: artistsUrl)!)
        artistsRequest.httpMethod = "GET"
        print("url tracks")
        print(tracksUrl)
        print("url albums")
        print(albumsUrl)
        print("url artist")
        print(artistsUrl)
        searchAll(TrackData.self, request: tracksRequest) { (tracksData) in
            self.searchAll(AlbumData.self, request: albumsRequest, completion: { (albumData) in
                self.searchAll(ArtistData.self, request: artistsRequest, completion: { (artistsData) in
                    completion(tracksData.data, albumData.data, artistsData.data)
                })
            })
        }
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
                    print(myType.self)
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
