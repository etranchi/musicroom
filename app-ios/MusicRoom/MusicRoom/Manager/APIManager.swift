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
    
    func getMusic() -> [Track] {
        let url = self.url + "track"
        var request = URLRequest(url: URL(string: url)!)
        request.httpMethod = "GET"
        // request.setValue("Bearer " + token!, forHTTPHeaderField: "Authorization")
        let ret = execute(request: request) { (tracks : [Track]) in}
        return ret
    }
    
    func getSearch(_ search: String) -> ResearchData {
        let researchFilter = ["album", "track"]
        var resSearch = ResearchData()
        
        for res in researchFilter {
            let w = search.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
            let url = self.url + "search?q=\(res):\(w)"
            var request = URLRequest(url: URL(string: url)!)
            request.httpMethod = "GET"
            switch res {
                case "album" :
                    resSearch.albums = execute(request: request){ (tracks: Research) in }
                case "track" :
                    resSearch.tracks = execute(request: request){ (tracks: Research) in }
            default :
                break
            }
        }
        return resSearch
    }
    
    func getPlaylist() -> [Playlist] {
        let url = self.url + "playlist"
        var request = URLRequest(url: URL(string: url)!)
        request.httpMethod = "GET"
        // request.setValue("Bearer " + token!, forHTTPHeaderField: "Authorization")
        let ret = execute(request: request) { (tracks : [Playlist]) in}
        return ret
    }
    

    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        completionHandler(.useCredential, URLCredential(trust: challenge.protectionSpace.serverTrust!))
    }

    func   execute<T : Decodable>(request: URLRequest, completion: @escaping (T) -> ()) -> T {
        var dictionnary : T?
        var requestTokenDone : Bool = false
        let task = URLSession(configuration: URLSessionConfiguration.default, delegate: self, delegateQueue: OperationQueue.main).dataTask(with: request) {
            (data, response, error) in
            if let err = error {
                print("task session error: \(err)")
                return
            }
            if let d = data {
                do {
                    let dic = try JSONDecoder().decode(T.self, from: d)
                    dictionnary = dic
                } catch (let err) {
                    print("task dictionnary error: \(err)")
                }
            } else {
                print("nodata")
            }
            requestTokenDone = true;
        }
        task.resume()
        repeat {
            RunLoop.current.run(until: Date(timeIntervalSinceNow: 0.1))
        } while !requestTokenDone
        return dictionnary!
    }
}
