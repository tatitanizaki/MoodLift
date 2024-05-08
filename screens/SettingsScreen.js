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
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
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

  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const skillsOptions = ["Squats", "Lunges", "Push-ups"];

  useEffect(() => {
    const loadSavedSettings = async () => {
      try {
        const savedEquipment = await AsyncStorage.getItem("selectedEquipment");
        if (savedEquipment) {
          setSelectedEquipment(new Set(JSON.parse(savedEquipment)));
        }
        const savedSkills = await AsyncStorage.getItem("selectedSkills");
        if (savedSkills) {
          setSelectedSkills(new Set(JSON.parse(savedSkills)));
        }
      } catch (error) {
        console.error("Failed to load settings.", error);
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
    try {
      await AsyncStorage.setItem(
        "selectedEquipment",
        JSON.stringify([...newSelection])
      );
    } catch (error) {
      console.error("Failed to save equipment settings.", error);
    }
  };

  const handleSelectSkill = async (skill) => {
    const newSelection = new Set(selectedSkills);
    if (newSelection.has(skill)) {
      newSelection.delete(skill);
    } else {
      newSelection.add(skill);
    }
    setSelectedSkills(newSelection);
    try {
      await AsyncStorage.setItem(
        "selectedSkills",
        JSON.stringify([...newSelection])
      );
    } catch (error) {
      console.error("Failed to save skills settings.", error);
    }
  };

  const renderScene = SceneMap({
    equipment: () => (
      <View style={styles.tabContainer}>
        <EquipmentTab
          selectedEquipment={selectedEquipment}
          handleSelectEquipment={handleSelectEquipment}
          equipmentOptions={equipmentOptions}
        />
      </View>
    ),
    skills: () => (
      <View style={styles.tabContainer}>
        <SkillsTab
          selectedSkills={selectedSkills}
          handleSelectSkill={handleSelectSkill}
          skillsOptions={skillsOptions}
        />
      </View>
    ),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome6 name="arrow-left" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.roundedShape}>
              <Text style={styles.title}>Workout Settings</Text>
            </View>
          </View>
          <View style={{ width: 25 }} />
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={styles.tabView}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              labelStyle={styles.tabLabel}
              indicatorStyle={styles.tabIndicator}
              tabStyle={styles.tabStyle} // New style for the individual tab
              renderLabel={({ route, focused, color }) => (
                <View
                  style={[
                    styles.tabLabelContainer,
                    focused ? styles.tabLabelFocused : null,
                  ]}
                >
                  <Text style={[styles.tabLabelText, { color }]}>
                    {route.title}
                  </Text>
                </View>
              )}
            />
          )}
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
    backgroundColor: "#081638",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the title container
    width: "100%",
    paddingTop: 40,
    paddingBottom: 20,
    position: "relative", // Ensure absolute positioned elements are placed relative to this view
  },
  backButton: {
    position: "absolute", // Absolute position the back button
    left: 20, // Place it 20 pixels from the left
    zIndex: 10, // Make sure it's above the title container
  },
  scrollView: {
    width: "100%",
  },
  roundedShape: {
    backgroundColor: "#8332ff",
    borderRadius: 20,
    paddingHorizontal: 15, // Adjust padding as needed
    paddingVertical: 5,
    marginLeft: 25,
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
    color: "#ffffff",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  tabScene: {
    padding: 10,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: "#273864", // The color you want for the tab content
    borderRadius: 20, // Adjust the border radius as needed
    padding: 20, // Add padding to ensure content doesn't touch the edges
    marginTop: 10, // Add some space at the top for the rounded corners
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    color: "white",
  },
  movementContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#273864",
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  navTitleContainer: {
    flex: 1, // Take up available space
    justifyContent: "center", // Center content horizontally
    marginHorizontal: 50, // Provide space for the back button and potentially a right-side button
  },
  navTitle: {
    textAlign: "center", // Ensure text is centered
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingVertical: 5, // Provide vertical padding
  },
  tabView: {
    flex: 1,
    width: "100%",
  },
  tabBar: {
    backgroundColor: "#081638",
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    overflow: "hidden", // Prevent children from overlapping
  },
  tabLabel: {
    color: "#FFFFFF",
  },
  tabIndicator: {
    backgroundColor: "#FFFFFF",
  },
  tabLabelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: "#273864", // The color for the tab label container
    marginHorizontal: 4, // Optional: add some space between tabs
  },
  tabLabelFocused: {
    backgroundColor: "#6C5CE7", // Color for the focused tab
  },
  tabLabelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
