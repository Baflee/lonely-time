import { AuthProvider } from './contexts/jwt-context';
import Navigation from './navigation/index';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider >
  );
}