import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TeamSummaryCard = ({ team }) => {
  const navigation = useNavigation();
  
  if (!team) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholderText}>
          You haven't created a team yet. Go to the Team section to create your dream team!
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('My Team')}
        >
          <Text style={styles.buttonText}>Create Team</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.teamName}>{team.name || "Your Team"}</Text>
        <Text style={styles.points}>{team.totalPoints || 0} PTS</Text>
      </View>
      
      <View style={styles.driversContainer}>
        {team.drivers && team.drivers.length > 0 ? (
          team.drivers.map((driver, index) => (
            <View key={index} style={styles.driverItem}>
              <View style={styles.driverCircle}>
                <Text style={styles.driverInitial}>
                  {driver.lastName ? driver.lastName.charAt(0) : "?"}
                </Text>
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{driver.lastName || "Driver"}</Text>
                <Text style={styles.driverTeam}>{driver.team || "Team"}</Text>
              </View>
              <Text style={styles.driverPoints}>{driver.points || 0} pts</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDriversText}>No drivers selected</Text>
        )}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Rank</Text>
          <Text style={styles.statValue}>#{team.rank || "-"}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Value</Text>
          <Text style={styles.statValue}>${team.totalValue || 0}M</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('My Team')}
        >
          <Text style={styles.viewText}>View Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#e10600',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e10600',
  },
  driversContainer: {
    marginBottom: 15,
  },
  driverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  driverInitial: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  driverTeam: {
    fontSize: 12,
    color: '#666',
  },
  driverPoints: {
    fontSize: 14,
    fontWeight: '500',
  },
  noDriversText: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TeamSummaryCard;