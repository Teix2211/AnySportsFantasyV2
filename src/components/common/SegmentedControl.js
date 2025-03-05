import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const SegmentedControl = ({ values, selectedIndex, onChange }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={[styles.container, { 
      backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0'
    }]}>
      {values.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            selectedIndex === index && [
              styles.selectedSegment,
              { backgroundColor: theme.primary }
            ]
          ]}
          onPress={() => onChange(index)}
        >
          <Text
            style={[
              styles.segmentText,
              { color: isDarkMode ? theme.textSecondary : '#333' },
              selectedIndex === index && styles.selectedSegmentText
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: '#e10600',
  },
  segmentText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSegmentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SegmentedControl;