// src/screens/leaderboard/CombinedLeaderboardScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../../store/actions/leaderboardActions';
import LeaderboardItem from '../../components/leaderboard/LeaderboardItem';
import PodiumView from '../../components/leaderboard/PodiumView';
import SegmentedControl from '../../components/common/SegmentedControl';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import CompetitionSelector from '../../components/competitions/CompetitionSelector';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const CombinedLeaderboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { user } = useAuth();
  const { leaderboard, loading, error } = useSelector(state => state.leaderboard);
  
  const [leaderboardType, setLeaderboardType] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [userRank, setUserRank] = useState(null);
  const [activeCompetition, setActiveCompetition] = useState(null);
  const [combinedLeaderboard, setCombinedLeaderboard] = useState([]);
  const [showTotalPoints, setShowTotalPoints] = useState(true);
  
  // Mapping segment index to leaderboard type
  const typeMapping = ['global', 'friends', 'leagues'];
  
  const loadData = useCallback(() => {
    const type = typeMapping[leaderboardType];
    dispatch(fetchLeaderboard(type));
  }, [dispatch, leaderboardType]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  // Simulate combined leaderboard data
  useEffect(() => {
    if (leaderboard && leaderboard.length > 0) {
      // Create a simulated combined leaderboard
      const combined = leaderboard.map(item => ({
        ...item,
        // Add points from other competitions (simulated)
        f1Points: item.points,
        f2Points: Math.floor(Math.random() * 200),
        f3Points: Math.floor(Math.random() * 150),
        indyPoints: Math.floor(Math.random() * 250),
        totalPoints: item.points + 
                     Math.floor(Math.random() * 200) + 
                     Math.floor(Math.random() * 150) + 
                     Math.floor(Math.random() * 250)
      }));
      
      // Sort by total points
      const sortedCombined = [...combined].sort((a, b) => b.totalPoints - a.totalPoints);
      
      setCombinedLeaderboard(sortedCombined);
      
      // Find user's rank in the combined leaderboard
      if (user) {
        const userEntry = sortedCombined.findIndex(item => item.owner === user.username);
        if (userEntry !== -1) {
          setUserRank(userEntry + 1);
        }
      }
    }
  }, [leaderboard, user]);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 1000);
  }, [loadData]);
  
  const handleCompetitionChange = (competition) => {
    setActiveCompetition(competition);
    setShowTotalPoints(competition.id === 'all');
  };
  
  const togglePointsView = () => {
    setShowTotalPoints(!showTotalPoints);
  };
  
  const renderItem = ({ item, index }) => (
    <LeaderboardItem 
      rank={index + 1}
      team={{
        ...item,
        points: showTotalPoints ? item.totalPoints : 
                (activeCompetition && activeCompetition.id === 'f2-2024') ? item.f2Points :
                (activeCompetition && activeCompetition.id === 'f3-2024') ? item.f3Points :
                (activeCompetition && activeCompetition.id === 'indy-2024') ? item.indyPoints :
                item.f1Points
      }}
    />
  );
  
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Leaderboard</Text>
      
      <CompetitionSelector 
        onSelectCompetition={handleCompetitionChange}
      />
      
      <TouchableOpacity 
        style={[styles.pointsToggle, {backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9'}]}
        onPress={togglePointsView}
      >
        <Text style={[styles.pointsToggleText, {color: theme.text}]}>
          {showTotalPoints ? 'Showing: Total Points' : `Showing: ${activeCompetition?.name || 'F1'} Points`}
        </Text>
        <Icon name="swap-vertical" size={18} color="#e10600" />
      </TouchableOpacity>
      
      <SegmentedControl
        values={['Global', 'Friends', 'Leagues']}
        selectedIndex={leaderboardType}
        onChange={(index) => setLeaderboardType(index)}
      />
      
      {userRank && (
        <View style={[styles.userRankCard, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9' }]}>
          <Icon name="trophy" size={20} color="#e10600" />
          <Text style={[styles.userRankText, { color: theme.text }]}>
            Your Rank: <Text style={styles.userRankValue}>#{userRank}</Text>
          </Text>
        </View>
      )}
    </View>
  );
  
  if (loading && !refreshing) {
    return <LoadingIndicator />;
  }
  
  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Icon name="alert-circle" size={40} color="#e10600" />
        <Text style={[styles.errorText, { color: theme.text }]}>
          Error loading leaderboard
        </Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={loadData}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const displayData = combinedLeaderboard.length > 0 ? combinedLeaderboard : leaderboard;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {renderHeader()}
      
      {displayData && displayData.length > 0 ? (
        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <>
              {displayData.length >= 3 && (
                <PodiumView top3Teams={displayData.slice(0, 3).map(team => ({
                  ...team,
                  points: showTotalPoints ? team.totalPoints : 
                          (activeCompetition && activeCompetition.id === 'f2-2024') ? team.f2Points :
                          (activeCompetition && activeCompetition.id === 'f3-2024') ? team.f3Points :
                          (activeCompetition && activeCompetition.id === 'indy-2024') ? team.indyPoints :
                          team.f1Points
                }))} />
              )}
              <View style={[styles.listHeader, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0' }]}>
                <Text style={[styles.rankHeader, { color: theme.textSecondary }]}>Rank</Text>
                <Text style={[styles.teamHeader, { color: theme.textSecondary }]}>Team</Text>
                <Text style={[styles.pointsHeader, { color: theme.textSecondary }]}>Points</Text>
              </View>
            </>
          )}
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
            No leaderboard data available
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
    padding: 15,
    backgroundColor: '#e10600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  pointsToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  pointsToggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  userRankCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  userRankText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
  userRankValue: {
    fontWeight: 'bold',
    color: '#e10600',
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
    width: 40,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  teamHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  pointsHeader: {
    width: 60,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'right',
    color: '#888',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#e10600',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CombinedLeaderboardScreen;