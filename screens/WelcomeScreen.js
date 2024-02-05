import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>How is your vibe today?</Text>
      <Button
        title="Feeling kinda lazy, let's just get over with this"
        onPress={() => navigation.navigate('Workout', { mood: 'easy' })}
      />
      <Button
        title="I came to pump, but let's not go too crazy"
        onPress={() => navigation.navigate('Workout', { mood: 'medium' })}
      />
      <Button
        title="I want to feel the grasp of death upon me"
        onPress={() => navigation.navigate('Workout', { mood: 'hard' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default WelcomeScreen;
