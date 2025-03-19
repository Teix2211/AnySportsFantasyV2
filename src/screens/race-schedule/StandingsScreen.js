import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Modal 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverStandings, fetchConstructorStandings } from '../../store/actions/raceActions';
import SegmentedControl from '../../components/common/SegmentedControl';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock standings data for F2, F3
const mockF2DriverStandings = [
  { position: 1, driver: { firstName: 'Theo', lastName: 'Pourchaire' }, team: 'ART Grand Prix', points: 180 },
  { position: 2, driver: { firstName: 'Frederik', lastName: 'Vesti' }, team: 'Prema Racing', points: 164 },
  { position: 3, driver: { firstName: 'Jack', lastName: 'Doohan' }, team: 'Virtuosi Racing', points: 148 }
];

const mockF2ConstructorStandings = [
  { position: 1, team: 'ART Grand Prix', points: 295 },
  { position: 2, team: 'Prema Racing', points: 240 },
  { position: 3, team: 'Virtuosi Racing', points: 190 }
];

const mockF3DriverStandings = [
  { position: 1, driver: { firstName: 'Gabriel', lastName: 'Bortoleto' }, team: 'Trident', points: 135 },
  { position: 2, driver: { firstName: 'Zak', lastName: 'O\'Sullivan' }, team: 'Prema Racing', points: 120 },
  { position: 3, driver: { firstName: 'Oliver', lastName: 'Goethe' }, team: 'Campos Racing', points: 96 }
];

const mockF3ConstructorStandings = [
  { position: 1, team: 'Trident', points: 220 },
  { position: 2, team: 'Prema Racing', points: 195 },
  { position: 3, team: 'Campos Racing', points: 150 }
];

const StandingsRow = ({ position, name, team, points }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.standingsRow}>
      <Text style={[styles.positionText, { color: theme.text }]}>{position}</Text>
      <View style={styles.nameContainer}>
        <Text style={[styles.nameText, { color: theme.text }]}>{name}</Text>
        {team && <Text style={[styles.teamText, { color: theme.textSecondary }]}>{team}</Text>}
      </View>
      <Text style={styles.pointsText}>{points}</Text>
    </View>
  );
};

const StandingsScreen = () => {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useTheme();
  const { driverStandings, constructorStandings, currentSeason } = useSelector(state => state.races);
  const { competitions } = useSelector(state => state.competitions);
  
  const [standingsType, setStandingsType] = useState(0); // 0 = drivers, 1 = constructors
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState({ id: 'f1-2024', name: 'Formula 1' });
  const [displayDriverStandings, setDisplayDriverStandings] = useState([]);
  const [displayConstructorStandings, setDisplayConstructorStandings] = useState([]);
  
  // Fetch standings data when competition changes
  useEffect(() => {
    setLoading(true);
    
    // Get standings based on selected competition
    switch (selectedCompetition.id) {
      case 'f1-2024':
        dispatch(fetchDriverStandings(currentSeason));
        dispatch(fetchConstructorStandings(currentSeason));
        break;
      case 'f2-2024':
        setDisplayDriverStandings(mockF2DriverStandings);
        setDisplayConstructorStandings(mockF2ConstructorStandings);
        break;
      case 'f3-2024':
        setDisplayDriverStandings(mockF3DriverStandings);
        setDisplayConstructorStandings(mockF3ConstructorStandings);
        break;
      default:
        dispatch(fetchDriverStandings(currentSeason));
        dispatch(fetchConstructorStandings(currentSeason));
    }
    
    setTimeout(() => setLoading(false), 500);
  }, [standingsType, currentSeason, dispatch, selectedCompetition]);
  
  // Update display standings when Redux state changes
  useEffect(() => {
    if (selectedCompetition.id === 'f1-2024') {
      setDisplayDriverStandings(driverStandings);
      setDisplayConstructorStandings(constructorStandings);
    }
  }, [driverStandings, constructorStandings, selectedCompetition]);
  
  const handleCompetitionSelect = (competition) => {
    setSelectedCompetition(competition);
    setModalVisible(false);
  };
  
  const renderDriverItem = ({ item }) => (
    <StandingsRow 
      position={item.position}
      name={`${item.driver.firstName} ${item.driver.lastName}`}
      team={item.team}
      points={item.points}
    />
  );
  
  const renderConstructorItem = ({ item }) => (
    <StandingsRow 
      position={item.position}
      name={item.team}
      points={item.points}
    />
  );
  
  const currentData = standingsType === 0 ? displayDriverStandings : displayConstructorStandings;
  
  if (loading) {
    return <LoadingIndicator />;
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Championship Standings</Text>
        
        {/* Competition Selector */}
        <TouchableOpacity 
          style={[styles.competitionSelector, { backgroundColor: isDarkMode ? '#2c2c2c' : '#fff' }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.competitionText, { color: theme.text }]}>
            {selectedCompetition.name}
          </Text>
          <Icon name="chevron-down" size={16} color={isDarkMode ? '#fff' : '#333'} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.segmentContainer, { backgroundColor: theme.card }]}>
        <SegmentedControl
          values={['Drivers', 'Constructors']}
          selectedIndex={standingsType}
          onChange={setStandingsType}
        />
      </View>
      
      {currentData && currentData.length > 0 ? (
        <FlatList
          data={currentData}
          renderItem={standingsType === 0 ? renderDriverItem : renderConstructorItem}
          keyExtractor={(item) => `${item.position}`}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <View style={[styles.listHeader, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0' }]}>
              <Text style={[styles.headerPos, { color: theme.textSecondary }]}>Pos</Text>
              <Text style={[styles.headerName, { color: theme.textSecondary }]}>
                {standingsType === 0 ? 'Driver' : 'Constructor'}
              </Text>
              <Text style={[styles.headerPoints, { color: theme.textSecondary }]}>Points</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.border }]} />}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={[styles.noDataText, { color: theme.textSecondary }]}>
            No {standingsType === 0 ? 'driver' : 'constructor'} standings available
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
              data={competitions || [
                { id: 'f1-2024', name: 'Formula 1' },
                { id: 'f2-2024', name: 'Formula 2' },
                { id: 'f3-2024', name: 'Formula 3' }
              ]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.competitionItem,
                    { borderBottomColor: theme.border },
                    selectedCompetition?.id === item.id && 
                      { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }
                  ]}
                  onPress={() => handleCompetitionSelect(item)}
                >
                  <Text style={[
                    styles.competitionItemName,
                    { color: theme.text },
                    selectedCompetition?.id === item.id && 
                      { fontWeight: 'bold', color: theme.primary }
                  ]}>
                    {item.name}
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
    backgroundColor: '#e10600',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  competitionSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  competitionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  segmentContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  headerPos: {
    width: 40,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  headerName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  headerPoints: {
    width: 60,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  standingsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  positionText: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
  },
  teamText: {
    fontSize: 12,
    color: '#666',
  },
  pointsText: {
    width: 60,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e10600',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
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

export default StandingsScreen;