#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import "RNAppAuthAuthorizationFlowManager.h" // Import this

// Declare AppDelegate interface
@interface AppDelegate : RCTAppDelegate <UIApplicationDelegate, RNAppAuthAuthorizationFlowManager> // Conform to RNAppAuthAuthorizationFlowManager

@property (nonatomic, weak) id<RNAppAuthAuthorizationFlowManagerDelegate> authorizationFlowManagerDelegate; // Delegate property for flow management

@end
