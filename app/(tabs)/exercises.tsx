import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id: number;
  name: string;
  userId: number;
  completed: boolean;
  image: string;
  description: string;
  series: string[];
}

const exerciseData = [
  {
    name: 'Développé couché',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    description: 'Exercice de base pour développer les pectoraux. Allongez-vous sur un banc plat, descendez la barre vers la poitrine et poussez.',
    series: ['4 séries de 8-12 répétitions', 'Repos de 90 secondes entre les séries', 'Charge: 60-80% du max']
  },
  {
    name: 'Squats',
    image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800',
    description: 'Exercice complet pour les jambes. Gardez le dos droit, descendez comme pour vous asseoir, puis remontez.',
    series: ['5 séries de 5-8 répétitions', 'Repos de 2 minutes entre les séries', 'Charge: 70-85% du max']
  },
  {
    name: 'Tractions',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800',
    description: 'Excellent exercice pour le dos. Saisissez la barre, tirez votre corps vers le haut jusqu\'à ce que votre menton dépasse la barre.',
    series: ['4 séries jusqu\'à l\'échec', 'Repos de 2 minutes entre les séries', 'Poids du corps']
  },
  {
    name: 'Soulevé de terre',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800',
    description: 'Exercice complet pour le dos et les jambes. Gardez le dos droit, poussez avec les jambes en tenant la barre.',
    series: ['3 séries de 6-8 répétitions', 'Repos de 3 minutes entre les séries', 'Charge: 70-80% du max']
  },
  {
    name: 'Pompes',
    image: 'https://images.unsplash.com/photo-1598971639058-b11fb6f4667a?w=800',
    description: 'Exercice classique pour les pectoraux et triceps. Maintenez une position planche et poussez.',
    series: ['4 séries de 15-20 répétitions', 'Repos de 60 secondes entre les séries', 'Poids du corps']
  },
  {
    name: 'Curl biceps',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
    description: 'Isolation des biceps. Gardez les coudes fixes et montez les haltères en contractant les biceps.',
    series: ['3 séries de 12-15 répétitions', 'Repos de 60 secondes entre les séries', 'Charge modérée']
  },
  {
    name: 'Extensions triceps',
    image: 'https://images.unsplash.com/photo-1598971639058-b11fb6f4667a?w=800',
    description: 'Isolation des triceps. Étendez les bras au-dessus de la tête avec un haltère ou une corde.',
    series: ['3 séries de 12-15 répétitions', 'Repos de 60 secondes', 'Charge légère à modérée']
  },
  {
    name: 'Crunchs',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800',
    description: 'Exercice d\'abdominaux. Contractez les abdominaux pour soulever les épaules du sol.',
    series: ['4 séries de 20-25 répétitions', 'Repos de 45 secondes entre les séries', 'Poids du corps']
  },
  {
    name: 'Fentes avant',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800',
    description: 'Excellent pour les quadriceps et les fessiers. Faites un grand pas en avant et descendez le genou arrière.',
    series: ['3 séries de 12 répétitions par jambe', 'Repos de 90 secondes', 'Poids du corps ou haltères']
  },
  {
    name: 'Rowing haltère',
    image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=800',
    description: 'Développe le dos et les biceps. Penchez-vous en avant et tirez l\'haltère vers la hanche.',
    series: ['4 séries de 10-12 répétitions', 'Repos de 90 secondes', 'Charge modérée à lourde']
  },
  {
    name: 'Élévations latérales',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800',
    description: 'Isole les deltoïdes. Levez les bras sur les côtés jusqu\'à l\'horizontale.',
    series: ['3 séries de 15-20 répétitions', 'Repos de 60 secondes', 'Charge légère']
  },
  {
    name: 'Dips',
    image: 'https://images.unsplash.com/photo-1598971639058-b11fb6f4667a?w=800',
    description: 'Pour les pectoraux et triceps. Descendez entre les barres puis poussez pour remonter.',
    series: ['3 séries de 8-12 répétitions', 'Repos de 90 secondes', 'Poids du corps']
  },
  {
    name: 'Leg press',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800',
    description: 'Machine pour les jambes. Poussez la plateforme en gardant le dos bien calé.',
    series: ['4 séries de 10-12 répétitions', 'Repos de 2 minutes', 'Charge: 70-80% du max']
  },
  {
    name: 'Pull-over',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    description: 'Étirement et renforcement du grand dorsal. Allongé, descendez l\'haltère derrière la tête.',
    series: ['3 séries de 12-15 répétitions', 'Repos de 90 secondes', 'Charge modérée']
  },
  {
    name: 'Gainage',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800',
    description: 'Renforce les abdominaux et le core. Maintenez la position de planche.',
    series: ['4 séries de 30-60 secondes', 'Repos de 45 secondes', 'Poids du corps']
  }
];

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15');
      const data = await response.json();
      const mappedData = data.map((item: any, index: number) => ({
        id: item.id,
        name: exerciseData[index].name,
        userId: item.userId,
        completed: item.completed,
        image: exerciseData[index].image,
        description: exerciseData[index].description,
        series: exerciseData[index].series
      }));
      setExercises(mappedData);
    } catch (error) {
      console.error('Erreur lors du chargement des exercices:', error);
    }
  };

  const toggleExercise = async (id: number) => {
    try {
      const exercise = exercises.find((e) => e.id === id);
      if (!exercise) return;

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: !exercise.completed,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        setExercises(exercises.map((e) =>
          e.id === id ? { ...e, completed: !e.completed } : e
        ));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'exercice:', error);
    }
  };

  const openExerciseModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => openExerciseModal(item)}
    >
      <Image source={{ uri: item.image }} style={styles.exerciseImage} />
      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => toggleExercise(item.id)}
          style={styles.checkButton}
        >
          <Ionicons
            name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={item.completed ? '#4cd137' : '#666'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
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
            {selectedExercise && (
              <>
                <Image
                  source={{ uri: selectedExercise.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedExercise.description}
                </Text>
                <View style={styles.seriesContainer}>
                  <Text style={styles.seriesTitle}>Programme recommandé:</Text>
                  {selectedExercise.series.map((serie, index) => (
                    <Text key={index} style={styles.seriesText}>
                      • {serie}
                    </Text>
                  ))}
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
  exerciseItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  exerciseImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  exerciseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  exerciseName: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    marginRight: 16,
  },
  checkButton: {
    padding: 4,
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
    maxHeight: '80%',
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
  seriesContainer: {
    padding: 16,
    backgroundColor: '#252525',
  },
  seriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  seriesText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
    lineHeight: 20,
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