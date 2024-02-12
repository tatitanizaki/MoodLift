import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar, Image } from 'react-native';
import vibeAnswers from '../assets/vibeAnswers.json';
import Svg, { Circle, Path } from 'react-native-svg';

const WelcomeScreen = ({ navigation }) => {
  // const currentDate = new Date().toDateString(); 
  // const greeting = 'Hello, Guillaume';
  const [questions, setQuestions] = useState({
    easy: '',
    medium: '',
    hard: ''
  });

  useEffect(() => {
    // Function to select a random question from each category
    const getRandomQuestions = () => {
      return {
        easy: vibeAnswers.easy[Math.floor(Math.random() * vibeAnswers.easy.length)],
        medium: vibeAnswers.medium[Math.floor(Math.random() * vibeAnswers.medium.length)],
        hard: vibeAnswers.hard[Math.floor(Math.random() * vibeAnswers.hard.length)]
      };
    };

    // Set the random questions when the component mounts
    setQuestions(getRandomQuestions());
  }, []);

  const handleVibeSelection = (vibe) => {
    navigation.navigate('Workout', { mood: vibe });
  };

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
            <Svg height="100" width="100" viewBox="0 0 100 100" style={styles.svgStyle}>
                <Circle cx="50" cy="50" r="50" fill="#9681ff" />
                {/* Eyes */}
                <Path 
                    d="M 35 45 Q 40 55 45 45" 
                    fill="none" 
                    stroke="#000381" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                />
                <Path 
                    d="M 55 45 Q 60 55 65 45" 
                    fill="none" 
                    stroke="#000381" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                />
                {/* Mouth */}
                <Path 
                    d="M 35 60 Q 50 70 65 60" 
                    fill="none" 
                    stroke="#000381" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                />
            </Svg>

            {/*<View style={styles.dateGreetingContainer}>
                <Text style={styles.dateText}>{currentDate}</Text>
                <Text style={styles.greetingText}>{greeting}</Text>
            </View> */}

      {/* Main Title */}
      <Text style={styles.mainTitle}>How is your vibe today?</Text>

      {/* Vibe Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('easy')}
        >
          <Text style={styles.buttonText}>{questions.easy}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('medium')}
        >
          <Text style={styles.buttonText}>{questions.medium}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVibeSelection('hard')}
        >
          <Text style={styles.buttonText}>{questions.hard}</Text>
        </TouchableOpacity>
      </View>

     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081638', // Or any other color you're using for the top bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#081638', 
  },
  svgStyle: {
    alignSelf: 'center', // This centers the SVG in its container
    marginTop: 40,
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
    position: 'absolute', // Position it absolutely
    right: 20, // Place it towards the right
    top: '50%', // Align vertically
    transform: [{ translateY: -8 }],
  },
  // dateGreetingContainer: {
  //  alignItems: 'left', 
  //  marginTop: 10,
  //  marginBottoms: 10, 
  //},
  //dateText: {
  //  fontSize: 16,
  //  color: '#fff',
  //},  
  //greetingText: {
  //  fontSize: 30,
  //  fontWeight: 'bold',
  //  color: '#fff',
  //}, 
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#273864', // Use a semi-transparent color or adjust as needed
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff', // Adjust the color to match your theme
  },
  decorativeImage: {
    // Styles for your decorative images
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  roundedShape: {
    backgroundColor: '#8332ff',
    borderRadius: 20, // Adjust this to get the roundness you desire
    paddingHorizontal: 15, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    // Add shadow or any other styling you desire to match your design
    elevation: 5, // This adds a shadow on Android
    shadowOpacity: 0.3, // This adds a shadow on iOS
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  appNameInsideShape: {
    fontSize: 20,
    color: '#ffff', // Set this to the color you want for the text
    fontWeight: 'bold',
    // Add any other text styling you desire
  },
});

export default WelcomeScreen;

