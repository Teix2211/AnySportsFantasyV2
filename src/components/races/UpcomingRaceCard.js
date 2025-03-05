import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UpcomingRaceCard = ({ race }) => {
  const navigation = useNavigation();
  
  // If no race is provided, show placeholder
  if (!race) {
    return (
      <View style={styles.container}>
        <Text style={styles.noRaceText}>No upcoming race information available</Text>
      </View>
    );
  }
  
  const raceDate = race.date ? new Date(race.date) : new Date();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('RaceDetail', { raceId: race.id })}
    >
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{raceDate.getDate()}</Text>
        <Text style={styles.month}>{raceDate.toLocaleString('default', { month: 'short' })}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.raceName}>{race.name || "Grand Prix"}</Text>
        <Text style={styles.circuit}>{race.circuit || "Circuit"}</Text>
        <Text style={styles.countdown}>
          {race.daysUntil ? `${race.daysUntil} days to go` : "Coming soon"}
        </Text>
      </View>
      
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#e10600',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  day: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  month: {
    color: '#fff',
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
  },
  raceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  circuit: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  countdown: {
    fontSize: 12,
    color: '#e10600',
    fontWeight: '500',
  },
  arrowContainer: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#ccc',
  },
  noRaceText: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    padding: 10,
  },
});

export default UpcomingRaceCard;