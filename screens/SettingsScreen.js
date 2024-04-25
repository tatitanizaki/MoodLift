import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SettingsScreen = ({ navigation }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(new Set());
  const equipmentOptions = [
    "Kettlebell",
    "Dumbbells",
    "Jump Rope",
    "Box",
    "Medicine Ball",
    "Pull-up Bar",
    "Barbell",
    "Weight Plates",
    "Agility Ladder",
    "Cones",
    "Balance Ball",
    "Mat",
  ]; // Define your equipment options

  useEffect(() => {
    // Load saved equipment selections from local storage on mount
    const loadSavedSettings = async () => {
      try {
        const savedEquipment = await AsyncStorage.getItem("selectedEquipment");
        if (savedEquipment) {
          setSelectedEquipment(new Set(JSON.parse(savedEquipment)));
        }
      } catch (error) {
        console.error("Failed to load equipment settings.", error);
      }
    };

    loadSavedSettings();
  }, []);

  const handleSelectEquipment = async (equipment) => {
    const newSelection = new Set(selectedEquipment);
    if (newSelection.has(equipment)) {
      newSelection.delete(equipment);
    } else {
      newSelection.add(equipment);
    }
    setSelectedEquipment(newSelection);

    // Save the updated selections to local storage
    try {
      await AsyncStorage.setItem(
        "selectedEquipment",
        JSON.stringify([...newSelection])
      );
    } catch (error) {
      console.error("Failed to save equipment settings.", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome5 name="arrow-left" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.roundedShape}>
            <Text style={styles.appNameInsideShape}>Workout Settings</Text>
          </View>
          {/* The extra View below keeps the title centered without introducing stray text */}
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Select equipment</Text>
            {equipmentOptions.map((equipment) => (
              <View key={equipment} style={styles.checkboxContainer}>
                <Checkbox
                  status={
                    selectedEquipment.has(equipment) ? "checked" : "unchecked"
                  }
                  onPress={() => handleSelectEquipment(equipment)}
                />
                <Text style={styles.equipmentLabel}>{equipment}</Text>
              </View>
            ))}
            {/* Add more UI components for other settings like skills */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#081638",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    marginTop: 50,
  },
  backButton: {
    // Define your back button styles here
  },
  roundedShape: {
    backgroundColor: "#8332ff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 2, // Flex is used to center the title
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    marginLeft: 80,
  },
  appNameInsideShape: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  content: {
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  equipmentLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#ffffff", // Or any other color suitable for your app design
  },
  sectionTitle: {
    fontSize: 18,
    color: "#ffffff", // Or any other color suitable for your app design
    marginBottom: 16,
  },
  // Add any additional styles that you need
});

export default SettingsScreen;
