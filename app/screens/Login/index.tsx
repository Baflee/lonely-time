import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/auth';


const Login = ({ navigation }: { navigation: any }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Login error:', JSON.stringify(error));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

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

            <Button
                onPress={handleLogin}
                title="Se connecter"
                color="#4B5563"
            />
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
        fontSize: 20, // Adjust size as per your design
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#A0AEC0', // This is an approximation of Tailwind's gray-400
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '80%',
    },
});

export default Login;

