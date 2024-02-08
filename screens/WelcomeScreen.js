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
        {/* Empty View to balance the title */}
        <View style={{ flex: 1 }}></View> 
        <Text style={styles.appName}>MoodLift</Text>
        <Text style={styles.version}>v1.0</Text>
        <View style={{ flex: 1 }}></View>
      </View>

      {/* Main Title */}
      <Text style={styles.mainTitle}>How is your vibe today?</Text>

      {/* Vibe Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('easy')}
        >
          <Text style={styles.buttonText}>Eh, I don't really feel like it today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('medium')}
        >
          <Text style={styles.buttonText}>Let's get this done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('hard')}
        >
          <Text style={styles.buttonText}>I want to feel the grasp of death upon me</Text>
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
    backgroundColor: '#021545', 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    marginTop: 40,
    position: 'relative',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  version: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute', // Position it absolutely
    right: 20, // Place it towards the right
    top: '50%', // Align vertically
    transform: [{ translateY: -8 }],
  },
  mainTitle: {
    fontSize: 36,
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
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#021545', // Adjust the color to match your theme
  },
  decorativeImage: {
    // Styles for your decorative images
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;

