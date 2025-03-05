import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const RaceResults = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No results available yet</Text>
      </View>
    );
  }

  const renderResultItem = ({ item }) => (
    <View style={styles.resultItem}>
      <View style={styles.positionContainer}>
        <Text style={styles.positionText}>{item.position}</Text>
      </View>
      <View style={styles.driverContainer}>
        <Text style={styles.driverName}>{item.driver.firstName} {item.driver.lastName}</Text>
        <Text style={styles.teamName}>{item.team}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
        <Text style={styles.pointsText}>{item.points} pts</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.resultsHeader}>
        <Text style={styles.headerPos}>Pos</Text>
        <Text style={styles.headerDriver}>Driver</Text>
        <Text style={styles.headerTime}>Time/Gap</Text>
      </View>
      <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item) => `${item.position}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noDataText: {
    color: '#888',
    fontStyle: 'italic',
  },
  resultsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerPos: {
    width: 40,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  headerDriver: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  headerTime: {
    width: 80,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  resultItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  positionContainer: {
    width: 40,
    alignItems: 'center',
  },
  positionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverContainer: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '500',
  },
  teamName: {
    fontSize: 12,
    color: '#666',
  },
  timeContainer: {
    width: 80,
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#444',
  },
  pointsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e10600',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default RaceResults;