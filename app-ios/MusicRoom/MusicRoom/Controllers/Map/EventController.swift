//
//  EventController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/15/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation

class EventController: UIViewController , UINavigationControllerDelegate, UIScrollViewDelegate{
    
    let imagePicker = UIImagePickerController()
    var resultSearchController:UISearchController? = nil
    var searchBar : UISearchBar?
    var urlImageToString : URL?
    var locationManager : CLLocationManager?
    var selectedPin:MKPlacemark? = nil
    var scrollView : UIScrollView? = nil
    var myPosition: CLLocationCoordinate2D?
    var myAnnotation: MKPointAnnotation = MKPointAnnotation()
    
    var playlistView : PlaylistCollectionView?
    
    let titleTF : UITextField = {
        let tf = UITextField()
        tf.font = UIFont.systemFont(ofSize: 14, weight: .light)
        tf.textAlignment = .center
        tf.backgroundColor = UIColor.gray
        tf.borderStyle = .roundedRect
        tf.textColor = .white
        tf.returnKeyType = .done
        tf.enablesReturnKeyAutomatically = true
        tf.attributedPlaceholder = NSAttributedString(string: "Event name", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white])
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    let datePicker : UIDatePicker = {
        let dp = UIDatePicker()
        dp.timeZone = NSTimeZone.local
        dp.backgroundColor = UIColor.gray
        dp.datePickerMode = UIDatePickerMode.dateAndTime
        dp.minimumDate = Date()
        dp.translatesAutoresizingMaskIntoConstraints = false
        return dp
    }()
    
    let segmentedBar : UISegmentedControl = {
        let items = ["Public", "Private"]
        let sb = UISegmentedControl(items: items)
        sb.selectedSegmentIndex = 0
        sb.layer.cornerRadius = 8
        sb.backgroundColor = UIColor.gray
        sb.tintColor = UIColor.white
        sb.translatesAutoresizingMaskIntoConstraints = false
        return sb
    }()
    let descriptionTV : UITextView = {
        let tv = UITextView()
        tv.font = UIFont.systemFont(ofSize: 14, weight: .light)
        tv.textAlignment = .center
        tv.backgroundColor = UIColor.gray
        tv.textColor = .white
        tv.layer.cornerRadius = 8
        tv.isEditable = true
        tv.returnKeyType = .done
        tv.enablesReturnKeyAutomatically = true
        tv.translatesAutoresizingMaskIntoConstraints = false
        return tv
    }()
    let mapView : MKMapView = {
        let mv = MKMapView()
        return mv
    }()
    
