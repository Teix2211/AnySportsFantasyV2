import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRaces, setCurrentSeason } from '../../store/actions/raceActions';
import RaceCard from '../../components/races/RaceCard';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const RaceScheduleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { races, loading, currentSeason, availableSeasons } = useSelector(state => state.races);
  const [showSeasonPicker, setShowSeasonPicker] = useState(false);
  
  useEffect(() => {
    dispatch(fetchRaces(currentSeason));
  }, [currentSeason, dispatch]);
  
  const handleRacePress = (raceId) => {
    navigation.navigate('RaceDetail', { raceId });
  };
  
  const handleSeasonChange = (season) => {
    dispatch(setCurrentSeason(season));
    setShowSeasonPicker(false);
  };
  
  if (loading) {
    return <LoadingIndicator />;
  }
  
  // Split races into past, next, and upcoming
  const currentDate = new Date();
  const pastRaces = races.filter(race => new Date(race.date) < currentDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const upcomingRaces = races.filter(race => new Date(race.date) >= currentDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const nextRace = upcomingRaces.length > 0 ? [upcomingRaces[0]] : [];
  const futureRaces = upcomingRaces.slice(1);
  
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
      
      {races.length > 0 ? (
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
                      onPress={() => handleRacePress(race.id)}
                    />
                  ))}
                </>
              )}
            </>
          )}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.listContent}
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