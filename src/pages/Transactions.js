import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTransactions, setLoading, setError } from '../store/slices/transactionSlice';
import api from '../services/api';
import { generateShortUUID } from '../utils/uuid';

const dummyTransactions = [
  {
    uuid: generateShortUUID(),
    type: 'credit',
    amount: 1000,
    description: 'Salary Deposit',
    date: new Date().toISOString(),
  },
  {
    uuid: generateShortUUID(),
    type: 'debit',
    amount: 50,
    description: 'Grocery Shopping',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    uuid: generateShortUUID(),
    type: 'credit',
    amount: 200,
    description: 'Freelance Payment',
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    uuid: generateShortUUID(),
    type: 'debit',
    amount: 30,
    description: 'Netflix Subscription',
    date: new Date(Date.now() - 259200000).toISOString(),
  },
];

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => {
    console.log('Current Redux State:', state);
    return state.transactions;
  });

  useEffect(() => {
    console.log('Transactions component mounted');
    // Only load dummy data if there are no transactions
    if (!transactions || transactions.length === 0) {
      loadDummyData();
    } else {
      console.log('Using persisted transactions from Redux');
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      dispatch(setLoading(true));
      const response = await api.get('/transactions');
      dispatch(setTransactions(response.data));
    } catch (err) {
      console.log('API Error:', err);
      dispatch(setError(err.message));
    }
  };

  const loadDummyData = () => {
    console.log('Loading dummy data into Redux...');
    // Ensure each transaction has a UUID
    const transactionsWithUUID = dummyTransactions.map(transaction => ({
      ...transaction,
      uuid: transaction.uuid || generateShortUUID()
    }));
    dispatch(setTransactions(transactionsWithUUID));
    Alert.alert(
      "Data Loaded",
      "Transaction data has been loaded into Redux and will persist between sessions.",
      [{ text: "OK" }]
    );
  };

  const clearTransactions = () => {
    console.log('Clearing transactions from Redux...');
    dispatch(setTransactions([]));
    Alert.alert(
      "Data Cleared",
      "Transaction data has been cleared from Redux.",
      [{ text: "OK" }]
    );
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={[
          styles.transactionAmount,
          { color: item.type === 'credit' ? '#4CAF50' : '#F44336' }
        ]}>
          {item.type === 'credit' ? '+' : '-'}₹{item.amount}
        </Text>
      </View>
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.transactionId}>Transaction ID: {item.uuid}</Text>
    </View>
  );

  console.log('Current transactions:', transactions);
  console.log('Loading state:', loading);
  console.log('Error state:', error);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={loadDummyData}>
          <Text style={styles.buttonText}>Load Test Data</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={loadDummyData}>
            <Text style={styles.buttonText}>Load Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearTransactions}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.persistInfo}>
        This data is stored in Redux and will persist between sessions.
      </Text>
      {!transactions || transactions.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No transactions found</Text>
          <TouchableOpacity style={styles.button} onPress={loadDummyData}>
            <Text style={styles.buttonText}>Load Test Data</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.uuid}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  persistInfo: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  transactionId: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'monospace',
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  clearButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Transactions;