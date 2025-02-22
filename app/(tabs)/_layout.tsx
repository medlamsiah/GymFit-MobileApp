import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function TabLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('isAuthenticated');
      router.replace('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          borderTopWidth: 1,
          height: 75,
          paddingBottom: 12,
          paddingTop: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarActiveTintColor: '#ff4757',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
          letterSpacing: 0.5,
          marginTop: 4,
          textAlign: 'center',
          fontFamily: 'System',
          paddingBottom: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
          width: 26,
          height: 26,
        },
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: '#fff',
        },
        headerRight: () => (
          <TouchableOpacity 
            onPress={handleLogout}
            style={{ 
              marginRight: 16, 
              padding: 8,
              backgroundColor: '#ff4757',
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={{ 
              color: '#fff', 
              marginLeft: 4,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
              Déconnexion
            </Text>
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Entraînements',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="fitness" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercices',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="barbell" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}