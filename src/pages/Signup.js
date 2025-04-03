import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios'; // Import Axios
import api from '../sevices/api';
const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    pin: '',
    phone_number: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.password || !formData.pin || !formData.phone_number) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (formData.pin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits.');
      return;
    }
    if (formData.phone_number.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }
  // Remove the test API call and modify the handleSubmit function
try {
  const response = await api.post('/auth/signup', formData);
  
  if (response.status === 200) {
    Alert.alert('Success', 'Signup successful!');
    navigation.navigate('Home');
  } else {
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
} catch (error) {
  console.error('Signup Error:', error.response?.data || error.message);
  Alert.alert('Error', 'Failed to sign up. Please try again.');
}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←  Back</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>Signup</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>PIN</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a 4-digit PIN"
            keyboardType="numeric"
            maxLength={4}
            value={formData.pin}
            onChangeText={(value) => handleChange('pin', value)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            maxLength={10}
            value={formData.phone_number}
            onChangeText={(value) => handleChange('phone_number', value)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    padding: 24,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
   
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default Signup;