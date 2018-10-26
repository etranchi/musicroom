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
            } else if let d = data {
                do {
                    if let dic : T = try JSONDecoder().decode(T.self, from: d){
                        dictionnary = dic
                    }
//                    else if let dic : T = try JSONDecoder().decode(T.self, from: d) {
//                        dictionnary.append(dic)
//                    }
                    else {
                        print("Error when fetching")
                    }
                    /*if let dic : [T] = try JSONSerialization.jsonObject(with: d, options: JSONSerialization.ReadingOptions.mutableContainers) as? [NSDictionary] {
                        dictionnary = dic
                    } else if let dic : T = try JSONSerialization.jsonObject(with: d, options: JSONSerialization.ReadingOptions.mutableContainers) as? NSDictionary {
                        dictionnary.append(dic)
                    } else {
                        print("task dictionnary error: failed")
                    }*/
                } catch (let err) {
                    print("task dictionnary error: \(err)")
                }
            } else {
                print("nodata")
            }
            requestTokenDone = true;
        }
        task.resume()
        
        //wait for task to terminate, making async useless
        repeat {
            RunLoop.current.run(until: Date(timeIntervalSinceNow: 0.1))
        } while !requestTokenDone
        return dictionnary!
    }
}
