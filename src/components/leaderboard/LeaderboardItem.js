import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const LeaderboardItem = ({ rank, team }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.card,
      borderBottomColor: theme.border
    }]}>
      <Text style={[styles.rank, { color: theme.text }]}>{rank}</Text>
      <View style={styles.teamInfo}>
        <Text style={[styles.teamName, { color: theme.text }]}>{team.name}</Text>
        <Text style={[styles.owner, { color: theme.textSecondary }]}>{team.owner}</Text>
      </View>
      <Text style={styles.points}>{team.points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  rank: {
    width: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500',
  },
  owner: {
    fontSize: 12,
    color: '#777',
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e10600',
    width: 60,
    textAlign: 'right',
  },
});

export default LeaderboardItem;