import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Pressable } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = 1.2; // Increase size for glow
  };

  const handlePressOut = () => {
    scale.value = 1; // Return to normal size
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
    shadowOpacity: scale.value > 1 ? 0.9 : 0.5,
    shadowRadius: scale.value > 1 ? 15 : 8,
  }));

  const handleLogin = () => {
    alert(`Logged in with email: ${email}`);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleLogin}
      >
        <Animated.View style={[styles.glowButton, animatedStyle]}>
          <Text style={styles.buttonText}>Login</Text>
        </Animated.View>
      </Pressable>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register
      </Text>
      <Text
          style={styles.link}
          onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  glowButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});
