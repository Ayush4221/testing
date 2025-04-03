import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TransactionPinForm = ({ txnPin, handleChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Transaction PIN</Text>
            <Text style={styles.description}>
                Please set a 4-digit PIN that you'll use for all your transactions.
                This PIN will be required for any money transfers or withdrawals.
            </Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Transaction PIN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter 4-digit transaction PIN"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    value={txnPin}
                    onChangeText={(value) => handleChange(value)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 24,
        lineHeight: 20,
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
});

export default TransactionPinForm; 