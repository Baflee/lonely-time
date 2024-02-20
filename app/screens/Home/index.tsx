import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Pet } from '../../../shared/interfaces/pet';
import { useAuth } from '../../hooks/auth';
import { Picker } from '@react-native-picker/picker';

const Home = ({ navigation }: { navigation: any }) => {
    const { user, getPets, logout, sendMessage, getMessages } = useAuth();
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet>();
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<any[]>([]);

    useEffect(() => {
        if(user && user._id) {
            console.log('Effect run', user._id);
            fetchPets(user._id);
            console.log('Fetched pets:', pets);
        }
    }, [user?._id]);

    useEffect(() => {
        const fetchInitialMessages = async () => {
            if (selectedPet) {
                const messages = await getMessages(selectedPet.animal, selectedPet.threadId);
                if (Array.isArray(messages.content.messages)) {
                    setChatHistory(messages.content.messages);
                } else {
                    console.error('Expected messages.content.messages to be an array, received:', messages.content.messages);
                    setChatHistory([{ sender:"Systeme" , message:"Chargement de la discussion"}]);
                }
            }
        };
    
        fetchInitialMessages();
    }, [selectedPet]);

    const fetchPets = async (userId: string) => {
        if(userId === undefined) setPets([]);
        const petResponse = await getPets(userId);
        setPets(petResponse.content.pets);
    };

    const handlePetSelection = (itemValue: string | null) => {
        setSelectedPet(pets.find(pet => pet._id === itemValue));
    };
    
    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    const handleSendMessage = async () => {
        console.log('Message to send:', message);
        if(selectedPet) {
            const updatedDiscussion = await sendMessage(selectedPet?._id, message);
            if (updatedDiscussion && updatedDiscussion.content && updatedDiscussion.content.messages) {
                setChatHistory(updatedDiscussion.content.messages);
            }
            setMessage('');
        } else {
            // Handle the case where messages.content.messages is not an array
            console.error('Expected messages.content.messages to be an array');
            setChatHistory([{ sender:"Systeme" , message:"Chargement de la discussion"}]); // Reset or handle as appropriate
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Picker
                    selectedValue={selectedPet ? selectedPet._id : null} // Change to _id for value matching
                    style={styles.dropdown}
                    onValueChange={(itemValue) => handlePetSelection(itemValue)}
                >
                    {pets.map((pet) => (
                        <Picker.Item key={pet._id} label={pet.name} value={pet._id} />
                    ))}
                </Picker>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.historyContainer}>
                {chatHistory && chatHistory.map((chat, index) => (
                    <View key={index} style={chat.sender === "Toi" ? styles.userMessageContainer : styles.petMessageContainer}>
                        <Text style={chat.sender === "Toi" ? styles.userMessageText : styles.petMessageText}>
                            {chat.message}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.interactionBox}>
                <Text style={styles.logoText}>Faim : {selectedPet ? selectedPet.hunger + '%' : 'Chargement'}</Text>
                <Text style={styles.logoText}>Soif : {selectedPet ? selectedPet.thirst + '%' : 'Chargement'}</Text>
                <Text style={styles.logoText}>Bohneur : {selectedPet ? selectedPet.happiness + '%' : 'Chargement'}</Text>
                <Text style={styles.logoText}>Fatigue : {selectedPet ? selectedPet.tiredness + '%' : 'Chargement'}</Text>
            </View>
            <View style={styles.chatInputContainer}>
            <TextInput
        placeholder="Type your message..."
        style={styles.chatInput}
        value={message}
        onChangeText={setMessage} // Update message state on change
        onSubmitEditing={handleSendMessage} // Optionally handle sending on keyboard submit
    />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>⌨️ </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sendButton: {
        marginVertical: 10,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    sendButtonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007bff', // Example blue background
        padding: 10,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff', // White text color
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#000', // Assuming a dark theme from the design
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff', // If there is a separator in the design
    },
    logoText: {
        color: '#fff',
    },
    dropdown: {
        color: '#fff',
        backgroundColor: '#333', // Assuming a darker background for the dropdown
        width: '50%',
    },
    historyContainer: {
        flex: 1,
        padding: 10,
    },
    interactionBox: {
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        margin: 10,
        height: 150,
    },
    chatInputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#fff',
        padding: 10,
    },
    chatInput: {
        color: '#ffffff',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        margin: 5,
        padding: 10,
        backgroundColor: '#007bff', // Choose a color that suits your app theme
        borderRadius: 10,
    },
    petMessageContainer: {
        alignSelf: 'flex-start',
        margin: 5,
        padding: 10,
        backgroundColor: '#dddddd', // Light gray for contrast
        borderRadius: 10,
    },
    userMessageText: {
        color: '#ffffff', // White text for the user messages
    },
    petMessageText: {
        color: '#000000', // Dark text for pet messages
    },});

export default Home;