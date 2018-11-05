//
//  Extensions.swift
//  MusicRoom
//
//  Created by Jonathan DAVIN on 10/30/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

let                 imageCache = NSCache<NSString, UIImage>()

extension           UIImageView
{
    private func            loadImageUsingCacheWithUrl(from url: URL, completion: @escaping (Data?, URLResponse?, Error?) -> ())
    {
        URLSession.shared.dataTask(with: url, completionHandler: completion).resume()
    }
    
    func            loadImageUsingCacheWithUrlString(urlString: String)
    {
        self.image = nil
        guard urlString != "" else { return }
        if let cachedImage = imageCache.object(forKey: urlString as NSString) {
            self.image = cachedImage
            return
        }
        let url = URL(string: urlString)
        guard let gurl = url else { return }
        self.loadImageUsingCacheWithUrl(from: gurl, completion: { (data, response, error) in
            if error != nil {
                print(error!.localizedDescription)
                return
            }
            guard let data = data, error == nil else { return }
            DispatchQueue.main.async() {
                if let image = UIImage(data: data) {
                    imageCache.setObject(image, forKey: String(describing: url!) as NSString)
                    self.image = image
                }
            }
        })
    }
}
