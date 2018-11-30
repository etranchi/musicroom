    //
//  EventDetailController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/28/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit

class EventDetailController: UIViewController{
    var currentEvent : Event
    var headerImg : AlbumHeaderView?
    private let libraryCellId = "libraryCellId"
    var tableView : UITableView?
    var root : EventsController?
    var rootMap : MapController?

    
    @objc func updateEvent() {
        apiManager.putEvent(currentEvent) { (res) in
            if (res) {
                ToastView.shared.short(self.view, txt_msg: "Event Updated", color: UIColor.green)
                apiManager.getEventById(self.currentEvent._id!) { (res) in
                    self.currentEvent = res
                    if self.root != nil {
                        self.root!.reloadEvent()
                    } else {
                        self.rootMap?.getAllEvents()
                    }
                    self.reloadLabel()
                }
            }
        }
        
    }
    
    func reloadLabel() {
        creatorLabel.attributedText = NSAttributedString(string: "Created by \(currentEvent.creator!.login)")
        dateLabel.attributedText = NSAttributedString(string: "Date : \(currentEvent.date)")
        descriptionLabel.attributedText = NSAttributedString(string: "Description :")
        descriptionTextLabel.attributedText = NSAttributedString(string: currentEvent.description)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let button = UIButton()
        button.setAttributedTitle(NSAttributedString(string: "Save", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.frame = CGRect(x: 0, y: 0, width: 24, height: 24)
        button.addTarget(self, action: #selector(updateEvent), for: .touchUpInside)
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: button)
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
    
    
    func addMembersAdmins(_ event: Event) {
        currentEvent = event
        root!.reloadEvent()
    }
    
    func setupView() {
        
        creatorLabel.attributedText = NSAttributedString(string: "Created by \(currentEvent.creator!.login)")
        dateLabel.attributedText = NSAttributedString(string: "Date : \(currentEvent.date)")
        descriptionLabel.attributedText = NSAttributedString(string: "Description :")
        descriptionTextLabel.attributedText = NSAttributedString(string: currentEvent.description)
        headerImg!.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(headerImg!)
        view.addSubview(creatorLabel)
        view.addSubview(dateLabel)
        view.addSubview(descriptionLabel)
        view.addSubview(descriptionTextLabel)
        view.addSubview(tableView!)
        

        NSLayoutConstraint.activate([
            headerImg!.widthAnchor.constraint(equalTo: view.widthAnchor),
            headerImg!.heightAnchor.constraint(equalToConstant: 250),
            headerImg!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            headerImg!.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
            
            creatorLabel.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            creatorLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            creatorLabel.topAnchor.constraint(equalTo: headerImg!.bottomAnchor, constant: 20),
            
            dateLabel.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            dateLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            dateLabel.topAnchor.constraint(equalTo: creatorLabel.bottomAnchor, constant: 20),
            
            descriptionLabel.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            descriptionLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            descriptionLabel.topAnchor.constraint(equalTo: dateLabel.bottomAnchor, constant: 20),
            
            descriptionTextLabel.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.6),
            descriptionTextLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            descriptionTextLabel.topAnchor.constraint(equalTo: descriptionLabel.bottomAnchor, constant: 20),
            
            tableView!.widthAnchor.constraint(equalTo: view.widthAnchor),
            tableView!.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            tableView!.heightAnchor.constraint(equalToConstant: 120),
            tableView!.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -192)
            ])
        
    }
    
    
    
    init(_ event : Event) {
        
        currentEvent = event
        headerImg = nil
        super.init(nibName: nil, bundle: nil)
        
        tableView = UITableView()
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        tableView!.backgroundColor = UIColor(white: 0.1, alpha: 1)
        tableView!.delegate = self
        tableView!.dataSource = self
        tableView!.separatorStyle = .none
        tableView?.isScrollEnabled = false
        tableView!.register(LibraryCell.self, forCellReuseIdentifier: libraryCellId)
        tableView!.translatesAutoresizingMaskIntoConstraints = false

        apiManager.getImgEvent(event.picture!) { (img) in
            self.headerImg = AlbumHeaderView(frame: .zero, albumCover: img!, title: event.title)
            self.setupView()
                   
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

extension EventDetailController : UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: libraryCellId, for: indexPath) as! LibraryCell
        switch indexPath.row {
        case 0:
            cell.titleLabel.text = "Members"
            cell.iconView0.image = #imageLiteral(resourceName: "songs_icon")
        case 1:
            cell.titleLabel.text = "Admins"
            cell.iconView0.image = #imageLiteral(resourceName: "playlists_icon")
        case 2 :
            cell.titleLabel.text = "Playlist"
            cell.iconView0.image = #imageLiteral(resourceName: "play_icon")
        default:
            cell.titleLabel.text = "Omg... wtf.."
        }
        cell.selectionStyle = .none
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        switch indexPath.row {
        case 0:
            let vc = SearchMemberController()
            vc.root = self
            vc.event = currentEvent
            vc.admins = false
            vc.members = currentEvent.members
            self.navigationController?.pushViewController(vc, animated: true)
        case 1:
            let vc = SearchMemberController()
            vc.root = self
            vc.event = currentEvent
            vc.admins = true
            vc.members = currentEvent.adminMembers
            self.navigationController?.pushViewController(vc, animated: true)
        case 2:
            let cell = tableView.cellForRow(at: indexPath)
            print(currentEvent.playlist)
            print(headerImg?.albumCover)
            let vc = PlaylistDetailController(currentEvent.playlist!, headerImg!.albumCover)
            self.navigationController?.pushViewController(vc, animated: true)
        default:
            print("Omg... wtf..")
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return 3
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 40.0
    }
}
