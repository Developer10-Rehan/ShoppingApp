import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { COLORS, SIZES } from '../../utils/constants';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const result = await dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(result)) {
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Practical Test</Text>
        
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={COLORS.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor={COLORS.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Icon 
              name={showPassword ? "eye" : "eye-off"} 
              size={20} 
              color={COLORS.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.termsContainer}>
        <Text style={styles.termsText}>Terms and Conditions</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: SIZES.md,
    paddingHorizontal: SIZES.md,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: SIZES.md,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  forgotPassword: {
    color: COLORS.textSecondary,
    fontSize: SIZES.sm,
  },
  termsContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  termsText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.sm,
  },
});

export default LoginScreen;