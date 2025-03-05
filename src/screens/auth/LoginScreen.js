import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const { theme, isDarkMode } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    const success = await login(email, password);
    
    if (!success && error) {
      Alert.alert('Login Failed', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#15151e' }]}>
      <Text style={styles.title}>Fantasy F1</Text>
      <Text style={styles.subtitle}>Login</Text>
      
      <View style={styles.inputContainer}>
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
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LoginScreen;