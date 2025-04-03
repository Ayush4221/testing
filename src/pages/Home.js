import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import api from '../services/api';

const Home = ({ navigation }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log('user', user);

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        console.log(user.id);
        if (user?.id) {

          const response = await api.get(`balances/get_balance/${user.id}`);
          console.log('Balance response:', response.data);
          if (response.data.success) {
            setBalance(response.data.data.balance);
          }
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [user]);


  console.log('Balance:', balance);
  // Sample transaction data

  const transactions = [
    { id: 1, description: 'Grocery Shopping', amount: -50.0, date: '2025-04-01' },
    { id: 2, description: 'Salary', amount: 1500.0, date: '2025-03-30' },
    { id: 3, description: 'Electricity Bill', amount: -100.0, date: '2025-03-28' },
  ];

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../assets/langingpage/Logo.png')} style={styles.logo} />
      </View>

      {/* User Info & Balance */}
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.userName}>Hi, {user?.name}</Text>
          <Text style={styles.phoneNumber}>{user?.phone_number}</Text>
          <Text style={styles.balanceLabel}>Available Balance</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Text style={styles.balance}>
            ₹{balance?.toFixed(2) || '0.00'}
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Topup')}
        >
          <Text style={styles.buttonText}>Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('Withdraw')}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <View style={styles.transactions}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                transaction.amount < 0 ? styles.negativeAmount : styles.positiveAmount,
              ]}
            >
              {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    height: 40,
    resizeMode: 'contain',
  },
  userInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactions: {
    marginTop: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positiveAmount: {
    color: '#10B981',
  },
  negativeAmount: {
    color: '#EF4444',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;