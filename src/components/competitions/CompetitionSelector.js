// src/components/competitions/CompetitionSelector.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Modal,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';

const competitionsData = [
  { 
    id: 'f1-2024',
    name: 'Formula 1',
    season: '2024',
    logo: 'https://via.placeholder.com/60?text=F1',
    active: true
  },
  { 
    id: 'f2-2024',
    name: 'Formula 2',
    season: '2024',
    logo: 'https://via.placeholder.com/60?text=F2',
    active: false
  },
  { 
    id: 'f3-2024',
    name: 'Formula 3',
    season: '2024',
    logo: 'https://via.placeholder.com/60?text=F3',
    active: false
  },
  { 
    id: 'fe-2024',
    name: 'Formula E',
    season: '2024',
    logo: 'https://via.placeholder.com/60?text=FE',
    active: false
  },
  { 
    id: 'indy-2024',
    name: 'IndyCar',
    season: '2024',
    logo: 'https://via.placeholder.com/60?text=INDY',
    active: false
  }
];

const CompetitionSelector = ({ onSelectCompetition }) => {
  const { theme, isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [competitions, setCompetitions] = useState(competitionsData);
  const [activeCompetition, setActiveCompetition] = useState(competitionsData.find(c => c.active));

  const handleSelect = (competition) => {
    setActiveCompetition(competition);
    
    // Update active states
    const updatedCompetitions = competitions.map(c => ({
      ...c,
      active: c.id === competition.id
    }));
    setCompetitions(updatedCompetitions);
    
    // Notify parent component
    if (onSelectCompetition) {
      onSelectCompetition(competition);
    }
    
    setModalVisible(false);
  };

  const renderCompetitionItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.competitionItem,
        { borderBottomColor: theme.border },
        item.id === activeCompetition.id && { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }
      ]}
      onPress={() => handleSelect(item)}
    >
      <Image source={{ uri: item.logo }} style={styles.competitionLogo} />
      <View style={styles.competitionInfo}>
        <Text style={[styles.competitionName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.competitionSeason, { color: theme.textSecondary }]}>{item.season} Season</Text>
      </View>
      {item.id === activeCompetition.id && (
        <Icon name="checkmark-circle" size={20} color="#e10600" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.selector, 
          { 
            backgroundColor: theme.card,
            borderColor: theme.border
          }
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Image source={{ uri: activeCompetition.logo }} style={styles.activeLogo} />
        <View style={styles.activeTextContainer}>
          <Text style={[styles.activeCompetitionName, { color: theme.text }]}>
            {activeCompetition.name}
          </Text>
          <Text style={[styles.activeCompetitionSeason, { color: theme.textSecondary }]}>
            {activeCompetition.season} Season
          </Text>
        </View>
        <Icon name="chevron-down" size={16} color={isDarkMode ? '#fff' : '#333'} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Select Competition</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={competitions}
              renderItem={renderCompetitionItem}
              keyExtractor={item => item.id}
              style={styles.competitionsList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  activeLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  activeTextContainer: {
    flex: 1,
  },
  activeCompetitionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeCompetitionSeason: {
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  competitionsList: {
    flex: 1,
  },
  competitionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  competitionLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  competitionSeason: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default CompetitionSelector;