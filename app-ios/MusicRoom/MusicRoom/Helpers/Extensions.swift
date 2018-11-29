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

    
    func            getImageUsingCacheWithUrlString(urlString: String, completion: @escaping (UIImage) -> ())
    {
        self.image = nil
        guard urlString != "" else { return }
        if let cachedImage = imageCache.object(forKey: urlString as NSString) {
            completion(cachedImage)
            return
        }
        let url = URL(string: urlString)
        guard let gurl = url else { return }
        apiManager.loadImageUsingCacheWithUrl(from: gurl, completion: { (data, response, error) in
            if error != nil {
                print(error!.localizedDescription)
                return
            }
            guard let data = data, error == nil else { return }
            DispatchQueue.main.async() {
                if let image = UIImage(data: data) {
                    imageCache.setObject(image, forKey: String(describing: url!) as NSString)
                    completion(image)
                }
            }
        })
    }
    
    func            loadImageUsingCacheWithUrlString(urlString: String)
    {
        getImageUsingCacheWithUrlString(urlString: urlString) { (image) in
            self.image = image
        }
    }
}
