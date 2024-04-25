import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const initialLayout = { width: Dimensions.get("window").width };

const EquipmentTab = ({
  selectedEquipment,
  handleSelectEquipment,
  equipmentOptions,
}) => {
  return (
    <ScrollView style={styles.tabScene}>
      {equipmentOptions.map((equipment) => (
        <View key={equipment} style={styles.checkboxContainer}>
          <Checkbox
            status={selectedEquipment.has(equipment) ? "checked" : "unchecked"}
            onPress={() => handleSelectEquipment(equipment)}
          />
          <Text style={styles.label}>{equipment}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const SkillsTab = ({ selectedSkills, handleSelectSkill, skillsOptions }) => {
  return (
    <ScrollView style={styles.tabScene}>
      {skillsOptions.map((skill) => (
        <View key={skill} style={styles.checkboxContainer}>
          <Checkbox
            status={selectedSkills.has(skill) ? "checked" : "unchecked"}
            onPress={() => handleSelectSkill(skill)}
          />
          <Text style={styles.label}>{skill}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const SettingsScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "equipment", title: "Equipment" },
    { key: "skills", title: "Skills" },
  ]);

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
  ];

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

  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const skillsOptions = ["Squats", "Lunges", "Push-ups"];

  const handleSelectSkill = async (skill) => {
    const newSelection = new Set(selectedSkills); // Use the correct state variable name here
    if (newSelection.has(skill)) {
      newSelection.delete(skill);
    } else {
      newSelection.add(skill);
    }
    setSelectedSkills(newSelection);

    // Save the updated selections to local storage
    try {
      await AsyncStorage.setItem(
        "selectedSkills", // Make sure the key is consistent with the state variable name
        JSON.stringify([...newSelection])
      );
    } catch (error) {
      console.error("Failed to save skills settings.", error);
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "equipment":
        return (
          <EquipmentTab
            selectedEquipment={selectedEquipment}
            handleSelectEquipment={handleSelectEquipment}
            equipmentOptions={equipmentOptions}
          />
        );
      case "skills":
        return (
          <SkillsTab
            selectedSkills={selectedSkills}
            handleSelectSkill={handleSelectSkill}
            skillsOptions={skillsOptions}
          />
        );
      default:
        return null;
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
          <Text style={styles.title}>Workout Settings</Text>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => <TabBar {...props} style={styles.tabBar} />}
        />
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
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  tabBar: {
    backgroundColor: "#8332ff",
  },
  tabScene: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default SettingsScreen;
