import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RaceScheduleScreen from '../screens/race-schedule/RaceScheduleScreen';
import StandingsScreen from '../screens/race-schedule/StandingsScreen';
import SegmentedControl from '../components/common/SegmentedControl';
import { useTheme } from '../context/ThemeContext';

const RacesNavigator = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { theme, isDarkMode } = useTheme();

  const renderScreen = () => {
    switch (selectedTabIndex) {
      case 0:
        return <RaceScheduleScreen />;
      case 1:
        return <StandingsScreen />;
      default:
        return <RaceScheduleScreen />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>F1 Season</Text>
      </View>
      <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
        <SegmentedControl
          values={['Schedule', 'Standings']}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        />
      </View>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e10600',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default RacesNavigator;