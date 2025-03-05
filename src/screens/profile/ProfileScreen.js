import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const { user, logout, updateProfile, loading } = useAuth();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    fullName: user?.fullName || '',
    email: user?.email || ''
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    dataUsage: false
  });

  // Load settings from storage on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('userSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    };
    
    loadSettings();
  }, []);

  // Save settings to storage
  const handleSettingChange = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };

  // Handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    if (!editedUser.username || !editedUser.email) {
      Alert.alert('Error', 'Username and email are required');
      return;
    }
    
    const success = await updateProfile(editedUser);
    
    if (success) {
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };

  // Render content based on editing state
  const renderContent = () => {
    if (isEditing) {
      return (
        <View style={[styles.editContainer, { backgroundColor: theme.card }]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Username</Text>
            <TextInput
              style={[styles.input, { 
                color: theme.text, 
                borderColor: theme.border,
                backgroundColor: isDarkMode ? '#2c2c2c' : '#fff' 
              }]}
              value={editedUser.username}
              onChangeText={(text) => setEditedUser({ ...editedUser, username: text })}
              placeholder="Username"
              placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Full Name</Text>
            <TextInput
              style={[styles.input, { 
                color: theme.text, 
                borderColor: theme.border,
                backgroundColor: isDarkMode ? '#2c2c2c' : '#fff' 
              }]}
              value={editedUser.fullName}
              onChangeText={(text) => setEditedUser({ ...editedUser, fullName: text })}
              placeholder="Full Name"
              placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Email</Text>
            <TextInput
              style={[styles.input, { 
                color: theme.text, 
                borderColor: theme.border,
                backgroundColor: isDarkMode ? '#2c2c2c' : '#fff' 
              }]}
              value={editedUser.email}
              onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
            />
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button, 
                styles.cancelButton, 
                { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }
              ]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={{ 
                fontWeight: 'bold',
                color: isDarkMode ? '#fff' : '#e10600' 
              }}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.logoutText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    
    return (
      <>
        <View style={[styles.statsContainer, { backgroundColor: theme.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.primary }]}>#{user?.rank || '-'}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Rank</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{user?.points || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{user?.leagues || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Leagues</Text>
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Settings</Text>
          
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: theme.border }]}
            onPress={handleEditProfile}
          >
            <Icon name="person-outline" size={20} color={isDarkMode ? '#aaa' : '#555'} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: theme.text }]}>Edit Profile</Text>
            <Icon name="chevron-forward" size={20} color={isDarkMode ? '#777' : '#ccc'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.border }]}>
            <Icon name="lock-closed-outline" size={20} color={isDarkMode ? '#aaa' : '#555'} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: theme.text }]}>Change Password</Text>
            <Icon name="chevron-forward" size={20} color={isDarkMode ? '#777' : '#ccc'} />
          </TouchableOpacity>
          
          <View style={[styles.menuItem, { borderBottomColor: theme.border }]}>
            <Icon name="notifications-outline" size={20} color={isDarkMode ? '#aaa' : '#555'} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: theme.text }]}>Notifications</Text>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => handleSettingChange('notifications', value)}
              trackColor={{ false: isDarkMode ? '#444' : '#d9d9d9', true: '#e1060088' }}
              thumbColor={settings.notifications ? '#e10600' : isDarkMode ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>App Settings</Text>
          
          <View style={[styles.menuItem, { borderBottomColor: theme.border }]}>
            <Icon name="moon-outline" size={20} color={isDarkMode ? '#aaa' : '#555'} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: theme.text }]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: isDarkMode ? '#444' : '#d9d9d9', true: '#e1060088' }}
              thumbColor={isDarkMode ? '#e10600' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.menuItem, { borderBottomColor: theme.border }]}>
            <Icon name="cellular-outline" size={20} color={isDarkMode ? '#aaa' : '#555'} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color: theme.text }]}>Reduce Data Usage</Text>
            <Switch
              value={settings.dataUsage}
              onValueChange={(value) => handleSettingChange('dataUsage', value)}
              trackColor={{ false: isDarkMode ? '#444' : '#d9d9d9', true: '#e1060088' }}
              thumbColor={settings.dataUsage ? '#e10600' : isDarkMode ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: theme.card }]}>
              <Text style={[styles.avatarText, { color: theme.primary }]}>
                {(user?.username || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          {!isEditing && (
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.username}>{user?.username || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>
      
      {renderContent()}
      
      {!isEditing && (
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="log-out-outline" size={20} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#e10600',
    paddingTop: 30,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e10600',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#e10600',
    borderWidth: 2,
    borderColor: '#fff',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#fff',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e10600',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e10600',
    margin: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#e10600',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
});

export default ProfileScreen;