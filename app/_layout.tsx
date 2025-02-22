import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
      } else {
        await AsyncStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
      }
      setIsLoading(false);
      window.frameworkReady?.();
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#ff4757" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: 'fade'
      }}>
        <Stack.Screen 
          name="login" 
          options={{ 
            gestureEnabled: false,
            animationTypeForReplace: isAuthenticated ? 'push' : 'pop'
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            gestureEnabled: false,
            animationTypeForReplace: isAuthenticated ? 'pop' : 'push'
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
      {!isAuthenticated && <Redirect href="/login" />}
    </>
  );
}