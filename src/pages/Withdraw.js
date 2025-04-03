import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

const WithdrawalScreen = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(null);
    const [userId, setUserId] = useState('');

    const navigation = useNavigation();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // Authentication check
    useEffect(() => {
        if (!isAuthenticated) {
            navigation.replace('Login');
        }
    }, [isAuthenticated, navigation]);

    // Define fetchBalance function outside useEffect
    const fetchBalance = async () => {
        try {
            if (user?.id) {
                setLoading(true);
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

    // Call fetchBalance when user changes
    useEffect(() => {
        if (user && user.id) {
            fetchBalance();
            setUserId(user.id);
        }
    }, [user]);

    const handleWithdrawal = async () => {
        // Basic validation
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Amount must be positive');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post(`balances/withdraw`, {
                user_id: user.id,
                amount: parseFloat(amount)
            });

            if (response.data.success) {
                Alert.alert(
                    'Success',
                    `Withdrawal of ₹${amount} successful. Your new balance is ₹${response.data.data.current_balance}`,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setAmount('');
                                navigation.navigate('Home');
                            }
                        }
                    ]
                );
                setBalance(response.data.data.current_balance);
            } else {
                Alert.alert('Error', response.data.message || 'Failed to process withdrawal');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error, please try again later');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Withdraw Funds</Text>

            {balance !== null && (
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Available Balance:</Text>
                    <Text style={styles.balanceAmount}>₹{balance.toFixed(2)}</Text>
                </View>
            )}

            <View style={styles.formGroup}>
                <Text style={styles.label}>Withdrawal Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    editable={!loading}
                />
            </View>

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleWithdrawal}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Withdraw</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
                Withdrawals are processed immediately. Please ensure you have sufficient balance.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    balanceContainer: {
        backgroundColor: '#f0f8ff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    balanceAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonDisabled: {
        backgroundColor: '#95a5a6',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#3498db',
        fontSize: 16,
    },
    disclaimer: {
        marginTop: 20,
        textAlign: 'center',
        color: '#7f8c8d',
        fontSize: 14,
    }
});

export default WithdrawalScreen;