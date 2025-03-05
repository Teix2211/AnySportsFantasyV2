import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RaceDetailScreen = ({ route }) => {
  // In a real app, you would use the route.params.raceId to fetch race details
  const raceId = route.params?.raceId;
  
  // Placeholder race data
  const race = {
    id: raceId || 1,
    name: 'Bahrain Grand Prix',
    date: new Date(2024, 2, 2),
    circuit: 'Bahrain International Circuit',
    location: 'Sakhir, Bahrain',
    laps: 57,
    distance: 308.238,
    sessions: [
      { name: 'Practice 1', time: '2024-03-01T12:30:00Z' },
      { name: 'Practice 2', time: '2024-03-01T16:00:00Z' },
      { name: 'Practice 3', time: '2024-03-02T13:30:00Z' },
      { name: 'Qualifying', time: '2024-03-02T17:00:00Z' },
      { name: 'Race', time: '2024-03-03T15:00:00Z' },
    ]
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.raceName}>{race.name}</Text>
        <Text style={styles.raceDate}>{race.date.toDateString()}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Circuit Information</Text>
        <Text style={styles.circuitName}>{race.circuit}</Text>
        <Text style={styles.location}>{race.location}</Text>
        <Text style={styles.distance}>Distance: {race.distance} km, Laps: {race.laps}</Text>
        
        <View style={styles.circuitImagePlaceholder}>
          <Text style={styles.placeholderText}>Circuit Layout Image</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        {race.sessions.map((session, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.sessionName}>{session.name}</Text>
            <Text style={styles.sessionTime}>
              {new Date(session.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#e10600',
    alignItems: 'center',
  },
  raceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  raceDate: {
    fontSize: 16,
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  circuitName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  distance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  circuitImagePlaceholder: {
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontStyle: 'italic',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sessionName: {
    fontSize: 14,
    fontWeight: '500',
  },
  sessionTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default RaceDetailScreen;