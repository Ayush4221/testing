import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SignupForm = ({ formData, handleChange }) => {
    return (
        <View style={styles.container}>
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
                    value={formData.login_pin}
                    onChangeText={(value) => handleChange('login_pin', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    keyboardType="numeric"
                    maxLength={10}
                    value={formData.phone_number}
                    onChangeText={(value) => handleChange('phone_number', value)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
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

export default SignupForm; 