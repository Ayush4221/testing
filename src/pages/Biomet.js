import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const Biometrics = ({ navigation }) => {
  const [pin, setPin] = useState('');

  const handleButtonClick = (value) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      console.log('PIN Submitted:', pin);
      // Add your biometrics validation logic here
      Alert.alert('Success', 'PIN Submitted Successfully!');
      navigation.navigate('Home'); // Navigate to Home screen after successful PIN entry
    } else {
      Alert.alert('Error', 'Please enter a 4-digit PIN.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Enter Your PIN</Text>
        {/* Display the PIN as dots */}
        <View style={styles.pinDisplay}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index < pin.length ? styles.filledDot : styles.emptyDot,
              ]}
            />
          ))}
        </View>
        {/* Custom Number Pad */}
        <View style={styles.numberPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '←'].map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={
                value === '←'
                  ? handleDelete
                  : value !== ''
                  ? () => handleButtonClick(value)
                  : null
              }
              style={[
                styles.numberButton,
                value === '←' ? styles.deleteButton : styles.defaultButton,
              ]}
              disabled={value === ''}
            >
              <Text
                style={[
                  styles.numberText,
                  value === '←' ? styles.deleteText : styles.defaultText,
                ]}
              >
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  filledDot: {
    backgroundColor: '#3B82F6',
  },
  emptyDot: {
    backgroundColor: '#D1D5DB',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  numberButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
  },
  defaultButton: {
    backgroundColor: '#E5E7EB',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  defaultText: {
    color: '#1F2937',
  },
  deleteText: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Biometrics;