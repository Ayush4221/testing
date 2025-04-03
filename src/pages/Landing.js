import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/langingpage/Logo.png')} style={styles.logo} />
      </View>

      {/* Background Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/langingpage/people.png')}
          style={styles.backgroundImage}
        />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Welcome to BluPay</Text>
        <Text style={styles.description}>
          Your trusted banking app that works offline and online. Manage your finances anytime,
          anywhere.
        </Text>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>Signup</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('Biometrics')}
          >
            <Text style={styles.signupButtonText}>Biometrics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.signupButtonText}>Home</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  logoContainer: {
    backgroundColor: '#C4CAE7',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    height: 28,
    resizeMode: 'contain',
  },
  imageContainer: {
    height: '50%',
    backgroundColor: '#C4CAE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Landing;