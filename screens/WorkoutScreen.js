// WorkoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import StartButton from '../components/StartButton';


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
  
      if (fetchedWorkouts.length > 0) {
        const randomIndex = Math.floor(Math.random() * fetchedWorkouts.length);
        setWorkout(fetchedWorkouts[randomIndex]); // Assuming you have a state variable set up to hold the selected workout
      }
    };
  
    fetchWorkouts();
  }, [mood]); // This dependency array ensures the effect runs again if mood changes
  
  const handleStartPress = () => {
    console.log('Start button pressed!');
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={{ flex: 1 }}></View>
          <View style={styles.roundedShape}>
            <Text style={styles.appNameInsideShape}>MoodLift</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.version}>v1.0</Text>
        </View>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {workout ? (
            <>
              <View key={workout.id} style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutInfo}>{workout.duration} min</Text>
                <Text style={styles.workoutInfo}>{workout.details}</Text>
                <Text style={styles.workoutInfo}>
                  {workout.equipment.length > 0 ? workout.equipment.join(' • ') : 'No equipment'}
                </Text>                                 
              </View>
              {/* Render movements */}
                {workout.movements.map((movement, index) => (
                <View key={index} style={styles.movementContainer}>
                  <View style={styles.movementIcon}>
                    {/* Placeholder for movement icon */}
                  </View>
                  <Text style={styles.movementName}>{movement.name}</Text>
                  <Text style={styles.movementReps}>{movement.reps}</Text>
                </View> 
              ))}
            </>
          ) : (
            <Text style={styles.workoutDescription}>Select a mood to see a workout.</Text>
          )}
          <StartButton onPress={handleStartPress} />
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
    workoutHeader: {
        backgroundColor: '#273864',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    workoutTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        marginBottom: 10,
      },
    workoutDescription: {
        fontSize: 18,
        color: '#fff',
        marginTop: 20,
        textAlign: 'left',
    },
    workoutInfo: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
        marginBottom: 10,
      },
    movementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#273864',
        borderRadius: 15,
        padding: 16,
        marginBottom: 10,
      },
    movementName: {
        fontSize: 18,
        color: '#fff',
        flex: 1, 
      },
    movementReps: {
        fontSize: 18,
        color: '#fff',
      },
      equipmentContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginTop: 10, 
        marginBottom: 10, 
      },
      equipmentText: {
        fontSize: 16,
        color: '#fff',
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