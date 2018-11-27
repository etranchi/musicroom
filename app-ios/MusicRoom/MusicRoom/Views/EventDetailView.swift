//
//  EventDetailView.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/27/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class EventDetailView: UIScrollView {
    var currentEvent : Event
    var headerView : AlbumHeaderView?
    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */
    
    
    
    init(frame: CGRect, _ event: Event, _ image : String) {
        self.currentEvent = event
        do {
            let url = URL(string: image)
            let data = try Data(contentsOf: url!)
            let img =  UIImage(data: data)
            self.headerView = AlbumHeaderView(frame: frame, albumCover: img!, title: event.title)
        } catch (let err) {
            print(err.localizedDescription)
        }
        super.init(frame : frame)
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    

}
