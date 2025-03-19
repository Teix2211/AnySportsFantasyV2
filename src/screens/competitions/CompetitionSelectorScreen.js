// src/screens/competitions/CompetitionSelectorScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompetitions, setActiveCompetition } from '../../store/actions/competitionActions';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const CompetitionSelectorScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { competitions, activeCompetition, loading, error } = useSelector(state => state.competitions);
  
  useEffect(() => {
    dispatch(fetchCompetitions());
  }, [dispatch]);
  
  const handleSelectCompetition = (competition) => {
    dispatch(setActiveCompetition(competition.id));
    
    // Show success confirmation
    Alert.alert(
      'Competition Selected',
      `You've selected ${competition.name} ${competition.season}. The Team and Race options are now available.`,
      [
        { 
          text: 'Go to My Team', 
          onPress: () => navigation.navigate('My Team')
        },
        {
          text: 'Stay Here',
          style: 'cancel'
        }
      ]
    );
  };
  
  const renderCompetitionItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.competitionCard, 
        { 
          backgroundColor: theme.card,
          borderColor: item.id === (activeCompetition?.id) ? theme.primary : theme.border 
        }
      ]}
      onPress={() => handleSelectCompetition(item)}
    >
      <Image source={{ uri: item.logo }} style={styles.competitionLogo} />
      
      <View style={styles.competitionInfo}>
        <Text style={[styles.competitionName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.competitionSeason, { color: theme.textSecondary }]}>{item.season} Season</Text>
        
        {/* Special Coming Soon badge for non-F1 competitions */}
        {item.id !== 'f1-2024' && (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        )}
      </View>
      
      <Icon name="chevron-forward" size={24} color={isDarkMode ? '#777' : '#ccc'} />
      
      {item.id === (activeCompetition?.id) && (
        <View style={styles.activeIndicator}>
          <Icon name="checkmark-circle" size={24} color="#e10600" />
        </View>
      )}
    </TouchableOpacity>
  );
  
  if (loading && competitions.length === 0) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#e10600" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading competitions...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Icon name="alert-circle" size={40} color="#e10600" />
        <Text style={[styles.errorText, { color: theme.text }]}>
          Error loading competitions
        </Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => dispatch(fetchCompetitions())}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Competition</Text>
      </View>
      
      {activeCompetition && (
        <View style={[styles.activeCompetitionBanner, {backgroundColor: theme.primary}]}>
          <Text style={styles.activeCompetitionText}>
            Current Competition: {activeCompetition.name} {activeCompetition.season}
          </Text>
        </View>
      )}
      
      <FlatList
        data={competitions}
        renderItem={renderCompetitionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Text style={[styles.introText, { color: theme.textSecondary }]}>
            Choose a racing series to create your fantasy team
          </Text>
        )}
      />
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
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  activeCompetitionBanner: {
    backgroundColor: '#2c2c2c',
    padding: 10,
    alignItems: 'center',
  },
  activeCompetitionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
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
  listContent: {
    padding: 15,
  },
  introText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  competitionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  competitionLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  competitionSeason: {
    fontSize: 14,
    color: '#666',
  },
  activeIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  comingSoonBadge: {
    backgroundColor: '#f0ad4e',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CompetitionSelectorScreen;