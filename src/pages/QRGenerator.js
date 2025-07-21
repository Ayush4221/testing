import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QRGenerator = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>QR Code Generator</Text>
            <Text style={styles.subtitle}>Coming Soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1F2937',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
});

export default QRGenerator; 