import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingRace, fetchLatestNews, fetchUserTeam } from '../../store/actions';
import UpcomingRaceCard from '../../components/races/UpcomingRaceCard';
import NewsCard from '../../components/common/NewsCard';
import TeamSummaryCard from '../../components/teams/TeamSummaryCard';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const HomeScreen = () => {
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const upcomingRace = useSelector(state => state.races?.upcomingRace);
  const news = useSelector(state => state.news?.news);
  const userTeam = useSelector(state => state.team?.userTeam);
  
  // Loading states
  const racesLoading = useSelector(state => state.races?.loading);
  const newsLoading = useSelector(state => state.news?.loading);
  const teamLoading = useSelector(state => state.team?.loading);
  
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(fetchUpcomingRace());
    dispatch(fetchLatestNews());
    dispatch(fetchUserTeam());
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, []);

  if (racesLoading && newsLoading && teamLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.welcomeText}>Fantasy F1</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Race</Text>
        <UpcomingRaceCard race={upcomingRace} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Team</Text>
        <TeamSummaryCard team={userTeam} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        {news && news.length > 0 ? (
          news.slice(0, 3).map(item => (
            <NewsCard key={item.id} news={item} />
          ))
        ) : (
          <Text style={styles.noDataText}>No news available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e10600',
    padding: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  noDataText: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    padding: 10,
  },
});

export default HomeScreen;
