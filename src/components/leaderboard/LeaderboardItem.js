import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const LeaderboardItem = ({ rank, team }) => {
  const { theme, isDarkMode } = useTheme();
  
  // Render position change indicator
  const renderPositionChange = () => {
    if (!team.change) return null;
    
    let iconName, color;
    
    if (team.change > 0) {
      iconName = 'arrow-up';
      color = '#4CAF50'; // Green
    } else if (team.change < 0) {
      iconName = 'arrow-down';
      color = '#F44336'; // Red
    } else {
      iconName = 'remove';
      color = '#607D8B'; // Blue grey
    }
    
    return (
      <View style={styles.changeContainer}>
        <Icon name={iconName} size={12} color={color} />
        <Text style={[styles.changeText, { color }]}>
          {Math.abs(team.change)}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.card,
      borderBottomColor: theme.border
    }]}>
      <View style={styles.rankContainer}>
        <Text style={[styles.rank, { color: theme.text }]}>{rank}</Text>
        {renderPositionChange()}
      </View>
      
      <View style={styles.teamInfo}>
        <Text style={[styles.teamName, { color: theme.text }]}>{team.name}</Text>
        <Text style={[styles.owner, { color: theme.textSecondary }]}>
          {team.owner} {team.members ? `(${team.members} members)` : ''}
        </Text>
      </View>
      
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{team.points}</Text>
        {team.isFriend && <Icon name="people" size={12} color="#e10600" style={styles.friendIcon} />}
      </View>
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
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 10,
    marginLeft: 1,
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
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e10600',
    width: 60,
    textAlign: 'right',
  },
  friendIcon: {
    marginLeft: 4,
  }
});

export default LeaderboardItem;