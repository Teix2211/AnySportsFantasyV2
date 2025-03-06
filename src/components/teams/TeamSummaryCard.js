import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

const TeamSummaryCard = ({ team }) => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useTheme();
  
  if (!team) {
    return (
      <View style={[styles.container, { 
        backgroundColor: theme.card,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOpacity: isDarkMode ? 0.3 : 0.1 
      }]}>
        <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>
          You haven't created a team yet. Go to the Team section to create your dream team!
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('My Team')}
        >
          <Text style={styles.buttonText}>Create Team</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.card,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.1 
    }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.teamName, { color: theme.text }]}>{team.name || "Your Team"}</Text>
        <Text style={styles.points}>{team.totalPoints || 0} PTS</Text>
      </View>
      
      <View style={styles.driversContainer}>
        {team.drivers && team.drivers.length > 0 ? (
          team.drivers.map((driver, index) => (
            <View key={index} style={styles.driverItem}>
              <View style={[styles.driverCircle, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0' }]}>
                <Text style={[styles.driverInitial, { color: theme.text }]}>
                  {driver.lastName ? driver.lastName.charAt(0) : "?"}
                </Text>
              </View>
              <View style={styles.driverInfo}>
                <Text style={[styles.driverName, { color: theme.text }]}>{driver.lastName || "Driver"}</Text>
                <Text style={[styles.driverTeam, { color: theme.textSecondary }]}>{driver.team || "Team"}</Text>
              </View>
              <Text style={styles.driverPoints}>{driver.points || 0} pts</Text>
            </View>
          ))
        ) : (
          <Text style={[styles.noDriversText, { color: theme.textSecondary }]}>No drivers selected</Text>
        )}
      </View>
      
      {/* Constructor Section */}
      {team.constructor && (
        <View style={[styles.constructorSection, { borderTopColor: theme.border, borderBottomColor: theme.border }]}>
          <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Constructor</Text>
          <View style={styles.constructorItem}>
            {team.constructor.logoUrl ? (
              <Image source={{ uri: team.constructor.logoUrl }} style={styles.constructorLogo} />
            ) : (
              <View style={[styles.constructorLogoPlaceholder, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0' }]} />
            )}
            <View style={styles.constructorInfo}>
              <Text style={[styles.constructorName, { color: theme.text }]}>{team.constructor.name}</Text>
              <Text style={[styles.constructorDrivers, { color: theme.textSecondary }]}>
                {team.constructor.drivers ? team.constructor.drivers.join(' • ') : "Team"}
              </Text>
            </View>
            <Text style={styles.constructorPoints}>{team.constructor.points || 0} pts</Text>
          </View>
        </View>
      )}
      
      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Rank</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>#{team.rank || "-"}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Value</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>${team.totalValue || 0}M</Text>
        </View>
        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0' }]}
          onPress={() => navigation.navigate('My Team')}
        >
          <Text style={[styles.viewText, { color: isDarkMode ? theme.primary : '#333' }]}>View Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#e10600',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e10600',
  },
  driversContainer: {
    marginBottom: 15,
  },
  driverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  driverInitial: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  driverTeam: {
    fontSize: 12,
    color: '#666',
  },
  driverPoints: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e10600',
  },
  constructorSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 10,
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  constructorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  constructorLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  constructorLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  constructorInfo: {
    flex: 1,
  },
  constructorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  constructorDrivers: {
    fontSize: 12,
    color: '#666',
  },
  constructorPoints: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e10600',
  },
  noDriversText: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TeamSummaryCard;