//#import "LocationModule.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <CoreLocation/CoreLocation.h>

@interface LocationModule : RCTEventEmitter <RCTBridgeModule, CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocationManager *locationManager;  // Ensure the property is correctly declared
@property (nonatomic, assign) BOOL hasListeners;

@end

@implementation LocationModule

RCT_EXPORT_MODULE();

- (instancetype)init {
  self = [super init];
  if (self) {
    self.locationManager = [[CLLocationManager alloc] init];  // Initialize the locationManager property
    self.locationManager.delegate = self;
  }
  return self;
}

#pragma mark - React Native Lifecycle

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onLocationUpdate"];
}

- (void)startObserving {
  self.hasListeners = YES;
}

- (void)stopObserving {
  self.hasListeners = NO;
}

#pragma mark - React Native Methods

// Method to check location permissions
RCT_EXPORT_METHOD(checkLocationPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
  if ([CLLocationManager locationServicesEnabled]) {
    if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
      resolve(@(YES));
    } else if (status == kCLAuthorizationStatusNotDetermined) {
      [self.locationManager requestWhenInUseAuthorization];  // Request authorization if not determined
      resolve(@(NO));  // Pending permission request
    } else {
      resolve(@(NO));  // Permission denied or restricted
    }
  } else {
    reject(@"LOCATION_SERVICES_DISABLED", @"Location services are disabled", nil);
  }
}

// Method to get current location
RCT_EXPORT_METHOD(getCurrentLocation:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedWhenInUse ||
      [CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedAlways) {
    [self.locationManager requestLocation];  // Request current location
    // The location will be handled in the delegate method
  } else {
    reject(@"LOCATION_PERMISSION_DENIED", @"Location permission is denied", nil);
  }
}

#pragma mark - CLLocationManagerDelegate

// Delegate method called when location is updated
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
  if (locations.count > 0) {
    CLLocation *location = [locations lastObject];
    if (self.hasListeners) {
      // Send the updated location to JavaScript
      [self sendEventWithName:@"onLocationUpdate" body:@{
        @"latitude": @(location.coordinate.latitude),
        @"longitude": @(location.coordinate.longitude),
        @"altitude": @(location.altitude),
        @"timestamp": @(location.timestamp.timeIntervalSince1970)
      }];
    }
  }
}

// Delegate method called when location update fails
- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
  if (self.hasListeners) {
    [self sendEventWithName:@"onLocationUpdate" body:@{
      @"error": error.localizedDescription
    }];
  }
}

@end
