import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const PodiumView = ({ top3Teams }) => {
  const { theme, isDarkMode } = useTheme();
  
  if (!top3Teams || top3Teams.length < 3) return null;
  
  const [first, second, third] = top3Teams;
  
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
      {/* Second Place */}
      <View style={styles.podiumColumn}>
        <View style={[styles.avatarContainer, styles.silver]}>
          <Text style={styles.initials}>{getInitials(second.name)}</Text>
        </View>
        <View style={[styles.podiumBase, styles.secondPlace, { backgroundColor: isDarkMode ? '#444' : '#e0e0e0' }]}>
          <Text style={styles.position}>2</Text>
        </View>
        <Text style={[styles.teamName, { color: theme.text }]} numberOfLines={1}>
          {second.name}
        </Text>
        <Text style={styles.points}>{second.points}</Text>
      </View>
      
      {/* First Place */}
      <View style={styles.podiumColumn}>
        <View style={[styles.avatarContainer, styles.gold]}>
          <Text style={styles.initials}>{getInitials(first.name)}</Text>
        </View>
        <View style={[styles.podiumBase, styles.firstPlace, { backgroundColor: isDarkMode ? '#444' : '#e0e0e0' }]}>
          <Text style={styles.position}>1</Text>
        </View>
        <Text style={[styles.teamName, { color: theme.text }]} numberOfLines={1}>
          {first.name}
        </Text>
        <Text style={styles.points}>{first.points}</Text>
      </View>
      
      {/* Third Place */}
      <View style={styles.podiumColumn}>
        <View style={[styles.avatarContainer, styles.bronze]}>
          <Text style={styles.initials}>{getInitials(third.name)}</Text>
        </View>
        <View style={[styles.podiumBase, styles.thirdPlace, { backgroundColor: isDarkMode ? '#444' : '#e0e0e0' }]}>
          <Text style={styles.position}>3</Text>
        </View>
        <Text style={[styles.teamName, { color: theme.text }]} numberOfLines={1}>
          {third.name}
        </Text>
        <Text style={styles.points}>{third.points}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    paddingBottom: 5,
  },
  podiumColumn: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  gold: {
    backgroundColor: '#FFD700',
  },
  silver: {
    backgroundColor: '#C0C0C0',
  },
  bronze: {
    backgroundColor: '#CD7F32',
  },
  initials: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  podiumBase: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
  },
  firstPlace: {
    height: 80,
  },
  secondPlace: {
    height: 60,
  },
  thirdPlace: {
    height: 40,
  },
  position: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  teamName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
    width: 65,
  },
  points: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e10600',
  }
});

export default PodiumView;