import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

const RaceCard = ({ race, onPress }) => {
  const raceDate = new Date(race.date);
  const isPastRace = raceDate < new Date();
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{format(raceDate, 'd')}</Text>
        <Text style={styles.month}>{format(raceDate, 'MMM')}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{race.name}</Text>
        <Text style={styles.circuit}>{race.circuit}</Text>
        <Text style={styles.location}>{race.location}</Text>
      </View>
      
      <View style={styles.statusContainer}>
        {isPastRace ? (
          <View style={styles.resultIndicator}>
            <Text style={styles.resultText}>Results</Text>
          </View>
        ) : (
          <View style={styles.upcomingIndicator}>
            <Text style={styles.upcomingText}>Upcoming</Text>
          </View>
        )}
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  month: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  circuit: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#888',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  resultIndicator: {
    backgroundColor: '#e10600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  resultText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  upcomingIndicator: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  upcomingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 24,
    color: '#ccc',
  },
});

export default RaceCard;