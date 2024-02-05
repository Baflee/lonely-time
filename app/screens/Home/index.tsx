import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Home = ({ navigation }: { navigation: any }) => {
    const { user } = useAuth();

    return (
        <View>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.description}>
                Connected User:{' '}
                <Text>{user ? user.email : "N/A"}</Text>
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.loginButton}
            >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        margin: 12,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        fontSize: 15
    },
    loginButton: {
        marginTop: 70,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#6dacea',
        padding: 10,
        width: 200
    }
});

export default Home;