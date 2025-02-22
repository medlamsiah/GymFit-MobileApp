import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Modal, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  level: string;
  workouts: number;
  calories: number;
  hours: number;
  achievements: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Thomas Dubois',
    email: 'thomas.dubois@example.com',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    level: 'Expert',
    workouts: 156,
    calories: 28500,
    hours: 180,
    achievements: 24
  },
  {
    id: 2,
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400',
    level: 'Intermédiaire',
    workouts: 89,
    calories: 15600,
    hours: 95,
    achievements: 12
  },
  {
    id: 3,
    name: 'Lucas Bernard',
    email: 'lucas.bernard@example.com',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    level: 'Avancé',
    workouts: 134,
    calories: 22400,
    hours: 145,
    achievements: 18
  },
  {
    id: 4,
    name: 'Emma Petit',
    email: 'emma.petit@example.com',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    level: 'Débutant',
    workouts: 45,
    calories: 8200,
    hours: 52,
    achievements: 6
  },
  {
    id: 5,
    name: 'Antoine Roux',
    email: 'antoine.roux@example.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    level: 'Expert',
    workouts: 198,
    calories: 32400,
    hours: 210,
    achievements: 28
  }
];

export default function ProfileScreen() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Tous');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

  const filterUsers = () => {
    let filtered = users;
    
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLevel !== 'Tous') {
      filtered = filtered.filter(user => user.level === selectedLevel);
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers();
  }, [searchQuery, selectedLevel, users]);

  const deleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    setModalVisible(false);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditModalVisible(false);
    setEditingUser(null);
  };

  const renderUserCard = ({ item }: { item: User }) => (
    <TouchableOpacity 
      style={styles.userCard}
      onPress={() => {
        setSelectedUser(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.workouts}</Text>
          <Text style={styles.statLabel}>Séances</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.hours}</Text>
          <Text style={styles.statLabel}>Heures</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.achievements}</Text>
          <Text style={styles.statLabel}>Succès</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un utilisateur..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {levels.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.filterButton,
                selectedLevel === level && styles.filterButtonActive
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedLevel === level && styles.filterButtonTextActive
              ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal détails utilisateur */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedUser && (
              <>
                <Image source={{ uri: selectedUser.image }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedUser.name}</Text>
                <Text style={styles.modalEmail}>{selectedUser.email}</Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.modalStatItem}>
                    <Ionicons name="fitness" size={24} color="#ff4757" />
                    <Text style={styles.modalStatNumber}>{selectedUser.workouts}</Text>
                    <Text style={styles.modalStatLabel}>Séances</Text>
                  </View>
                  <View style={styles.modalStatItem}>
                    <Ionicons name="time" size={24} color="#ff4757" />
                    <Text style={styles.modalStatNumber}>{selectedUser.hours}</Text>
                    <Text style={styles.modalStatLabel}>Heures</Text>
                  </View>
                  <View style={styles.modalStatItem}>
                    <Ionicons name="trophy" size={24} color="#ff4757" />
                    <Text style={styles.modalStatNumber}>{selectedUser.achievements}</Text>
                    <Text style={styles.modalStatLabel}>Succès</Text>
                  </View>
                  <View style={styles.modalStatItem}>
                    <Ionicons name="flame" size={24} color="#ff4757" />
                    <Text style={styles.modalStatNumber}>{selectedUser.calories}</Text>
                    <Text style={styles.modalStatLabel}>Calories</Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.editButton]}
                    onPress={() => {
                      setEditingUser(selectedUser);
                      setModalVisible(false);
                      setEditModalVisible(true);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={() => deleteUser(selectedUser.id)}
                  >
                    <Text style={styles.modalButtonText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal édition utilisateur */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {editingUser && (
              <>
                <Text style={styles.modalTitle}>Modifier l'utilisateur</Text>
                <TextInput
                  style={styles.editInput}
                  value={editingUser.name}
                  onChangeText={(text) => setEditingUser({ ...editingUser, name: text })}
                  placeholder="Nom"
                  placeholderTextColor="#666"
                />
                <TextInput
                  style={styles.editInput}
                  value={editingUser.email}
                  onChangeText={(text) => setEditingUser({ ...editingUser, email: text })}
                  placeholder="Email"
                  placeholderTextColor="#666"
                />
                <TextInput
                  style={styles.editInput}
                  value={editingUser.level}
                  onChangeText={(text) => setEditingUser({ ...editingUser, level: text })}
                  placeholder="Niveau"
                  placeholderTextColor="#666"
                />

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={() => updateUser(editingUser)}
                >
                  <Text style={styles.modalButtonText}>Enregistrer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Annuler</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  searchInput: {
    backgroundColor: '#252525',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#252525',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#ff4757',
  },
  filterButtonText: {
    color: '#888',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userInfo: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4757',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    width: '90%',
    padding: 20,
    maxHeight: '80%',
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalEmail: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalStatItem: {
    alignItems: 'center',
    width: '45%',
    marginBottom: 16,
  },
  modalStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  modalStatLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  editButton: {
    backgroundColor: '#2ecc71',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    marginBottom: 12,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editInput: {
    backgroundColor: '#252525',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 12,
  },
});