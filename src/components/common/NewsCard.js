import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const NewsCard = ({ news }) => {
  const { theme, isDarkMode } = useTheme();
  
  if (!news) {
    return (
      <View style={[styles.container, { 
        backgroundColor: theme.card,
        shadowColor: isDarkMode ? '#000' : '#000',
        shadowOpacity: isDarkMode ? 0.3 : 0.1 
      }]}>
        <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>News item not available</Text>
      </View>
    );
  }
  
  return (
    <TouchableOpacity style={[styles.container, { 
      backgroundColor: theme.card,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.1 
    }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {news.title || "News Title"}
        </Text>
        <Text style={[styles.summary, { color: theme.textSecondary }]} numberOfLines={2}>
          {news.summary || "News summary will appear here."}
        </Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {news.date ? new Date(news.date).toLocaleDateString() : "Recent"}
        </Text>
      </View>
      
      {news.imageUrl ? (
        <Image source={{ uri: news.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' }]}>
          <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>Image</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 3,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  image: {
    flex: 1,
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  imagePlaceholder: {
    flex: 1,
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default NewsCard;