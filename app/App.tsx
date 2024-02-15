import { useEffect } from 'react';
import { AuthProvider } from './contexts/jwt-context';
import Navigation from './navigation/index';
import notification from './hooks/notification';
export default function App() {

  const { requestUserPermission, getFCMToken, listenToForegroundNotifications, listenToBackgroundNotifications } = notification();

  useEffect(() => {
    const handleNotifications = () => {
      try {
        requestUserPermission();
        getFCMToken();
        listenToForegroundNotifications();
        listenToBackgroundNotifications();
      }
      catch (error) {
        console.log(error);
      }
    }
    handleNotifications();
  }, [requestUserPermission, getFCMToken, listenToForegroundNotifications, listenToBackgroundNotifications]);
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider >
  );
}