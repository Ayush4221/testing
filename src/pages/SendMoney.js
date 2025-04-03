import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    SafeAreaView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const SendMoney = () => {
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.auth);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNumberPress = (num) => {
        if (amount.length < 10) {
            setAmount(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setAmount(prev => prev.slice(0, -1));
    };

    const handleClear = () => {
        setAmount('');
    };

    const handleSend = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        setLoading(true);
        try {
            // Add your API call here
            Alert.alert(
                'Success',
                `Successfully sent ₹${amount}`,
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
        } catch (error) {
            Alert.alert('Error', 'Failed to send money');
        } finally {
            setLoading(false);
        }
    };

    const renderNumpadButton = (num, onPress) => (
        <TouchableOpacity style={styles.numpadButton} onPress={onPress}>
            <Text style={styles.numpadText}>{num}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.senderInfo}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.senderName}>{user?.name || 'User'}</Text>
                </View>

                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        editable={false}
                        placeholder="0"
                        placeholderTextColor="#94A3B8"
                    />
                </View>

                <View style={styles.numpadContainer}>
                    <View style={styles.numpadRow}>
                        {renderNumpadButton('1', () => handleNumberPress('1'))}
                        {renderNumpadButton('2', () => handleNumberPress('2'))}
                        {renderNumpadButton('3', () => handleNumberPress('3'))}
                    </View>
                    <View style={styles.numpadRow}>
                        {renderNumpadButton('4', () => handleNumberPress('4'))}
                        {renderNumpadButton('5', () => handleNumberPress('5'))}
                        {renderNumpadButton('6', () => handleNumberPress('6'))}
                    </View>
                    <View style={styles.numpadRow}>
                        {renderNumpadButton('7', () => handleNumberPress('7'))}
                        {renderNumpadButton('8', () => handleNumberPress('8'))}
                        {renderNumpadButton('9', () => handleNumberPress('9'))}
                    </View>
                    <View style={styles.numpadRow}>
                        <TouchableOpacity style={styles.numpadButton} onPress={handleClear}>
                            <Text style={styles.numpadText}>C</Text>
                        </TouchableOpacity>
                        {renderNumpadButton('0', () => handleNumberPress('0'))}
                        <TouchableOpacity style={styles.numpadButton} onPress={handleDelete}>
                            <Icon name="backspace-outline" size={24} color="#64748B" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.sendButton, loading && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={['#6366F1', '#8B5CF6']}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.sendButtonText}>
                            {loading ? 'Processing...' : 'Send Money'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 20 : 12,
        paddingBottom: Platform.OS === 'ios' ? 90 : 80,
    },
    senderInfo: {
        alignItems: 'center',
        padding: 12,
        marginTop: 4,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        shadowColor: '#6366F1',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    senderName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 12,

    },
    currencySymbol: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
        marginRight: 6,
    },
    amountInput: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1E293B',
        minWidth: 160,
        textAlign: 'center',
    },
    numpadContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'flex-end',
        marginBottom: 12,
        // backgroundColor: '#fff',
        borderRadius: 16,

    },
    numpadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    numpadButton: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',

    },
    numpadText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1E293B',
    },
    sendButton: {
        padding: 12,
        marginHorizontal: 12,
        marginBottom: 20,
    },
    sendButtonDisabled: {
        opacity: 0.7,
    },
    gradientButton: {
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SendMoney;
