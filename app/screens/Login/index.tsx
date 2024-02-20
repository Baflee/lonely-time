import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/auth';


const Login = ({ navigation }: { navigation: any }) => {
    const { signup, login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(false); // Toggle between login and signup
    const [errorMessage, setErrorMessage] = useState<string>(''); // New state for storing the error message

    const handleLoginOrSignup = async () => {
        setErrorMessage(''); // Clear any existing error message
            if(isSignUp) {
                // Add your signup logic here
                const signupMessage = await signup(email, password, passwordConfirmation);
                if (signupMessage.statusCode >= 200 && signupMessage.statusCode < 300) {
                    setIsSignUp(false); // If signup is successful, switch to login mode
                    setErrorMessage(''); // Clear any existing error message
                } else {
                    setErrorMessage(signupMessage.statusCode + ' : ' + signupMessage.message); // Set the error message to display it
                }
            } else {
                const loginMessage = await login(email, password);
                if (loginMessage && loginMessage.statusCode >= 200 && loginMessage.statusCode < 300) {
                    setErrorMessage(''); // Clear any existing error message
                    navigation.navigate('Home');
                } else {
                    setErrorMessage(loginMessage.statusCode + ' : ' + loginMessage.message); // Set the error message to display it
                }
            }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isSignUp ? 'Inscription' : 'Connexion'}</Text>

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry
            />

            {isSignUp && (
                <TextInput
                    style={styles.input}
                    onChangeText={setPasswordConfirmation}
                    value={passwordConfirmation}
                    placeholder="Confirmez le mot de passe"
                    secureTextEntry
                />
            )}

            <Button
                onPress={handleLoginOrSignup}
                title={isSignUp ? "S'inscrire" : "Se connecter"}
                color="#4B5563"
            />

            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.toggle}>
                    {isSignUp ? 'Déjà inscrit? Se connecter' : "S'inscrire"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#A0AEC0',
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '80%',
    },
    toggle: {
        marginTop: 15,
        color: '#4B5563',
    },
    error: { // Style for the error message
        color: 'red',
        marginTop: 10,
    },
});

export default Login;