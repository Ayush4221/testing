import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      if (user?.id) {
        setLoading(true);
        const response = await api.get(`/transactions/user/${user.id}`);
        if (response.data?.success && Array.isArray(response.data.data)) {
          setNotifications(response.data.data);
        } else {
          setNotifications([]);
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionColor = (type) => {
    return type === 'withdrawal' ? '#E11D48' : '#10B981';
  };

  const getTransactionIcon = (type) => {
    return type === 'withdrawal' ? 'arrow-down-bold-circle' : 'arrow-up-bold-circle';
  };

  const getTransactionGradient = (type) => {
    return type === 'withdrawal'
      ? ['rgba(225, 29, 72, 0.1)', 'rgba(225, 29, 72, 0.05)']
      : ['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)'];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const formatTransactionId = (id) => {
    if (id && id.length > 12) {
      return `${id.substring(0, 6)}...${id.substring(id.length - 6)}`;
    }
    return id;
  };

  const renderNotification = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        index === 0 && styles.firstItem
      ]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getTransactionGradient(item.type)}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.notificationContent}>
          <View style={[styles.iconContainer, { backgroundColor: getTransactionColor(item.type) + '15' }]}>
            <Icon
              name={getTransactionIcon(item.type)}
              size={28}
              color={getTransactionColor(item.type)}
            />
          </View>
          <View style={styles.notificationText}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionType}>
                {item.type === 'withdrawal' ? 'Withdrawal' : 'Deposit'}
              </Text>
              <Text style={[
                styles.amount,
                { color: getTransactionColor(item.type) }
              ]}>
                {item.type === 'withdrawal' ? '-' : '+'}₹{parseFloat(item.amount).toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionId}>
                ID: {formatTransactionId(item.transaction_id)}
              </Text>
              <Text style={styles.transactionTime}>
                {formatDate(item.created_at)}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="note-text-outline" size={80} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>No Transactions Yet</Text>
      <Text style={styles.emptyDescription}>Your transaction history will appear here</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <LinearGradient
        colors={['#F1F5F9', '#F8FAFC']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transaction History</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchNotifications}
            activeOpacity={0.7}
          >
            <Icon name="refresh" size={18} color="#6366F1" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Your deposits and withdrawals</Text>
      </LinearGradient>
      {/* 
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <Icon name="arrow-up-bold-circle" size={20} color="#10B981" />
          </View>
          <View>
            <Text style={styles.summaryTitle}>Deposits</Text>
            <Text style={styles.summaryAmount}>₹{
              notifications
                .filter(item => item.type === 'deposit')
                .reduce((sum, item) => sum + parseFloat(item.amount), 0)
                .toLocaleString('en-IN')
            }</Text>
          </View>
        </View> */}

      {/* <View style={styles.summaryCard}>
          <View style={[styles.summaryIconContainer, styles.withdrawalIcon]}>
            <Icon name="arrow-down-bold-circle" size={20} color="#E11D48" />
          </View>
          <View>
            <Text style={styles.summaryTitle}>Withdrawals</Text>
            <Text style={styles.summaryAmount}>₹{
              notifications
                .filter(item => item.type === 'withdrawal')
                .reduce((sum, item) => sum + parseFloat(item.amount), 0)
                .toLocaleString('en-IN')
            }</Text>
          </View>
        </View>
      </View> */}

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.transaction_id}
        contentContainerStyle={[
          styles.listContainer,
          notifications.length === 0 && styles.emptyList
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 20,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  withdrawalIcon: {
    backgroundColor: 'rgba(225, 29, 72, 0.1)',
  },
  summaryTitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 90,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationItem: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  firstItem: {
    marginTop: 4,
  },
  gradientBackground: {
    borderRadius: 16,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    marginLeft: 14,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionTime: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  transactionId: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});

export default Notifications;