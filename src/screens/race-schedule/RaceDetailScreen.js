import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRaceResults } from '../../store/actions/raceActions';
import SegmentedControl from '../../components/common/SegmentedControl';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { useTheme } from '../../context/ThemeContext';

// Race Result Item component
const RaceResultItem = ({ item }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.resultItem}>
      <View style={styles.positionContainer}>
        <Text style={[styles.positionText, { color: theme.text }]}>{item.position}</Text>
      </View>
      <View style={styles.driverContainer}>
        <Text style={[styles.driverName, { color: theme.text }]}>
          {item.driver.firstName} {item.driver.lastName}
        </Text>
        <Text style={[styles.teamName, { color: theme.textSecondary }]}>{item.team}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, { color: theme.textSecondary }]}>{item.time}</Text>
        <Text style={styles.pointsText}>{item.points} pts</Text>
      </View>
    </View>
  );
};

const RaceDetailScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { races, raceResults, loading } = useSelector(state => state.races);
  const [activeTab, setActiveTab] = useState(0);
  
  // Get race ID from route params
  const raceId = route.params?.raceId;
  
  // Find the race in the races array
  const race = races.find(r => r.id === raceId);
  
  useEffect(() => {
    if (raceId) {
      dispatch(fetchRaceResults(raceId));
    }
  }, [raceId, dispatch]);
  
  if (loading || !race) {
    return <LoadingIndicator />;
  }
  
  const raceDate = new Date(race.date);
  const isPastRace = raceDate < new Date();

  // Render race info content
  const renderRaceInfo = () => (
    <>
      <View style={[styles.section, { 
        backgroundColor: theme.card,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOpacity: isDarkMode ? 0.3 : 0.1
      }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Circuit Information</Text>
        <Text style={[styles.circuitName, { color: theme.text }]}>{race.circuit}</Text>
        <Text style={[styles.location, { color: theme.textSecondary }]}>{race.location}</Text>
        
        {race.circuitInfo ? (
          <>
            <Text style={[styles.distance, { color: theme.textSecondary }]}>
              Length: {race.circuitInfo.length} km, Laps: {race.circuitInfo.laps}
            </Text>
            <Text style={[styles.lapRecord, { color: theme.textSecondary }]}>
              Lap Record: {race.circuitInfo.lapRecord}
            </Text>
          </>
        ) : (
          <Text style={[styles.distance, { color: theme.textSecondary }]}>
            Race Distance: {race.distance || "TBD"} km, Laps: {race.laps || "TBD"}
          </Text>
        )}
        
        <View style={[styles.circuitImagePlaceholder, { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' }]}>
          <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>Circuit Layout Image</Text>
        </View>
      </View>
      
      <View style={[styles.section, { 
        backgroundColor: theme.card,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOpacity: isDarkMode ? 0.3 : 0.1
      }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Schedule</Text>
        {race.sessions ? (
          race.sessions.map((session, index) => (
            <View key={index} style={[styles.scheduleItem, { borderBottomColor: theme.border }]}>
              <Text style={[styles.sessionName, { color: theme.text }]}>
                {session.type || session.name}
              </Text>
              <Text style={[styles.sessionTime, { color: theme.textSecondary }]}>
                {new Date(session.date || session.time).toLocaleString('default', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[styles.noDataText, { color: theme.textSecondary }]}>
            Schedule information not available
          </Text>
        )}
      </View>
    </>
  );

  // Render different content based on the active tab
  const renderContent = () => {
    if (!isPastRace || activeTab === 0) {
      return (
        <ScrollView style={{ backgroundColor: theme.background }}>
          {renderRaceInfo()}
        </ScrollView>
      );
    } else {
      return (
        <View style={[styles.resultsContainer, { backgroundColor: theme.background }]}>
          <View style={[styles.section, { 
            backgroundColor: theme.card,
            shadowColor: isDarkMode ? '#000' : '#000',
            shadowOpacity: isDarkMode ? 0.3 : 0.1 
          }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Race Results</Text>
            <View style={styles.resultsHeader}>
              <Text style={[styles.headerPos, { color: theme.textSecondary }]}>Pos</Text>
              <Text style={[styles.headerDriver, { color: theme.textSecondary }]}>Driver</Text>
              <Text style={[styles.headerTime, { color: theme.textSecondary }]}>Time/Gap</Text>
            </View>
            {raceResults.length > 0 ? (
              <FlatList
                data={raceResults}
                renderItem={({item}) => <RaceResultItem item={item} />}
                keyExtractor={(item) => `${item.position}`}
                ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.border }]} />}
              />
            ) : (
              <Text style={[styles.noDataText, { color: theme.textSecondary }]}>
                No results available yet
              </Text>
            )}
          </View>
        </View>
      );
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.raceName}>{race.name}</Text>
        <Text style={styles.raceDate}>{raceDate.toDateString()}</Text>
        
        {isPastRace && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
        )}
      </View>
      
      {isPastRace && (
        <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
          <SegmentedControl
            values={['Information', 'Results']}
            selectedIndex={activeTab}
            onChange={setActiveTab}
          />
        </View>
      )}
      
      {renderContent()}
    </View>
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
    position: 'relative',
  },
  raceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  raceDate: {
    fontSize: 16,
    color: '#fff',
  },
  statusBadge: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#e10600',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tabContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
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
    marginBottom: 5,
  },
  lapRecord: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
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
  resultsContainer: {
    flex: 1,
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
  noDataText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default RaceDetailScreen;