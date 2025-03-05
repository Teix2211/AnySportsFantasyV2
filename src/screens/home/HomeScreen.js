import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestNews } from '../../store/actions';
import { fetchRaces } from '../../store/actions/raceActions';
import { fetchUserTeam } from '../../store/actions/teamActions';
import UpcomingRaceCard from '../../components/races/UpcomingRaceCard';
import NewsCard from '../../components/common/NewsCard';
import TeamSummaryCard from '../../components/teams/TeamSummaryCard';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { user } = useAuth();
  
  // Get data from Redux store
  const { upcomingRace, loading: racesLoading } = useSelector(state => state.races);
  const { news, loading: newsLoading } = useSelector(state => state.news || { news: [], loading: false });
  const { userTeam, loading: teamLoading } = useSelector(state => state.team);
  
  const [refreshing, setRefreshing] = React.useState(false);

  const loadData = useCallback(() => {
    dispatch(fetchRaces('2024'));
    dispatch(fetchLatestNews());
    dispatch(fetchUserTeam());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData, user?.id]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData]);

  if (racesLoading && newsLoading && teamLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          tintColor={theme.primary}
          colors={[theme.primary]}
        />
      }
    >
      <Text style={[styles.welcomeText, { color: theme.primary }]}>Fantasy F1</Text>
      
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Race</Text>
        <UpcomingRaceCard race={upcomingRace} />
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Team</Text>
        <TeamSummaryCard team={userTeam} />
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Latest News</Text>
        {news && news.length > 0 ? (
          news.slice(0, 3).map(item => (
            <NewsCard key={item.id} news={item} />
          ))
        ) : (
          <Text style={[styles.noDataText, { color: theme.textSecondary }]}>No news available</Text>
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