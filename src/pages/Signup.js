import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    pin: '',
    phoneNumber: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.password || !formData.pin || !formData.phoneNumber) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (formData.pin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits.');
      return;
    }
    if (formData.phoneNumber.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }
    console.log('Form Data Submitted:', formData);
    // Add your signup logic here
    navigation.navigate('Home'); // Navigate to Home screen after signup
  };

  return (
    <View style={styles.container}>
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
            value={formData.phoneNumber}
            onChangeText={(value) => handleChange('phoneNumber', value)}
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
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
});

export default Signup;