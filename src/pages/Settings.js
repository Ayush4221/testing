import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings = () => {
  const settingsOptions = [
    { id: '1', title: 'Profile', icon: 'account' },
    { id: '2', title: 'Security', icon: 'shield-check' },
    { id: '3', title: 'Notifications', icon: 'bell-outline' },
    { id: '4', title: 'Help & Support', icon: 'help-circle' },
    { id: '5', title: 'About', icon: 'information' },
    { id: '6', title: 'Logout', icon: 'logout' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      {settingsOptions.map(option => (
        <TouchableOpacity key={option.id} style={styles.optionItem}>
          <View style={styles.optionContent}>
            <Icon name={option.icon} size={24} color="#1F2937" />
            <Text style={styles.optionText}>{option.title}</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>
      ))}
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
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
});

export default Settings;