import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

function WorkoutScreen({ route }) {
  const { mood } = route.params;
  const [workout, setWorkout] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsCol = collection(db, "workouts");
      const q = query(workoutsCol, where("mood", "==", mood));
      const querySnapshot = await getDocs(q);
      const fetchedWorkouts = [];
      querySnapshot.forEach((doc) => {
        fetchedWorkouts.push({ id: doc.id, ...doc.data() });
      });

      if (fetchedWorkouts.length > 0) {
        const randomIndex = Math.floor(Math.random() * fetchedWorkouts.length);
        setWorkout(fetchedWorkouts[randomIndex]);
      }
    };

    fetchWorkouts();
  }, [mood]);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timerOn && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn, timer]);

  const handleStartStop = () => {
    setTimerOn(!timerOn);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
                  {workout.equipment.length > 0
                    ? workout.equipment.join(" • ")
                    : "No equipment"}
                </Text>
              </View>
              {workout.movements.map((movement, index) => (
                <View key={index} style={styles.movementContainer}>
                  <Text style={styles.movementName}>{movement.name}</Text>
                  <Text style={styles.movementReps}>{movement.reps}</Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.workoutDescription}>
              Select a mood to see a workout.
            </Text>
          )}
          {timerOn ? (
            <View style={styles.timerDisplay}>
              <Text style={styles.timerText}>{timer}</Text>
              <TouchableOpacity
                onPress={handleStartStop}
                style={styles.stopButton}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleStartStop}
              style={styles.startButton}
            >
              <Text style={styles.buttonText}>Let's Go</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#081638",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    width: "100%",
  },
  workoutHeader: {
    backgroundColor: "#273864",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  workoutInfo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  movementContainer: {
    backgroundColor: "#273864",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  movementName: {
    fontSize: 18,
    color: "#fff",
    flex: 1,
  },
  movementReps: {
    fontSize: 18,
    color: "#fff",
  },
  workoutDescription: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    padding: 20,
  },
  timerDisplay: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  timerText: {
    fontSize: 48,
    color: "#fff",
  },
  startButton: {
    backgroundColor: "#8332ff",
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  stopButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  // Additional styles as needed
});

export default WorkoutScreen;
