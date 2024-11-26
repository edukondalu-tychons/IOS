#import <React/RCTBridgeModule.h>
#import <CoreLocation/CoreLocation.h>

@interface LocationModule : NSObject <RCTBridgeModule, CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, strong) RCTResponseSenderBlock locationCallback;

@end
