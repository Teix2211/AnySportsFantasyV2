import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SegmentedControl = ({ values, selectedIndex, onChange }) => {
  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.segment,
            selectedIndex === index && styles.selectedSegment
          ]}
          onPress={() => onChange(index)}
        >
          <Text
            style={[
              styles.segmentText,
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
    marginTop: 10,
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