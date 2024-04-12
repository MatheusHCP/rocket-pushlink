import { useTheme } from 'native-base';
import { DefaultTheme,LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import { OneSignal, NotificationWillDisplayEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';


const Linking : LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ["igniteshoesapp://"],
  config: {
    screens: {
      details: {
        path: "/details/:productId",
        parse: {
          productId: (productId: string) => productId,
        }
      }
    }
  }
}


export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];


  useEffect(() => {
    const notificationDisplay = (event: NotificationWillDisplayEvent) : void => {
      const response = event.getNotification();
      console.log(response)
      setNotification(response)

    };


    OneSignal.Notifications.addEventListener('foregroundWillDisplay', notificationDisplay)

    return () => OneSignal.Notifications.removeEventListener('foregroundWillDisplay', notificationDisplay)
  },[])

  return (
    <NavigationContainer linking={Linking} theme={theme}>
      <AppRoutes />

      {notification?.title && 
        <Notification data={notification} onClose={() => setNotification(undefined)}/>
      }
    </NavigationContainer>
  );
}