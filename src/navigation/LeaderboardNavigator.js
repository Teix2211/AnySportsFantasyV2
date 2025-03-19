// src/navigation/LeaderboardNavigator.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';
import TotalLeaderboardScreen from '../screens/leaderboard/TotalLeaderboardScreen';
import SegmentedControl from '../components/common/SegmentedControl';
import { useTheme } from '../context/ThemeContext';

const LeaderboardNavigator = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { theme, isDarkMode } = useTheme();

  const renderScreen = () => {
    switch (selectedTabIndex) {
      case 0:
        return <TotalLeaderboardScreen />;
      case 1:
        return <LeaderboardScreen />;
      default:
        return <TotalLeaderboardScreen />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboards</Text>
      </View>
      <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
        <SegmentedControl
          values={['Total Points', 'By Competition']}
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

export default LeaderboardNavigator;