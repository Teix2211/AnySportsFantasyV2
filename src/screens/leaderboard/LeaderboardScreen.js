// src/screens/leaderboard/LeaderboardScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  RefreshControl,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../../store/actions/leaderboardActions';
import LeaderboardItem from '../../components/leaderboard/LeaderboardItem';
import PodiumView from '../../components/leaderboard/PodiumView';
import SegmentedControl from '../../components/common/SegmentedControl';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const LeaderboardScreen = () => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { user } = useAuth();
  const { leaderboard, loading, error } = useSelector(state => state.leaderboard);
  const { competitions } = useSelector(state => state.competitions);
  
  const [leaderboardType, setLeaderboardType] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [userRank, setUserRank] = useState(null);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Set default competition when competitions are loaded
  useEffect(() => {
    if (competitions && competitions.length > 0 && !selectedCompetition) {
      const defaultComp = competitions.find(c => c.active) || competitions[0];
      setSelectedCompetition(defaultComp);
    }
  }, [competitions]);
  
  // Mapping segment index to leaderboard type
  const typeMapping = ['global', 'friends', 'leagues'];
  
  const loadData = useCallback(() => {
    const type = typeMapping[leaderboardType];
    dispatch(fetchLeaderboard(type));
  }, [dispatch, leaderboardType]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  // Find user's rank in the leaderboard
  useEffect(() => {
    if (leaderboard && user) {
      const userEntry = leaderboard.findIndex(item => item.owner === user.username);
      if (userEntry !== -1) {
        setUserRank(userEntry + 1);
      }
    }
  }, [leaderboard, user]);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 1000);
  }, [loadData]);
  
  const handleSelectCompetition = (competition) => {
    setSelectedCompetition(competition);
    setModalVisible(false);
  };
  
  const renderItem = ({ item, index }) => (
    <LeaderboardItem 
      rank={index + 1}
      team={item}
    />
  );
  
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Leaderboard</Text>
      
      {/* Competition selector button */}
      <TouchableOpacity 
        style={[styles.competitionSelector, { backgroundColor: isDarkMode ? '#222' : '#fff' }]} 
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.competitionInfo}>
          <Text style={[styles.competitionName, { color: theme.text }]}>
            {selectedCompetition ? selectedCompetition.name : 'Select Competition'}
          </Text>
          {selectedCompetition && (
            <Text style={[styles.competitionSeason, { color: theme.textSecondary }]}>
              {selectedCompetition.season} Season
            </Text>
          )}
        </View>
        <Icon name="chevron-down" size={20} color={isDarkMode ? '#fff' : '#333'} />
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
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {renderHeader()}
      
      {leaderboard && leaderboard.length > 0 ? (
        <FlatList
          data={leaderboard}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <>
              {leaderboard.length >= 3 && (
                <PodiumView top3Teams={leaderboard.slice(0, 3)} />
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

      {/* Competition selection modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Select Competition</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={competitions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.competitionItem,
                    { borderBottomColor: theme.border },
                    selectedCompetition?.id === item.id && 
                      { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }
                  ]}
                  onPress={() => handleSelectCompetition(item)}
                >
                  <Text style={[
                    styles.competitionItemName,
                    { color: theme.text },
                    selectedCompetition?.id === item.id && 
                      { fontWeight: 'bold', color: theme.primary }
                  ]}>
                    {item.name} {item.season}
                  </Text>
                  
                  {selectedCompetition?.id === item.id && (
                    <Icon name="checkmark-circle" size={20} color="#e10600" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
  competitionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  competitionSeason: {
    fontSize: 12,
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
  
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  competitionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  competitionItemName: {
    fontSize: 16,
  },
});

export default LeaderboardScreen;