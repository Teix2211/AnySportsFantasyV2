import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRaces, setCurrentSeason } from '../../store/actions/raceActions';
import RaceCard from '../../components/races/RaceCard';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

// Sample mock data for F2, F3 races
const mockF2Races = [
  {
    id: 'f2-2024-01',
    name: 'Bahrain F2 Feature Race',
    circuit: 'Bahrain International Circuit',
    location: 'Sakhir, Bahrain',
    date: '2024-03-02T13:00:00Z',
    series: 'F2'
  },
  {
    id: 'f2-2024-02',
    name: 'Saudi Arabian F2 Feature Race',
    circuit: 'Jeddah Corniche Circuit',
    location: 'Jeddah, Saudi Arabia',
    date: '2024-03-09T15:00:00Z',
    series: 'F2'
  },
  {
    id: 'f2-2024-03',
    name: 'Australian F2 Feature Race',
    circuit: 'Albert Park Circuit',
    location: 'Melbourne, Australia',
    date: '2024-03-24T04:00:00Z',
    series: 'F2'
  }
];

const mockF3Races = [
  {
    id: 'f3-2024-01',
    name: 'Bahrain F3 Feature Race',
    circuit: 'Bahrain International Circuit',
    location: 'Sakhir, Bahrain',
    date: '2024-03-02T10:00:00Z',
    series: 'F3'
  },
  {
    id: 'f3-2024-02',
    name: 'Saudi Arabian F3 Feature Race',
    circuit: 'Jeddah Corniche Circuit',
    location: 'Jeddah, Saudi Arabia',
    date: '2024-03-09T12:00:00Z',
    series: 'F3'
  },
  {
    id: 'f3-2024-04',
    name: 'Imola F3 Feature Race',
    circuit: 'Autodromo Enzo e Dino Ferrari',
    location: 'Imola, Italy',
    date: '2024-05-19T08:30:00Z',
    series: 'F3'
  }
];

const RaceScheduleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  
  const { races, loading: racesLoading, currentSeason, availableSeasons } = useSelector(state => state.races);
  const { competitions } = useSelector(state => state.competitions);
  
  const [refreshing, setRefreshing] = useState(false);
  const [showSeasonPicker, setShowSeasonPicker] = useState(false);
  const [allRaces, setAllRaces] = useState([]);
  
  // Fetch F1 races from the API
  useEffect(() => {
    dispatch(fetchRaces(currentSeason));
  }, [currentSeason, dispatch]);
  
  // Combine races from all series
  useEffect(() => {
    if (races) {
      // Add series indicator to F1 races
      const f1Races = races.map(race => ({
        ...race,
        series: 'F1'
      }));
      
      // Combine all races and sort by date
      const combinedRaces = [...f1Races, ...mockF2Races, ...mockF3Races].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      
      setAllRaces(combinedRaces);
    }
  }, [races]);
  
  const handleSeasonChange = (season) => {
    dispatch(setCurrentSeason(season));
    setShowSeasonPicker(false);
  };
  
  const handleRacePress = (raceId) => {
    navigation.navigate('RaceDetail', { raceId });
  };
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchRaces(currentSeason));
    setTimeout(() => setRefreshing(false), 500);
  }, [currentSeason, dispatch]);
  
  if (racesLoading && !refreshing && allRaces.length === 0) {
    return <LoadingIndicator />;
  }
  
  // Split races into past, next, and upcoming
  const currentDate = new Date();
  const pastRaces = allRaces.filter(race => new Date(race.date) < currentDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const upcomingRaces = allRaces.filter(race => new Date(race.date) >= currentDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const nextRace = upcomingRaces.length > 0 ? [upcomingRaces[0]] : [];
  const futureRaces = upcomingRaces.slice(1);
  
  // Get series color
  const getSeriesColor = (series) => {
    switch(series) {
      case 'F1': return '#e10600'; // F1 red
      case 'F2': return '#0090d0'; // F2 blue
      case 'F3': return '#f8bc00'; // F3 yellow
      default: return '#777777';
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.seasonSelector, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={[styles.seasonButton, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f5f5f5' }]} 
          onPress={() => setShowSeasonPicker(!showSeasonPicker)}
        >
          <Text style={[styles.seasonText, { color: theme.text }]}>{currentSeason} Season</Text>
          <Icon name={showSeasonPicker ? "chevron-up" : "chevron-down"} size={16} color={isDarkMode ? '#fff' : '#333'} />
        </TouchableOpacity>
        
        {showSeasonPicker && (
          <View style={[styles.seasonPickerContainer, { 
            backgroundColor: theme.card, 
            borderColor: theme.border
          }]}>
            {availableSeasons.map(season => (
              <TouchableOpacity
                key={season}
                style={[
                  styles.seasonOption,
                  { borderBottomColor: theme.border },
                  currentSeason === season && {
                    backgroundColor: isDarkMode ? '#333' : '#f9f9f9'
                  }
                ]}
                onPress={() => handleSeasonChange(season)}
              >
                <Text style={[
                  styles.seasonOptionText, 
                  { color: theme.text },
                  currentSeason === season && {
                    fontWeight: 'bold',
                    color: theme.primary
                  }
                ]}>
                  {season}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.legendContainer}>
        <Text style={[styles.legendTitle, { color: theme.text }]}>Racing Series:</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.seriesIndicator, { backgroundColor: getSeriesColor('F1') }]} />
            <Text style={[styles.legendText, { color: theme.text }]}>Formula 1</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.seriesIndicator, { backgroundColor: getSeriesColor('F2') }]} />
            <Text style={[styles.legendText, { color: theme.text }]}>Formula 2</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.seriesIndicator, { backgroundColor: getSeriesColor('F3') }]} />
            <Text style={[styles.legendText, { color: theme.text }]}>Formula 3</Text>
          </View>
        </View>
      </View>
      
      {allRaces.length > 0 ? (
        <FlatList
          data={[
            { title: 'NEXT RACE', data: nextRace },
            { title: 'UPCOMING RACES', data: futureRaces },
            { title: 'COMPLETED RACES', data: pastRaces }
          ]}
          renderItem={({ item }) => (
            <>
              {item.data.length > 0 && (
                <>
                  <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>{item.title}</Text>
                  {item.data.map(race => (
                    <RaceCard 
                      key={race.id} 
                      race={race} 
                      seriesColor={getSeriesColor(race.series)}
                      onPress={() => handleRacePress(race.id)}
                    />
                  ))}
                </>
              )}
            </>
          )}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={['#e10600']}
              tintColor={theme.primary}
            />
          }
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={[styles.noDataText, { color: theme.textSecondary }]}>
            No race data available for this season
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
  seasonSelector: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 1,
  },
  seasonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  seasonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seasonPickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eee',
  },
  seasonOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  seasonOptionText: {
    fontSize: 14,
    color: '#333',
  },
  legendContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  seriesIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
  listContent: {
    padding: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#777',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5,
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

export default RaceScheduleScreen;