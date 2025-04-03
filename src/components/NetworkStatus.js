import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'react-native';

const NetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        const checkInitialConnection = async () => {
            const state = await NetInfo.fetch();
            setIsConnected(!!state.isConnected);
        };

        checkInitialConnection();

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(!!state.isConnected);

            // Pulse animation when connection status changes
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.4,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        });

        return () => unsubscribe();
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    backgroundColor: isConnected ? '#10B981' : '#EF4444',
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
        right: 20,
        width: 12,
        height: 12,
        borderRadius: 6,
        zIndex: 999,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default NetworkStatus;