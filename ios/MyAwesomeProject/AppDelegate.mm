// #import "AppDelegate.h"

// #import <React/RCTBundleURLProvider.h>
// #import <GoogleMaps/GoogleMaps.h>

// @implementation AppDelegate

// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   // Ensure full-screen compatibility
//   UIWindow *window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//   self.window = window;

//   [GMSServices provideAPIKey:@"AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"];
  
//   self.moduleName = @"MyAwesomeProject";
//   // You can add your custom initial props in the dictionary below.
//   // They will be passed down to the ViewController used by React Native.
//   self.initialProps = @{};

//   return [super application:application didFinishLaunchingWithOptions:launchOptions];
// }

// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
//   return [self bundleURL];
// }

// - (NSURL *)bundleURL
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

// @end


#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Ensure full-screen compatibility
  UIWindow *window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window = window;

  // Replace this with a secure method to retrieve your API key
  NSString *apiKey = @"AIzaSyBy23QPq57ncj9Us2UbtieLIzxzk0mjAKo"; // Consider loading this from a secure source
  [GMSServices provideAPIKey:apiKey];

/*  [GMSServices provideAPIKey:@"AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"];*/

  
  self.moduleName = @"MyAwesomeProject";
  
  // You can add your custom initial props in the dictionary below.
  self.initialProps = @{};
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

