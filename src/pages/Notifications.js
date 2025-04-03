import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Notifications = () => {
  const notifications = [
    {
      id: '1',
      title: 'Money Received',
      message: 'You received ₹500 from John Doe',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'Payment Successful',
      message: 'Payment of ₹200 to Market completed',
      time: '5 hours ago',
    },
  ];

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
});

export default Notifications;