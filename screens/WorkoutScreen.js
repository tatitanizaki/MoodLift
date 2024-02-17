// WorkoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function WorkoutScreen({ route }) {
  const { mood } = route.params;
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsCol = collection(db, 'workouts');
      const q = query(workoutsCol, where('mood', '==', mood));
      const querySnapshot = await getDocs(q);
      const fetchedWorkouts = [];
      querySnapshot.forEach((doc) => {
        fetchedWorkouts.push({ id: doc.id, ...doc.data() });
      });
  
      // Now select one workout randomly if any are found
      if (fetchedWorkouts.length > 0) {
        const randomIndex = Math.floor(Math.random() * fetchedWorkouts.length);
        setWorkout(fetchedWorkouts[randomIndex]); // Assuming you have a state variable set up to hold the selected workout
      }
    };
  
    fetchWorkouts();
  }, [mood]); // This dependency array ensures the effect runs again if mood changes
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          {/* Empty View to balance the title */}
          <View style={{ flex: 1 }}></View>
          <View style={styles.roundedShape}>
            <Text style={styles.appNameInsideShape}>MoodLift</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.version}>v1.0</Text>
        </View>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent} // Apply layout styles here
        >
          {workout ? ( // Assuming you are displaying only one workout based on the previous discussion
            <View key={workout.id} style={styles.workoutContainer}>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutDescription}>{workout.details}</Text>
              {/* Render movements */}
              <Text style={styles.workoutSectionTitle}>Movements</Text>
              {workout.movements.map((movement, index) => (
                <Text key={index} style={styles.workoutDescription}>
                  {movement.name} - {movement.reps}
                </Text>
              ))}
              {/* Render equipment */}
              <Text style={styles.workoutSectionTitle}>Equipment</Text>
              {workout.equipment.length > 0 ? workout.equipment.map((item, index) => (
                <Text key={index} style={styles.workoutDescription}>{item}</Text>
              )) : <Text style={styles.workoutDescription}>No equipment</Text>}
            </View>
          ) : <Text style={styles.workoutDescription}>Select a mood to see a workout.</Text>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#081638', 
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        width: '100%', // Ensure it stretches across the screen
        justifyContent: 'flex-start',
        alignItems: 'center', // Changed to center to match the content alignment
        padding: 20,
        backgroundColor: '#081638', 
      },
    scrollView: {
        width: '100%', // Ensure it stretches across the screen
      },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%',
      marginTop: 40,
      marginBottom: 5,
      position: 'relative',
    },
    appName: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
    },
    version: {
      fontSize: 16,
      color: '#fff',
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: [{ translateY: -8 }],
    },
    workoutContainer: {
        marginTop: 20,
        marginBottom: 20,
      },
    workoutTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
      },
    workoutDescription: {
        fontSize: 18,
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    roundedShape: {
      backgroundColor: '#8332ff',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 5,
      elevation: 5,
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
    },
    appNameInsideShape: {
      fontSize: 20,
      color: '#ffff',
      fontWeight: 'bold',
    },
    workoutSectionTitle: {
        fontSize:22,
        color: '#ffff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    scrollView:{
        flex: 1,
        backgroundColor: '#081638'
    },
    scrollViewContent: {
        alignItems: 'center', 
        paddingVertical: 20, 
    },
  });

export default WorkoutScreen;