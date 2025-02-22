import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Workout {
  id: number;
  title: string;
  body: string;
  exercises: string[];
  duration: string;
  difficulty: string;
  calories: string;
}

const workoutImages = [
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800',
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800',
];

const workoutDetails = [
  {
    exercises: [
      'Développé couché: 4 x 12 reps',
      'Développé militaire: 3 x 12 reps',
      'Élévations latérales: 3 x 15 reps',
      'Dips: 3 x 10 reps',
      'Extensions triceps: 3 x 15 reps'
    ],
    duration: '45-60 minutes',
    difficulty: 'Intermédiaire',
    calories: '400-500 kcal'
  },
  {
    exercises: [
      'Squats: 4 x 10 reps',
      'Presse à cuisses: 4 x 12 reps',
      'Extensions des jambes: 3 x 15 reps',
      'Fentes avant: 3 x 12 reps/jambe',
      'Mollets debout: 4 x 20 reps'
    ],
    duration: '50-65 minutes',
    difficulty: 'Avancé',
    calories: '500-600 kcal'
  },
  {
    exercises: [
      'Burpees: 4 x 30 sec',
      'Mountain Climbers: 4 x 45 sec',
      'Jumping Jacks: 4 x 45 sec',
      'Squats sautés: 4 x 20 reps',
      'Gainage: 4 x 45 sec'
    ],
    duration: '30-40 minutes',
    difficulty: 'Intermédiaire',
    calories: '300-400 kcal'
  },
  {
    exercises: [
      'Tractions: 4 x 8-10 reps',
      'Rowing haltère: 3 x 12 reps',
      'Curl biceps: 3 x 12 reps',
      'Hammer curl: 3 x 12 reps',
      'Pull-over: 3 x 15 reps'
    ],
    duration: '45-60 minutes',
    difficulty: 'Intermédiaire',
    calories: '400-500 kcal'
  },
  {
    exercises: [
      'Crunchs: 3 x 20 reps',
      'Planche: 3 x 45 sec',
      'Russian twist: 3 x 20 reps',
      'Relevé de jambes: 3 x 15 reps',
      'Gainage latéral: 3 x 30 sec/côté'
    ],
    duration: '30-40 minutes',
    difficulty: 'Débutant',
    calories: '200-300 kcal'
  }
];

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const data = await response.json();
      const translatedData = data.map((item: any, index: number) => ({
        ...item,
        title: `Entraînement ${index + 1}`,
        body: getWorkoutDescription(index),
        exercises: workoutDetails[index].exercises,
        duration: workoutDetails[index].duration,
        difficulty: workoutDetails[index].difficulty,
        calories: workoutDetails[index].calories
      }));
      setWorkouts(translatedData);
    } catch (error) {
      console.error('Erreur lors du chargement des entraînements:', error);
    }
  };

  const getWorkoutDescription = (index: number) => {
    const descriptions = [
      'Programme complet de musculation pour le haut du corps avec focus sur la poitrine et les épaules.',
      'Entraînement intensif des jambes avec squats et presse.',
      'Circuit training complet pour brûler les graisses et développer l\'endurance.',
      'Séance de musculation du dos et des biceps.',
      'Programme spécial abdominaux et gainage.'
    ];
    return descriptions[index] || 'Description de l\'entraînement';
  };

  const openWorkoutModal = (workout: Workout) => {
    setSelectedWorkout(workout);
    setModalVisible(true);
  };

  const renderWorkoutCard = ({ item, index }: { item: Workout; index: number }) => (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.cardTouchable}
        onPress={() => openWorkoutModal(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: workoutImages[index % workoutImages.length] }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.body}
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => openWorkoutModal(item)}
          >
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={renderWorkoutCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedWorkout && (
              <ScrollView>
                <Image
                  source={{ uri: workoutImages[workouts.indexOf(selectedWorkout) % workoutImages.length] }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedWorkout.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedWorkout.body}
                </Text>

                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Ionicons name="time-outline" size={24} color="#ff4757" />
                    <Text style={styles.statLabel}>Durée</Text>
                    <Text style={styles.statValue}>{selectedWorkout.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="fitness-outline" size={24} color="#ff4757" />
                    <Text style={styles.statLabel}>Difficulté</Text>
                    <Text style={styles.statValue}>{selectedWorkout.difficulty}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="flame-outline" size={24} color="#ff4757" />
                    <Text style={styles.statLabel}>Calories</Text>
                    <Text style={styles.statValue}>{selectedWorkout.calories}</Text>
                  </View>
                </View>

                <View style={styles.exercisesContainer}>
                  <Text style={styles.exercisesTitle}>Exercices:</Text>
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseItem}>
                      <Ionicons name="checkmark-circle-outline" size={20} color="#ff4757" />
                      <Text style={styles.exerciseText}>{exercise}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </ScrollView>
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
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  cardTouchable: {
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff4757',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
    paddingBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#ccc',
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#252525',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  exercisesContainer: {
    padding: 16,
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
  },
  closeButton: {
    backgroundColor: '#ff4757',
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});