import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../../store/actions';
import LeaderboardItem from '../../components/leaderboard/LeaderboardItem';
import SegmentedControl from '../../components/common/SegmentedControl';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const LeaderboardScreen = () => {
  const dispatch = useDispatch();
  const { leaderboard, loading } = useSelector(state => state.leaderboard);
  const [leaderboardType, setLeaderboardType] = useState(0);
  
  useEffect(() => {
    loadData();
  }, [leaderboardType]);
  
  const loadData = () => {
    const type = leaderboardType === 0 ? 'global' : leaderboardType === 1 ? 'friends' : 'leagues';
    dispatch(fetchLeaderboard(type));
  };
  
  const renderItem = ({ item, index }) => (
    <LeaderboardItem 
      rank={index + 1}
      team={item}
    />
  );
  
  if (loading) {
    return <LoadingIndicator />;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <SegmentedControl
          values={['Global', 'Friends', 'Leagues']}
          selectedIndex={leaderboardType}
          onChange={(index) => setLeaderboardType(index)}
        />
      </View>
      
      {leaderboard && leaderboard.length > 0 ? (
        <FlatList
          data={leaderboard}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <View style={styles.listHeader}>
              <Text style={styles.rankHeader}>Rank</Text>
              <Text style={styles.teamHeader}>Team</Text>
              <Text style={styles.pointsHeader}>Points</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No leaderboard data available</Text>
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
    padding: 15,
    backgroundColor: '#e10600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  listContent: {
    padding: 10,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rankHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  teamHeader: {
    flex: 4,
    fontWeight: 'bold',
  },
  pointsHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
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

export default LeaderboardScreen;