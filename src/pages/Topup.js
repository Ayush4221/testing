import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import api from '../services/api';

const generateTransactionId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TXN${timestamp}${random}`;
};

const Topup = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [selectedAmount, setSelectedAmount] = useState(null);

  // Predefined amounts
  const amounts = [100, 200, 500, 1000];

  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       navigation.replace('Login');
  //     }
  //   }, [isAuthenticated]);

  const handleTopup = async () => {
    const valueToAdd = selectedAmount || parseFloat(amount);

    if (!valueToAdd || valueToAdd <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setLoading(true);
    try {
      const transaction_id = generateTransactionId(); // Generate custom transaction ID

      const response = await api.post('/balances/add_funds', {
        user_id: user.id,
        amount: valueToAdd,
        transaction_id: transaction_id
      });

      if (response.data.success) {
        Alert.alert(
          'Success',
          `Successfully added ₹${amount}`,
          [
            {
              text: 'OK',
              onPress: () => {
                setAmount('');
                navigation.navigate('Main');
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add funds');
    } finally {
      setLoading(false);
    }
  };

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(value.toString());
  };

  const handleCustomAmount = (text) => {
    setAmount(text);
    setSelectedAmount(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Money</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Amount selection */}
          <Text style={styles.sectionTitle}>Select Amount</Text>

          <View style={styles.amountGrid}>
            {amounts.map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.amountButton,
                  selectedAmount === value && styles.selectedAmount
                ]}
                onPress={() => handleAmountSelect(value)}
              >
                <Text
                  style={[
                    styles.amountButtonText,
                    selectedAmount === value && styles.selectedAmountText
                  ]}
                >
                  ₹{value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Or Enter Custom Amount</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.rupeesSymbol}>₹</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={handleCustomAmount}
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleTopup}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>
              {loading ? 'Processing...' : 'Add Money'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardContainer: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  cardImage: {
    height: 40,
    width: 120,
    marginBottom: 16,
    tintColor: '#FFFFFF',
  },
  balanceText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  amountButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedAmount: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  selectedAmountText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  rupeesSymbol: {
    fontSize: 18,
    color: '#1F2937',
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Topup;