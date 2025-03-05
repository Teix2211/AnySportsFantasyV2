// src/components/team-selection/TeamBudgetBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TeamBudgetBar = ({ budget, maxBudget, driverCount, maxDrivers }) => {
  const budgetPercentage = ((maxBudget - budget) / maxBudget) * 100;
  
  // Determine color based on remaining budget
  const getBudgetColor = () => {
    if (budgetPercentage > 90) return '#ff3b30'; // Red when almost out of budget
    if (budgetPercentage > 75) return '#ff9500'; // Orange when budget getting low
    return '#4cd964'; // Green when plenty of budget
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Text style={styles.budgetText}>
          Budget: <Text style={styles.valueText}>${budget}M</Text>
        </Text>
        <Text style={styles.driversText}>
          Drivers: <Text style={styles.valueText}>{driverCount}/{maxDrivers}</Text>
        </Text>
      </View>
      
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.budgetBar, 
            { width: `${budgetPercentage}%`, backgroundColor: getBudgetColor() }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  budgetText: {
    fontSize: 16,
    color: '#333',
  },
  driversText: {
    fontSize: 16,
    color: '#333',
  },
  valueText: {
    fontWeight: 'bold',
    color: '#e10600',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  budgetBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default TeamBudgetBar;