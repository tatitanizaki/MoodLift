import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleVibeSelection = (vibe) => {
    // TODO: Navigation logic
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>MoodLift</Text>
        <Text style={styles.version}>v1.0</Text>
      </View>

      {/* Main Title */}
      <Text style={styles.mainTitle}>How is your vibe today?</Text>

      {/* Vibe Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('easy')}
        >
          <Text style={styles.buttonText}>Answer 1: Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('medium')}
        >
          <Text style={styles.buttonText}>Answer 2: Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('hard')}
        >
          <Text style={styles.buttonText}>Answer 3: Hard</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6200EE', // Set your preferred solid background color here
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  version: {
    fontSize: 16,
    color: '#fff',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#fff', // Use a semi-transparent color or adjust as needed
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#purpleDark', // Adjust the color to match your theme
  },
  decorativeImage: {
    // Styles for your decorative images
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;

