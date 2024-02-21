jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));

  jest.mock('react-native-gesture-handler', () => {
    return {
      Swipeable: jest.fn().mockImplementation(() => null),
      DrawerLayout: jest.fn().mockImplementation(() => null),
      State: {},
      ScrollView: jest.fn().mockImplementation(() => null),
      Slider: jest.fn().mockImplementation(() => null),
      Switch: jest.fn().mockImplementation(() => null),
      TextInput: jest.fn().mockImplementation(() => null),
      ToolbarAndroid: jest.fn().mockImplementation(() => null),
      ViewPagerAndroid: jest.fn().mockImplementation(() => null),
      DrawerLayoutAndroid: jest.fn().mockImplementation(() => null),
      WebView: jest.fn().mockImplementation(() => null),
      NativeViewGestureHandler: jest.fn().mockImplementation(() => null),
      TapGestureHandler: jest.fn().mockImplementation(() => null),
      FlingGestureHandler: jest.fn().mockImplementation(() => null),
      ForceTouchGestureHandler: jest.fn().mockImplementation(() => null),
      LongPressGestureHandler: jest.fn().mockImplementation(() => null),
      PanGestureHandler: jest.fn().mockImplementation(() => null),
      PinchGestureHandler: jest.fn().mockImplementation(() => null),
      RotationGestureHandler: jest.fn().mockImplementation(() => null),
    };
  });

  jest.mock('@react-native-firebase/messaging', () => {
    return () => ({
      onMessage: jest.fn(),
      onNotificationOpenedApp: jest.fn(),
      getInitialNotification: jest.fn(),
      requestPermission: jest.fn(() => Promise.resolve(true)),
      getToken: jest.fn(() => Promise.resolve('myMockToken')),
      setBackgroundMessageHandler: jest.fn(),
      onMessage: jest.fn(),
    });
  });