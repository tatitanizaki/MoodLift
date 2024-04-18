import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { formatTime } from "../utils/formatTime";
import ConfettiCannon from "react-native-confetti-cannon";
import Icon from "react-native-vector-icons/MaterialIcons";

function WorkoutScreen({ route }) {
  const { mood } = route.params;
  const [workout, setWorkout] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const navigation = useNavigation();

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
        setTimer((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleStartStop = () => {
    if (!timerStarted) {
      // Only reset the timer and mark it as started if it's the very first start
      setTimer(0);
      setTimerStarted(true);
    }
    setTimerOn(!timerOn); // Toggle the timer on or off
  };

  const handleEndWorkout = () => {
    setTimerOn(false); // Stop the timer
    setWorkoutEnded(true); // Mark the workout as ended
    setShowConfetti(true); // Start the confetti animation
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          {/* <View style={{ flex: 1 }}></View> */}
          <View style={styles.roundedShape}>
            <Text style={styles.appNameInsideShape}>MoodLift</Text>
          </View>
          {/* <View style={{ flex: 1 }}></View> */}
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
          <TouchableOpacity
            onPress={handleStartStop}
            onLongPress={handleEndWorkout}
            style={styles.startButton}
          >
            <Text style={styles.buttonText}>
              {workoutEnded
                ? "Good Job!"
                : timerOn
                ? "Pause"
                : timerStarted
                ? "Resume"
                : "Let's Go"}
            </Text>
          </TouchableOpacity>
          {timerStarted && (
            <>
              {!workoutEnded && (
                <Text style={styles.holdToFinishText}>Hold to finish</Text>
              )}
              <View style={styles.timerDisplay}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
            </>
          )}
        </ScrollView>
        {showConfetti && (
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        )}
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
    width: "100%", // Ensure it stretches across the screen
    justifyContent: "flex-start",
    alignItems: "center", // Changed to center to match the content alignment
    padding: 20,
    backgroundColor: "#081638",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Adjust to center for main content
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    flex: 1, // Give flex space
    maxWidth: 50, // Limit width to ensure it doesn't push other elements excessively
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  roundedShape: {
    flex: 1, // Allow more space for the title to ensure it remains centered
    alignItems: "center",
    backgroundColor: "#8332ff",
    borderRadius: 20,
    // paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 75,
  },
  appNameInsideShape: {
    fontSize: 20,
    color: "#ffff",
    fontWeight: "bold",
  },
  version: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
    textAlign: "right",
    paddingRight: 10,
  },
  scrollView: {
    width: "100%",
  },
  workoutHeader: {
    backgroundColor: "#273864",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#273864",
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
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
  workoutSectionTitle: {
    fontSize: 22,
    color: "#ffff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  startButton: {
    backgroundColor: "#8332ff",
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  timerDisplay: {
    alignItems: "center",
    marginTop: 20,
  },
  timerText: {
    fontSize: 48,
    color: "#fff",
  },
  holdToFinishText: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
  },
});

export default WorkoutScreen;
