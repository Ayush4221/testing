import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTransactions, setLoading, setError } from '../store/slices/transactionSlice';
import api from '../services/api';

const dummyTransactions = [
    {
        id: 1,
        type: 'credit',
        amount: 1000,
        description: 'Salary Deposit',
        date: new Date().toISOString(),
    },
    {
        id: 2,
        type: 'debit',
        amount: 50,
        description: 'Grocery Shopping',
        date: new Date(Date.now() - 86400000).toISOString(), // yesterday
    },
    {
        id: 3,
        type: 'credit',
        amount: 200,
        description: 'Freelance Payment',
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
    {
        id: 4,
        type: 'debit',
        amount: 30,
        description: 'Netflix Subscription',
        date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
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
        // Load dummy data immediately for testing
        loadDummyData();
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
        console.log('Loading dummy data...');
        dispatch(setTransactions(dummyTransactions));
    };

    const renderTransaction = ({ item }) => (
        <View style={styles.transactionItem}>
            <View style={styles.transactionHeader}>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={[
                    styles.transactionAmount,
                    { color: item.type === 'credit' ? '#4CAF50' : '#F44336' }
                ]}>
                    {item.type === 'credit' ? '+' : '-'}${item.amount}
                </Text>
            </View>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
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
                <TouchableOpacity style={styles.button} onPress={loadDummyData}>
                    <Text style={styles.buttonText}>Load Test Data</Text>
                </TouchableOpacity>
            </View>
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
                    keyExtractor={(item) => item.id.toString()}
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Transactions; 