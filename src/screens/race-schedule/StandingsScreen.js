import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverStandings, fetchConstructorStandings } from '../../store/actions/raceActions';
import SegmentedControl from '../../components/common/SegmentedControl';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { useTheme } from '../../context/ThemeContext';

const StandingsRow = ({ position, name, team, points }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.standingsRow}>
      <Text style={[styles.positionText, { color: theme.text }]}>{position}</Text>
      <View style={styles.nameContainer}>
        <Text style={[styles.nameText, { color: theme.text }]}>{name}</Text>
        {team && <Text style={[styles.teamText, { color: theme.textSecondary }]}>{team}</Text>}
      </View>
      <Text style={styles.pointsText}>{points}</Text>
    </View>
  );
};

const StandingsScreen = () => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { driverStandings, constructorStandings, currentSeason, loading } = useSelector(state => state.races);
  const [standingsType, setStandingsType] = useState(0); // 0 = drivers, 1 = constructors
  
  useEffect(() => {
    if (standingsType === 0) {
      dispatch(fetchDriverStandings(currentSeason));
    } else {
      dispatch(fetchConstructorStandings(currentSeason));
    }
  }, [standingsType, currentSeason, dispatch]);
  
  if (loading) {
    return <LoadingIndicator />;
  }
  
  const renderDriverItem = ({ item }) => (
    <StandingsRow 
      position={item.position}
      name={`${item.driver.firstName} ${item.driver.lastName}`}
      team={item.team}
      points={item.points}
    />
  );
  
  const renderConstructorItem = ({ item }) => (
    <StandingsRow 
      position={item.position}
      name={item.team}
      points={item.points}
    />
  );
  
  const currentData = standingsType === 0 ? driverStandings : constructorStandings;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Championship Standings</Text>
        <Text style={styles.seasonText}>{currentSeason} Season</Text>
      </View>
      
      <View style={[styles.segmentContainer, { backgroundColor: theme.card }]}>
        <SegmentedControl
          values={['Drivers', 'Constructors']}
          selectedIndex={standingsType}
          onChange={setStandingsType}
        />
      </View>
      
      {currentData.length > 0 ? (
        <FlatList
          data={currentData}
          renderItem={standingsType === 0 ? renderDriverItem : renderConstructorItem}
          keyExtractor={(item) => `${item.position}`}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <View style={[styles.listHeader, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0' }]}>
              <Text style={[styles.headerPos, { color: theme.textSecondary }]}>Pos</Text>
              <Text style={[styles.headerName, { color: theme.textSecondary }]}>
                {standingsType === 0 ? 'Driver' : 'Constructor'}
              </Text>
              <Text style={[styles.headerPoints, { color: theme.textSecondary }]}>Points</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.border }]} />}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={[styles.noDataText, { color: theme.textSecondary }]}>
            No {standingsType === 0 ? 'driver' : 'constructor'} standings available for {currentSeason}
          </Text>
        </View>
      )}
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
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  seasonText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  segmentContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  headerPos: {
    width: 40,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  headerName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  headerPoints: {
    width: 60,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  standingsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  positionText: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
  },
  teamText: {
    fontSize: 12,
    color: '#666',
  },
  pointsText: {
    width: 60,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e10600',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default StandingsScreen;