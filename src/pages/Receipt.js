import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const TransferReceiptScreen = ({ navigation }) => {
    // In a real app, these would come from your app state or route params
    const receiptData = {
        recipient: "Gauri Panchling",
        recipientCollege: "Cummins College",
        recipientId: "8590530XXX",
        amount: "₹150.00",
        time: "3:02 PM",
        date: "Today",
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f4f6fa" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transfer Receipt</Text>
            </View>

            {/* Receipt Card */}
            <View style={styles.receiptCard}>
                <View style={styles.cardContent}>
                    {/* Illustration */}
                    <Image
                        source={require('../assets/rec.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />

                    {/* Success Message */}
                    <Text style={styles.successTitle}>Transfer Success</Text>
                    <Text style={styles.successMessage}>
                        Your money has been successfully sent to {receiptData.recipient}
                    </Text>

                    {/* Divider with amount */}
                    <View style={styles.amountContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.amountLabel}>Total Transfer</Text>
                        <Text style={styles.amountValue}>{receiptData.amount}</Text>
                        <View style={styles.divider} />
                    </View>

                    {/* Recipient Details */}
                    <View style={styles.recipientSection}>
                        <Text style={styles.sectionTitle}>Recipient</Text>

                        <View style={styles.recipientDetails}>
                            <View style={styles.avatarContainer}>
                                <LinearGradient
                                    colors={['#6366F1', '#8B5CF6']}
                                    style={styles.avatar}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text style={styles.avatarText}>
                                        {receiptData.recipientCollege.charAt(0)}
                                    </Text>
                                </LinearGradient>
                            </View>

                            <View style={styles.recipientInfo}>
                                <Text style={styles.recipientName}>
                                    {receiptData.recipientCollege}
                                </Text>
                                <Text style={styles.recipientSubInfo}>
                                    {receiptData.recipientId} • {receiptData.time}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Done</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Transfer more money</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fa',
        paddingBottom: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 56,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
        color: '#333',
        fontFamily: 'System',
    },
    receiptCard: {
        margin: 12,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
        overflow: 'hidden',
    },
    cardContent: {
        padding: 16,
        alignItems: 'center',
    },
    illustration: {
        width: 100,
        height: 100,
        marginVertical: 8,
    },
    successTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        marginTop: 6,
        fontFamily: 'System',
    },
    successMessage: {
        fontSize: 13,
        color: '#666',
        marginTop: 6,
        textAlign: 'center',
        paddingHorizontal: 16,
        lineHeight: 18,
        fontFamily: 'System',
    },
    amountContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        width: '100%',
        marginVertical: 10,
    },
    amountLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
        fontFamily: 'System',
    },
    amountValue: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
        fontFamily: 'System',
    },
    recipientSection: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 13,
        color: '#666',
        marginBottom: 12,
        fontFamily: 'System',
    },
    recipientDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'System',
    },
    recipientInfo: {
        flex: 1,
    },
    recipientName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
        fontFamily: 'System',
    },
    recipientSubInfo: {
        fontSize: 12,
        color: '#666',
        marginTop: 3,
        fontFamily: 'System',
    },
    buttonsContainer: {
        padding: 12,
        marginTop: 'auto',
        marginBottom: 90,
    },
    primaryButton: {
        backgroundColor: '#000',
        borderRadius: 10,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'System',
    },
    secondaryButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#111',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'System',
    },
});

export default TransferReceiptScreen;