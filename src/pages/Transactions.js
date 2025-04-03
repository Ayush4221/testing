import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default Transactions;