import React, { useState } from 'react';
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const StartButton = ({ onPress }) => {
    const [isPressed, setIsPressed] = useState(false);
    const animatedScale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.timing(animatedScale, {
            toValue: 0.6,
            duration: 150, // duration of the scale down animation
            useNativeDriver: true,
        }).start();
        setIsPressed(true);
    };

    const handlePressOut = () => {
        Animated.timing(animatedScale, {
            toValue: 1,
            duration: 150, // duration of the scale back animation
            useNativeDriver: true,
        }).start();
        setIsPressed(false);
    };

    const buttonStyles = {
        ...styles.button,
        transform: [{ scale: animatedScale }],
        backgroundColor: isPressed ? '#7a2bff' : '#8332ff',
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{ marginTop: 50, alignSelf: 'center' }}
        >
            <Animated.View style={buttonStyles}>
                <Text style={styles.buttonText}>Let's Go</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default StartButton;

