//
//  EventDetailController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/28/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class EventDetailController: UIViewController, UIScrollViewDelegate {
    var currentEvent : Event
    var headerImg : AlbumHeaderView?
    var scrollView : UIScrollView?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    var creatorLabel : UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 13, weight: .medium)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    var dateLabel : UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 13, weight: .medium)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    var descriptionLabel : UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 13, weight: .medium)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 1
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    var descriptionTextLabel : UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 13, weight: .medium)
        label.textColor = .white
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    var tableView : UITableView = {
        let tv = UITableView()
        tv.translatesAutoresizingMaskIntoConstraints = false
        return tv
    }()
    
    
    func setupView() {
        
        creatorLabel.attributedText = NSAttributedString(string: "Created by \(currentEvent.creator!.login)")
        dateLabel.attributedText = NSAttributedString(string: "Date : \(currentEvent.date)")
        descriptionLabel.attributedText = NSAttributedString(string: "Description :")
        descriptionTextLabel.attributedText = NSAttributedString(string: currentEvent.description)
        headerImg!.translatesAutoresizingMaskIntoConstraints = false
        scrollView?.addSubview(headerImg!)
        scrollView?.addSubview(creatorLabel)
        scrollView?.addSubview(dateLabel)
        scrollView?.addSubview(descriptionLabel)
        scrollView?.addSubview(descriptionTextLabel)
        NSLayoutConstraint.activate([
            scrollView!.widthAnchor.constraint(equalTo: view.widthAnchor),
            scrollView!.heightAnchor.constraint(equalTo: view.heightAnchor),
            scrollView!.topAnchor.constraint(equalTo: view.topAnchor),
            scrollView!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            headerImg!.widthAnchor.constraint(equalTo: scrollView!.widthAnchor),
            headerImg!.heightAnchor.constraint(equalToConstant: 250),
            headerImg!.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            headerImg!.topAnchor.constraint(equalTo: (self.navigationController?.navigationBar.bottomAnchor)!),
            
            creatorLabel.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.6),
            creatorLabel.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            creatorLabel.topAnchor.constraint(equalTo: headerImg!.bottomAnchor, constant: 20),
            
            dateLabel.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.6),
            dateLabel.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            dateLabel.topAnchor.constraint(equalTo: creatorLabel.bottomAnchor, constant: 20),
            
            descriptionLabel.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.6),
            descriptionLabel.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            descriptionLabel.topAnchor.constraint(equalTo: dateLabel.bottomAnchor, constant: 20),
            
            descriptionTextLabel.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.6),
            descriptionTextLabel.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            descriptionTextLabel.topAnchor.constraint(equalTo: dateLabel.bottomAnchor, constant: 20),
            ])
    }
    
    
    
    init(_ event : Event) {
        
        currentEvent = event
        headerImg = nil
        super.init(nibName: nil, bundle: nil)
        scrollView = UIScrollView(frame: self.view.frame)
        scrollView!.alwaysBounceVertical = true
        scrollView!.contentInset = UIEdgeInsets(top: 14, left: 0, bottom: 1130, right: 0)
        scrollView!.delegate = self
        self.view.addSubview(scrollView!)

        apiManager.getImgEvent(event.picture!) { (img) in
            if img != nil {
                DispatchQueue.main.async {
                    self.headerImg = AlbumHeaderView(frame: .zero, albumCover: img!, title: event.title)
                    self.setupView()
                }
                
            }
        }

    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
