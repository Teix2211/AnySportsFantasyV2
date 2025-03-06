// src/components/constructors/ConstructorCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const ConstructorCard = ({ constructor, isSelected, onPress, onViewDetails }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.card,
          shadowColor: isDarkMode ? '#000' : '#000',
          shadowOpacity: isDarkMode ? 0.3 : 0.1
        },
        isSelected && [
          styles.selectedContainer,
          { borderColor: theme.primary }
        ]
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.colorStrip, { backgroundColor: constructor.color || '#e10600' }]} />
      
      <Image 
        source={{ uri: constructor.logoUrl || 'https://via.placeholder.com/60?text=F1' }} 
        style={styles.logo} 
      />
      
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.text }]}>
          {constructor.name}
        </Text>
        <Text style={[styles.drivers, { color: theme.textSecondary }]}>
          {constructor.drivers.join(' • ')}
        </Text>
        <View style={styles.statsRow}>
          <Text style={[styles.stat, { color: theme.textSecondary }]}>
            Points: {constructor.points}
          </Text>
          <Text style={[styles.stat, { color: theme.textSecondary }]}>
            Form: {constructor.form}/10
          </Text>
        </View>
      </View>
      
      <View style={styles.rightContainer}>
        <Text style={styles.price}>${constructor.price}M</Text>
        <TouchableOpacity 
          style={styles.detailsButton} 
          onPress={onViewDetails}
        >
          <Text style={styles.detailsText}>Details</Text>
          <Icon name="chevron-forward" size={16} color="#e10600" />
        </TouchableOpacity>
      </View>
      
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Icon name="checkmark-circle" size={24} color="#e10600" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden'
  },
  colorStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: '#e10600',
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: '#e10600',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: '#f5f5f5',
    resizeMode: 'contain'
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 5
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  drivers: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statsRow: {
    flexDirection: 'row',
  },
  stat: {
    fontSize: 12,
    color: '#888',
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e10600',
    marginBottom: 5,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 12,
    color: '#e10600',
    marginRight: 2,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default ConstructorCard;