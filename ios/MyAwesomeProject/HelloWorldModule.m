// HelloWorldModule.m
#import "HelloWorldModule.h"

@implementation HelloWorldModule

// Expose the module to React Native
RCT_EXPORT_MODULE(HelloWorldModule);

// Method to say hello, called from JavaScript
RCT_EXPORT_METHOD(sayHello:(RCTResponseSenderBlock)callback) {
  NSString *message = @"Hello from Objective-C Native Module!";
  callback(@[message]);
}

@end