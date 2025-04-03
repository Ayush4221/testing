import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import api from '../services/api';
import SignupForm from '../components/SignupForm';
import TransactionPinForm from '../components/TransactionPinForm';

const Signup = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    login_pin: '',
    phone_number: '',
  });
  const [txnPin, setTxnPin] = useState('');

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleTxnPinChange = (value) => {
    setTxnPin(value);
  };

  const validateFirstStep = () => {
    if (!formData.name || !formData.password || !formData.login_pin || !formData.phone_number) {
      Alert.alert('Error', 'All fields are required.');
      return false;
    }
    if (formData.login_pin.length !== 4) {
      Alert.alert('Error', 'login_pin must be 4 digits.');
      return false;
    }
    if (formData.phone_number.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return false;
    }
    return true;
  };

  const validateSecondStep = () => {
    if (!txnPin) {
      Alert.alert('Error', 'Transaction PIN is required.');
      return false;
    }
    if (txnPin.length !== 4) {
      Alert.alert('Error', 'Transaction PIN must be 4 digits.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateFirstStep()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!validateSecondStep()) {
      return;
    }

    try {
      const signupData = {
        ...formData,
        txn_pin: txnPin
      };

      const response = await api.post('/auth/signup', signupData);

      if (response.status === 201) {
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
        onPress={() => step === 2 ? handleBack() : navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←  {step === 2 ? 'Back' : 'Cancel'}</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>Signup</Text>
        {step === 1 ? (
          <>
            <SignupForm formData={formData} handleChange={handleChange} />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TransactionPinForm txnPin={txnPin} handleChange={handleTxnPinChange} />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Complete Signup</Text>
            </TouchableOpacity>
          </>
        )}
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