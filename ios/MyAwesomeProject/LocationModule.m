#import "LocationModule.h"
#import <React/RCTLog.h>
#import <CoreLocation/CoreLocation.h>

@implementation LocationModule

// To export the module to React Native
RCT_EXPORT_MODULE();

// Initialize the CLLocationManager
- (instancetype)init
{
  self = [super init];
  if (self) {
    _locationManager = [[CLLocationManager alloc] init];
    _locationManager.delegate = self;
    
    // Request permission if necessary
    if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusNotDetermined) {
      [_locationManager requestWhenInUseAuthorization];  // Request permission to access location "when in use"
    }
  }
  return self;
}

// Expose a method to get the current location to JavaScript
RCT_EXPORT_METHOD(getCurrentLocation:(RCTResponseSenderBlock)callback)
{
  self.locationCallback = callback;

  CLAuthorizationStatus status = [CLLocationManager authorizationStatus];

  if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
    // Permission was denied or restricted
    NSError *error = [NSError errorWithDomain:@"LocationError" code:2 userInfo:@{NSLocalizedDescriptionKey: @"Location services are denied or restricted. Please enable location services in settings."}];
    self.locationCallback(@[error.localizedDescription]);
  } else if (status == kCLAuthorizationStatusAuthorizedWhenInUse || status == kCLAuthorizationStatusAuthorizedAlways) {
    // Permission granted, start location updates
    if ([CLLocationManager locationServicesEnabled]) {
      [self.locationManager startUpdatingLocation];
    } else {
      NSError *error = [NSError errorWithDomain:@"LocationError" code:1 userInfo:@{NSLocalizedDescriptionKey: @"Location services are not enabled."}];
      self.locationCallback(@[error.localizedDescription]);
    }
  } else {
    // Request permission if not yet granted
    [_locationManager requestWhenInUseAuthorization];
    self.locationCallback(@[@"Permission is required to access location."]);
  }
}

// Delegate method called when new location data is available
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
  CLLocation *location = [locations lastObject];
  NSDictionary *locationData = @{
    @"latitude": @(location.coordinate.latitude),
    @"longitude": @(location.coordinate.longitude)
  };

  // Return the location data to JavaScript
  if (self.locationCallback) {
    self.locationCallback(@[locationData]);
    self.locationCallback = nil;
  }

  [self.locationManager stopUpdatingLocation];
}

// Delegate method called when there's an error with location updates
- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
  if (self.locationCallback) {
    self.locationCallback(@[error.localizedDescription]);
    self.locationCallback = nil;
  }
}

@end