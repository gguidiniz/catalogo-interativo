import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { login } from '@/src/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from './login.styles';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    setHasSubmitted(true);
    setLoginFailed(false);

    if (!username.trim() || !password.trim()) {
      return;
    }

    if (username.length < 3 || password.length < 3) {
      setLoginFailed(true);
      return;
    }

    dispatch(login({ username }));
    router.replace('/(tabs)');
  };

  const usernameError = hasSubmitted && !username.trim();
  const passwordError = hasSubmitted && !password.trim();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.blueBackground}>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Insira seus dados para entrar na sua conta.</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            {loginFailed && (
              <Text style={styles.mainErrorText}>Username ou senha inválidos</Text>
            )}

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, usernameError && styles.inputError]}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="Ex: admin"
              placeholderTextColor="#9ca3af"
            />
            {usernameError && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
                <Text style={styles.errorText}>Campo obrigatório</Text>
              </View>
            )}

            <Text style={[styles.label, { marginTop: 16 }]}>Senha</Text>
            <View style={[styles.passwordContainer, passwordError && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Ex: 123"
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
            {passwordError && (
               <View style={styles.errorRow}>
                 <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
                 <Text style={styles.errorText}>Campo obrigatório</Text>
               </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
