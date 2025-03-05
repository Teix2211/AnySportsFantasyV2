import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, loading, error } = useAuth();
  const { theme, isDarkMode } = useTheme();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    // Validate form
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    
    const success = await register(username, email, password);
    
    if (!success && error) {
      Alert.alert('Registration Failed', error);
    } else if (success) {
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK' }
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#15151e' }]}>
        <Text style={styles.title}>Fantasy F1</Text>
        <Text style={styles.subtitle}>Create Account</Text>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={[styles.input, { 
              backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }]}
            placeholder="Username"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput 
            style={[styles.input, { 
              backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }]}
            placeholder="Email"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput 
            style={[styles.input, { 
              backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }]}
            placeholder="Password"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput 
            style={[styles.input, { 
              backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }]}
            placeholder="Confirm Password"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#15151e',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e10600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    color: '#000',
  },
  button: {
    backgroundColor: '#e10600',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default RegisterScreen;