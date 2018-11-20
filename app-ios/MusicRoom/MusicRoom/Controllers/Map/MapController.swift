//
//  MapController.swift
//  MusicRoom
//
//  Created by Etienne TRANCHIER on 11/15/18.
//  Copyright © 2018 Etienne Tranchier. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation

class MapController: UIViewController {
    let locationManager = CLLocationManager()
    var resultSearchController:UISearchController? = nil
    var selectedPin:MKPlacemark? = nil
    var events : [Event]?
    
    let mapView : MKMapView = {
        let mk = MKMapView()
        return mk
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestAlwaysAuthorization()
        locationManager.requestLocation()
        locationManager.startUpdatingLocation()
        mapView.delegate = self
        mapView.showsUserLocation = true
        mapView.setCenter(mapView.userLocation.coordinate, animated: true)

        apiManager.getEvents(completion: { res in
            if res.count > 0 {
                self.events = res
                DispatchQueue.main.async {
                    for ev in self.events! {
                        let annotation = MKPointAnnotation()
                        annotation.coordinate = CLLocationCoordinate2DMake(ev.location.coord.lat, ev.location.coord.lng)
                        annotation.title = ev.title
                        let city = ev.location.address.p
                        let state = ev.location.address.v
                        annotation.subtitle = "\(city) \(state)"
                        self.mapView.addAnnotation(annotation)
                    }
                }
            }
        })
        self.view = mapView
        let locationSearchTable = LocationSearchController()
        resultSearchController = UISearchController(searchResultsController: locationSearchTable)
        resultSearchController?.searchResultsUpdater = locationSearchTable as UISearchResultsUpdating
        let searchBar = resultSearchController!.searchBar
        searchBar.sizeToFit()
        searchBar.placeholder = "Search for places"
        resultSearchController?.isActive = true
        navigationItem.titleView = resultSearchController?.searchBar

        resultSearchController?.hidesNavigationBarDuringPresentation = false
        resultSearchController?.dimsBackgroundDuringPresentation = true
        definesPresentationContext = true
        
        locationSearchTable.mapView = mapView
        
        locationSearchTable.handleMapSearchDelegate = self
        // Do any additional setup after loading the view.
    }
    
    func printToastMsg() {
        ToastView.shared.short(self.view, txt_msg: "Event created", color : UIColor.green)
        selectedPin = nil
    }
    
    @objc func createEvent() {
        let dest = EventController()
        dest.selectedPin = selectedPin
        self.navigationController?.pushViewController(dest, animated: true)
        
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

extension MapController : CLLocationManagerDelegate {
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

extension MapController : MKMapViewDelegate {
    internal func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        if annotation is MKUserLocation {
            //return nil so map view draws "blue dot" for standard user location
            return nil
        }
        let reuseId = "pin"
        var pinView = mapView.dequeueReusableAnnotationView(withIdentifier: reuseId) as? MKPinAnnotationView
        pinView = MKPinAnnotationView(annotation: annotation, reuseIdentifier: reuseId)
        if (selectedPin != nil) && annotation.title! == selectedPin!.name && annotation.coordinate.latitude == selectedPin!.coordinate.latitude && annotation.coordinate.longitude == selectedPin!.coordinate.longitude {
            pinView?.pinTintColor = UIColor.orange
        } else {
            pinView?.pinTintColor = UIColor.red
        }
        pinView?.canShowCallout = true
        let smallSquare = CGSize(width: 30, height: 30)
        let button = UIButton(frame: CGRect(origin: CGPoint(), size: smallSquare))
        button.backgroundColor = UIColor.red
        button.addTarget(self, action: #selector(createEvent), for: .touchUpInside)
        pinView?.leftCalloutAccessoryView = button
        return pinView
    }
}


extension MapController: HandleMapSearch {
    func dropPinZoomIn(placemark:MKPlacemark){
        // cache the pin
        if selectedPin != nil {
            let remove = mapView.annotations.first { (annotation) -> Bool in
                if annotation.title! == selectedPin!.name && annotation.coordinate.latitude == selectedPin!.coordinate.latitude && annotation.coordinate.longitude == selectedPin!.coordinate.longitude {
                    return true
                } else {
                    return false
                }
            }
            if remove != nil {
                mapView.removeAnnotation(remove!)
            }
        }
        selectedPin = placemark
        let annotation = MKPointAnnotation()
        annotation.coordinate = placemark.coordinate
        annotation.title = placemark.name
        if let city = placemark.locality,
            let state = placemark.administrativeArea {
            annotation.subtitle = "\(city) \(state)"
        }
        mapView.addAnnotation(annotation)
        let span = MKCoordinateSpanMake(0.05, 0.05)
        let region = MKCoordinateRegionMake(placemark.coordinate, span)
        mapView.setRegion(region, animated: true)
    }
}

