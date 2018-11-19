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
    var locationManager = CLLocationManager()
    var selectedPin:MKPlacemark? = nil
    var scrollView : UIScrollView? = nil
    var myPosition: CLLocationCoordinate2D?
    var myAnnotation: MKPointAnnotation = MKPointAnnotation()
    
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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestAlwaysAuthorization()
        locationManager.requestLocation()
        locationManager.startUpdatingLocation()

        titleTF.delegate = self
        descriptionTV.delegate = self
        scrollView = UIScrollView(frame: self.view.frame)
        scrollView!.delegate = self
        scrollView!.bounces = false
        scrollView!.alwaysBounceVertical = true
        scrollView!.contentSize.height = view.frame.height * 1.5
        self.view = scrollView!
        imagePicker.delegate = self
        let button = UIButton()
        button.setAttributedTitle(NSAttributedString(string: "Create", attributes: [NSAttributedStringKey.foregroundColor: UIColor.white]), for: .normal)
        button.frame = CGRect(x: 0, y: 0, width: 24, height: 24)
        button.addTarget(self, action: #selector(createEvent), for: .touchUpInside)
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: button)
        view.backgroundColor = UIColor(white: 0.1, alpha: 1)
        mapView.delegate = self
        mapView.showsUserLocation = true
        mapView.translatesAutoresizingMaskIntoConstraints = false
        mapView.setCenter(mapView.userLocation.coordinate, animated: true)
        let gesture = UILongPressGestureRecognizer(target: self, action: #selector(putPin))
        mapView.addGestureRecognizer(gesture)
        setupView()
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
        view.addSubview(imageView)
        view.addSubview(titleTF)
        view.addSubview(segmentedBar)
        view.addSubview(button)
        view.addSubview(datePicker)
        view.addSubview(descriptionTV)
        view.addSubview(mapView)
        NSLayoutConstraint.activate([
            mapView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            mapView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            mapView.topAnchor.constraint(equalTo: view.topAnchor, constant: 20),
            mapView.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier : 0.6),
            
            titleTF.topAnchor.constraint(equalTo: mapView.bottomAnchor, constant: 20),
            titleTF.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            titleTF.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            button.topAnchor.constraint(equalTo: titleTF.bottomAnchor, constant: 20),
            button.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            imageView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            imageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 20),
            
            
            segmentedBar.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            segmentedBar.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            segmentedBar.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 20),
            
            descriptionTV.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            descriptionTV.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            descriptionTV.topAnchor.constraint(equalTo: segmentedBar.bottomAnchor, constant: 20),
            descriptionTV.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier: 0.6),
            
            datePicker.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.9),
            datePicker.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            datePicker.topAnchor.constraint(equalTo: descriptionTV.bottomAnchor, constant: 20),
            datePicker.heightAnchor.constraint(equalTo: imageView.widthAnchor, multiplier : 0.6),
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
        if titleTF.text != nil && imageView.image != nil {
            let user = userManager.currentUser
            let coord = Coord(lat: (selectedPin?.coordinate.latitude)!, long: (selectedPin?.coordinate.longitude)!)
            // pays ville codepostale rue numero
            let address = Address(p: (selectedPin?.administrativeArea)!, v: (selectedPin?.locality)!, cp: (selectedPin?.isoCountryCode)!, r: (selectedPin?.thoroughfare)!, n: (selectedPin?.subThoroughfare)!)
            let location = Location(address: address, coord: coord)
            let dataImg = NSData(contentsOf: urlImageToString!)
            let imgString = dataImg?.base64EncodedString(options: .endLineWithLineFeed)
            let event = Event(login: (user?.login)!, title: titleTF.text!, description: descriptionTV.text!, location: location, visibility: segmentedBar.selectedSegmentIndex, shared: segmentedBar.selectedSegmentIndex == 0 ? true : false , creationDate: String(describing: Date()), date: String(describing: Date()), playlist: nil, members: [], adminMembers: [])
            apiManager.postEvent((user?.token)!, event: event, img: imageView.image!) { (resp) in
                print(resp)
            }
            /*self.navigationController?.popViewController(animated: true)
            let vc = self.navigationController?.viewControllers[0] as! MapController
            vc.printToastMsg()*/
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

extension EventController : CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        if status == .authorizedWhenInUse {
            locationManager.requestLocation()
        }
        if status == .authorizedAlways {
            locationManager.requestLocation()
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.first {
            let span = MKCoordinateSpanMake(0.05, 0.05)
            let region = MKCoordinateRegion(center: location.coordinate, span: span)
            mapView.setRegion(region, animated: true)
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("error:: \(error)")
        print(error.localizedDescription)
    }
}
