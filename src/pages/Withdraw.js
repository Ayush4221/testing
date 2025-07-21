import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

const generateTransactionId = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TXN${timestamp}${random}`;
};

const WithdrawalScreen = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);

    const navigation = useNavigation();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // Predefined amounts
    const getWithdrawalAmounts = () => {
        if (!balance) return [100, 200, 500, 1000];

        // Create amounts based on available balance
        const maxAmount = Math.floor(balance);
        if (maxAmount >= 1000) return [100, 200, 500, 1000];
        if (maxAmount >= 500) return [100, 200, 300, 500];
        if (maxAmount >= 200) return [50, 100, 150, 200];
        if (maxAmount >= 100) return [25, 50, 75, 100];
        return [Math.floor(maxAmount / 4), Math.floor(maxAmount / 2), Math.floor(maxAmount * 0.75), maxAmount];
    };

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
        }
    }, [user]);

    const handleAmountSelect = (value) => {
        setSelectedAmount(value);
        setAmount(value.toString());
    };

    const handleCustomAmount = (text) => {
        setAmount(text);
        setSelectedAmount(null);
    };

    const handleWithdrawal = async () => {
        const valueToWithdraw = selectedAmount || parseFloat(amount);

        if (!valueToWithdraw || valueToWithdraw <= 0) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        if (valueToWithdraw > balance) {
            Alert.alert('Error', 'Withdrawal amount exceeds available balance');
            return;
        }

        if (!user?.id) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        setLoading(true);
        try {
            const transaction_id = generateTransactionId();

            const response = await api.post('/balances/withdraw', {
                user_id: user.id,
                amount: valueToWithdraw,
                transaction_id: transaction_id
            });

            if (response.data.success) {
                // Navigate to receipt page with success
                navigation.navigate('Main');
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to withdraw funds');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header with back button and QR icon */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Withdraw Money</Text>
                        <TouchableOpacity
                            style={styles.qrButton}
                            onPress={() => navigation.navigate('QRGenerator')}
                        >
                            <Text style={styles.qrButtonText}>QR</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Amount selection */}
                    <Text style={styles.sectionTitle}>Select Amount</Text>

                    <View style={styles.amountGrid}>
                        {getWithdrawalAmounts().map((value) => (
                            <TouchableOpacity
                                key={value}
                                style={[
                                    styles.amountButton,
                                    selectedAmount === value && styles.selectedAmount,
                                    value > balance && styles.disabledAmount
                                ]}
                                onPress={() => handleAmountSelect(value)}
                                disabled={value > balance}
                            >
                                <Text
                                    style={[
                                        styles.amountButtonText,
                                        selectedAmount === value && styles.selectedAmountText,
                                        value > balance && styles.disabledAmountText
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
                        style={[styles.withdrawButton, loading && styles.buttonDisabled]}
                        onPress={handleWithdrawal}
                        disabled={loading || !balance || balance <= 0}
                    >
                        <Text style={styles.withdrawButtonText}>
                            {loading ? 'Processing...' : 'Withdraw Money'}
                        </Text>
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
    qrButton: {
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
    qrButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
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
    disabledAmount: {
        opacity: 0.5,
        backgroundColor: '#F3F4F6',
    },
    amountButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    selectedAmountText: {
        color: '#FFFFFF',
    },
    disabledAmountText: {
        color: '#9CA3AF',
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
    withdrawButton: {
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
    buttonDisabled: {
        backgroundColor: '#9CA3AF',
    },
    withdrawButtonText: {
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
    disclaimer: {
        marginTop: 16,
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 12,
        lineHeight: 16,
    }
});

export default WithdrawalScreen;