    let imageView : UIImageView = {
        let iv = UIImageView()
        iv.contentMode = .scaleAspectFill
        iv.translatesAutoresizingMaskIntoConstraints = false
        iv.layer.masksToBounds = true
        iv.backgroundColor = UIColor.gray
        return iv
    }()
    
    
    func getCenter() {
        
        if myPosition == nil {
            myPosition = locationManager!.location?.coordinate
        }
        
        if let pin = selectedPin, let me = myPosition {
            let sourceCoordinate = me
            let destCoordinate = pin.coordinate
            
            let soucePlaceMark = MKPlacemark(coordinate: sourceCoordinate)
            let destPlaceMark = MKPlacemark(coordinate: destCoordinate)
            
            let sourceItem = MKMapItem(placemark: soucePlaceMark)
            let destItem = MKMapItem(placemark: destPlaceMark)
            var directionReq : MKDirectionsRequest = MKDirectionsRequest()
            directionReq.source = sourceItem
            directionReq.destination = destItem
            directionReq.transportType = .automobile
            
            let direction = MKDirections(request: directionReq)
            direction.calculate(completionHandler: { (response, error) in
                guard let response = response else {
                    if let error = error {
                        let noData = UIAlertController(title: "Alert", message: "No roads available \(error.localizedDescription)", preferredStyle: UIAlertControllerStyle.alert)
                        noData.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
                        self.present(noData, animated: true, completion: nil)
                    }
                    return
                }
                let myRoute = response.routes[0]
                self.mapView.add(myRoute.polyline, level: .aboveRoads)
                var rekt = myRoute.polyline.boundingMapRect
                let coord = MKCoordinateRegionForMapRect(rekt)
                let distance = MKCoordinateRegionMake(coord.center, coord.span)
                self.mapView.setRegion(distance, animated: true)

            })
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        titleTF.delegate = self
        descriptionTV.delegate = self
        scrollView = UIScrollView(frame: self.view.frame)
        scrollView!.delegate = self
        scrollView!.alwaysBounceVertical = true
        scrollView?.contentInset = UIEdgeInsets(top: 14, left: 0, bottom: 1130, right: 0)
        self.view.addSubview(scrollView!)
        imagePicker.delegate = self
        let button = UIButton()
        button.setAttributedTitle(NSAttributedString(string: "Create", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.frame = CGRect(x: 0, y: 0, width: 24, height: 24)
        button.addTarget(self, action: #selector(createEvent), for: .touchUpInside)
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: button)
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        mapView.delegate = self
        mapView.showsUserLocation = true
        mapView.isUserInteractionEnabled = false
        mapView.translatesAutoresizingMaskIntoConstraints = false
        mapView.addAnnotation(selectedPin!)
        getCenter()
        
        let gesture = UILongPressGestureRecognizer(target: self, action: #selector(putPin))
        mapView.addGestureRecognizer(gesture)
        setupView()
        apiManager.getUserPlaylists(completion: { (res) in
            print(res)
            self.playlistView?.eventCreation = true
            self.playlistView!.playlists = res
            print("yp")
            self.playlistView!.reloadData()
        })
        // Do any additional setup after loading the view.
    }
    
    @objc func putPin(_ sender : UILongPressGestureRecognizer) {
        if sender.state != UIGestureRecognizerState.began { return }
        let touchLocation = sender.location(in: mapView)
        let locationCoordinate = mapView.convert(touchLocation, toCoordinateFrom: mapView)
        myPosition = locationCoordinate
        myAnnotation.coordinate = myPosition!
        mapView.addAnnotation(myAnnotation)
    }
    

    func setupView() {
        let button = UIButton(type: .roundedRect)
        button.titleEdgeInsets = UIEdgeInsets(top: -10,left: -10,bottom: -10,right: -10)
        button.backgroundColor = UIColor.gray
        button.layer.cornerRadius = 8
        button.setAttributedTitle(NSAttributedString(string: "Add a picture", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.addTarget(self, action: #selector(imagePick), for: .touchUpInside)
        
        button.translatesAutoresizingMaskIntoConstraints = false
        playlistView = PlaylistCollectionView([], .horizontal, nil)
        playlistView!.translatesAutoresizingMaskIntoConstraints = false
        scrollView!.addSubview(imageView)
        scrollView!.addSubview(titleTF)
        scrollView!.addSubview(segmentedBar)
        scrollView!.addSubview(button)
        scrollView!.addSubview(datePicker)
        scrollView!.addSubview(descriptionTV)
        scrollView!.addSubview(mapView)
        scrollView!.addSubview(playlistView!)
        NSLayoutConstraint.activate([
            mapView.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            mapView.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            mapView.topAnchor.constraint(equalTo: scrollView!.topAnchor, constant: 20),
            mapView.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier : 0.6),
            
            titleTF.topAnchor.constraint(equalTo: mapView.bottomAnchor, constant: 20),
            titleTF.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            titleTF.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            
            button.topAnchor.constraint(equalTo: titleTF.bottomAnchor, constant: 20),
            button.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            button.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            
            imageView.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            imageView.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 20),
            
            
            segmentedBar.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            segmentedBar.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            segmentedBar.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 20),
            
            descriptionTV.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            descriptionTV.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            descriptionTV.topAnchor.constraint(equalTo: segmentedBar.bottomAnchor, constant: 20),
            descriptionTV.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier: 0.6),
            
            datePicker.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            datePicker.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            datePicker.topAnchor.constraint(equalTo: descriptionTV.bottomAnchor, constant: 20),
            datePicker.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier : 0.6),
            
            playlistView!.topAnchor.constraint(equalTo: datePicker.bottomAnchor, constant: 30),
            playlistView!.widthAnchor.constraint(equalTo: scrollView!.widthAnchor, multiplier: 0.9),
            playlistView!.centerXAnchor.constraint(equalTo: scrollView!.centerXAnchor),
            playlistView!.heightAnchor.constraint(equalToConstant: 200)
            
            ])
    }
    
    @objc func imagePick() {
        imagePicker.allowsEditing = false
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            imagePicker.sourceType = .photoLibrary
            present(imagePicker, animated: true, completion: nil)
        }
        else {
            print("not allowed")
        }
    }
    
    @objc func createEvent() {
        // if data is good
        if titleTF.text != nil && imageView.image != nil && playlistView?.selectedPlaylist != nil {
            let myUser = userManager.currentUser
            let coord = Coord(lat: (selectedPin?.coordinate.latitude)!, lng: (selectedPin?.coordinate.longitude)!)
            // pays ville codepostale rue numero
            let address = Address(p: (selectedPin?.administrativeArea)!, v: (selectedPin?.locality)!, cp: (selectedPin?.isoCountryCode)!, r: (selectedPin?.thoroughfare)!, n: (selectedPin?.subThoroughfare)!)
            let location = Location(address: address, coord: coord)
            let dataImg = NSData(contentsOf: urlImageToString!)
            apiManager.getMe((myUser?.token)!, completion: { (user) in
                let event = Event(_id : nil, creator : user, title: self.titleTF.text!, description: self.descriptionTV.text!, location: location, visibility: self.segmentedBar.selectedSegmentIndex, shared: self.segmentedBar.selectedSegmentIndex == 0 ? true : false , creationDate: String(describing: Date()), date: String(describing: Date()), playlist: self.playlistView?.selectedPlaylist!, members: [], adminMembers: [], picture : nil)
                apiManager.postEvent((myUser?.token)!, event: event, img: self.imageView.image!) { (resp) in
                    if resp {
                        let vc = self.navigationController?.viewControllers[0] as! MapController
                        vc.mapView.removeAnnotations(vc.mapView.annotations)
                        vc.selectedPin = nil
                        vc.printToastMsg()
                        vc.getAllEvents()
                        self.navigationController?.popViewController(animated: true)
                        
                        
                    } else {
                        ToastView.shared.short(self.view, txt_msg: "Error while creating your event", color : UIColor.red)
                    }
                }
            })
    
        }
        else {
            ToastView.shared.short(self.view, txt_msg: "Check twice your information", color : UIColor.red)
        }
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

extension EventController : UIImagePickerControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        print(info)
        if let pickedImage = info[UIImagePickerControllerOriginalImage] as? UIImage , let urlImage = info[UIImagePickerControllerImageURL] as? URL{
            urlImageToString = urlImage
            imageView.image = pickedImage
            NSLayoutConstraint.activate([
                imageView.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier: 0.6)
                ])
        }
        dismiss(animated: true, completion: nil)
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
}

extension EventController : UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}

extension EventController : UITextViewDelegate {
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        if(text == "\n") {
            textView.resignFirstResponder()
            return false
        }
        return true
    }
}

extension EventController : MKMapViewDelegate {
    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        if annotation is MKUserLocation {
            //return nil so map view draws "blue dot" for standard user location
            return nil
        }
        let reuseId = "pin"
        var pinView = mapView.dequeueReusableAnnotationView(withIdentifier: reuseId) as? MKPinAnnotationView
        pinView = MKPinAnnotationView(annotation: annotation, reuseIdentifier: reuseId)
        pinView?.pinTintColor = UIColor.orange
        pinView?.canShowCallout = true
        let smallSquare = CGSize(width: 30, height: 30)
        let button = UIButton(frame: CGRect(origin: CGPoint(), size: smallSquare))
        pinView?.leftCalloutAccessoryView = button
        return pinView
    }
    
    func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
        let renderer = MKPolylineRenderer(overlay: overlay)
        renderer.strokeColor = UIColor(red: 17.0/255.0, green: 147.0/255.0, blue: 255.0/255.0, alpha: 1)
        renderer.lineWidth = 5.0
        return renderer
    }
}


