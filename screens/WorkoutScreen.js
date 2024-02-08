// WorkoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function WorkoutScreen({ route }) {
  const { mood } = route.params;
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsCol = collection(db, 'workouts');
      const q = query(workoutsCol, where('mood', '==', mood));
      const querySnapshot = await getDocs(q);
      const fetchedWorkouts = [];
      querySnapshot.forEach((doc) => {
        fetchedWorkouts.push({ id: doc.id, ...doc.data() });
      });
      setWorkouts(fetchedWorkouts);
    };

    fetchWorkouts();
  }, [mood]);

  return (
    <ScrollView style={styles.container}>
      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <Text style={styles.workoutTitle}>{workout.title}</Text>
          <Text>{workout.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  workoutContainer: {
    marginBottom: 20,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutScreen;