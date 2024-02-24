import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/auth';
import LinearGradient from 'react-native-linear-gradient';


const Login = ({ navigation }: { navigation: any }) => {
    const { signup, login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleLoginOrSignup = async () => {
        setErrorMessage('');
        if(isSignUp) {
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
                navigation.navigate('Home'); // Bring user to home page
            } else {
                setErrorMessage(loginMessage.statusCode + ' : ' + loginMessage.message); // Set the error message to display it
            }
        }
    };

    return (
        <LinearGradient colors={['#EE99C2', '#EE99C2']} style={styles.containerGradient}>
            <View style={styles.container}>
                <Text style={styles.petlifeTitle}>Petify</Text>
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

                <TouchableOpacity
                    style={styles.buttonConfirm}
                    onPress={() => handleLoginOrSignup}
                >
                    <Text style={styles.text}>{isSignUp ? "S'inscrire" : "Se connecter"}</Text>
                </TouchableOpacity>
                {errorMessage ? (
                    <Text style={styles.error}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                    <Text style={styles.toggle}>
                        {isSignUp ? 'Déjà inscrit? Se connecter' : "S'inscrire"}
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

// Ajoutez le style pour le texte "Petlife" ici
const styles = StyleSheet.create({
    containerGradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 8,
    },
    petlifeTitle: { 
        fontSize: 90, 
        color: '#FFFFFF',
        marginBottom: 24, 
        fontWeight: 'bold',
        fontFamily: 'AbadiMT',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        textAlign: 'center',
        color: '#4B5563',
        marginBottom: 16,
        paddingHorizontal: 8,
        width: 200,
        backgroundColor: '#FFFFFF'
    },
    buttonConfirm: {
        height: 30,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 5,
        color: '#4B5563',
        width: 100,
        backgroundColor: '#FFFFFF'
    },
    text: {
        textAlign: 'center',
    },
    toggle: {
        marginTop: 15,
        color: '#FFFFFF',
    },
    error: {
        backgroundColor: '#FF0000',
        borderRadius: 5,
        width: 250,
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        paddingVertical:2,
    },
});

export default Login;
