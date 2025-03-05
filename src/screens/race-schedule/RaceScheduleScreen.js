import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRaceSchedule } from '../../store/actions';
import RaceCard from '../../components/races/RaceCard';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import SeasonSelector from '../../components/races/SeasonSelector';

const RaceScheduleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { races, loading } = useSelector(state => state.races);
  const [season, setSeason] = useState('2024');
  
  useEffect(() => {
    dispatch(fetchRaceSchedule(season));
  }, [season]);
  
  const handleRacePress = (raceId) => {
    navigation.navigate('RaceDetail', { raceId });
  };
  
  const renderItem = ({ item }) => (
    <RaceCard 
      race={item} 
      onPress={() => handleRacePress(item.id)}
    />
  );
  
  if (loading) {
    return <LoadingIndicator />;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.seasonSelector}>
        <Text style={styles.seasonLabel}>Season: {season}</Text>
      </View>
      
      {races && races.length > 0 ? (
        <FlatList
          data={races}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No race data available for this season</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  seasonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default RaceScheduleScreen;