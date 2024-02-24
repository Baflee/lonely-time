import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, NativeEventEmitter, NativeModules } from 'react-native';
import { Pet } from '../../../shared/interfaces/pet';
import { useAuth } from '../../hooks/auth';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({ navigation }: { navigation: any }) => {
    const { user, getPets, logout, sendMessage, getMessages } = useAuth();
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet>();
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [lastShakeTime, setLastShakeTime] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(user && user._id) {
                fetchPets(user._id);
            }
        });
    
        return unsubscribe;
    }, [navigation, user?._id]);

    useEffect(() => {
        const fetchInitialMessages = async () => {
            if (selectedPet) {
                const messages = await getMessages(selectedPet.animal, selectedPet.threadId);
                if (Array.isArray(messages.content.messages)) {
                    setChatHistory(messages.content.messages);
                } else {
                    setChatHistory([{ sender: "System", message: "Chargement de la page" }]);
                }
            }
        };
    
        fetchInitialMessages();
    }, [selectedPet]);

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules.ShakeDetector);
    
        const handleShake = (event: any) => {
            const now = Date.now();
            if (!isLoading && now - lastShakeTime > 20000 && event && event.message) {
                sendShakeMessage(event.message);
                setLastShakeTime(now);
            }
        };
    
        const subscription = eventEmitter.addListener('onShake', handleShake);
    
        return () => {
            subscription.remove();
        };
    }, [isLoading, lastShakeTime]);

    const sendShakeMessage = async (messageToSend: string) => {
        setIsLoading(true);
        try {
            if(selectedPet) {
                const updatedDiscussion = await sendMessage(selectedPet._id, messageToSend);
                if (updatedDiscussion && updatedDiscussion.content && updatedDiscussion.content.messages) {
                    setChatHistory(updatedDiscussion.content.messages);
                }
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du message de secousse", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPets = async (userId: string) => {
        if(userId === undefined) {
            setPets([]);
            setSelectedPet(undefined);
        } else {
            const petResponse = await getPets(userId);
            const fetchedPets = petResponse.content.pets;
            setPets(fetchedPets);
    
            // Select the first pet by default
            if (fetchedPets.length > 0 && !selectedPet) {
                setSelectedPet(fetchedPets[0]);
            }
        }
    };

    const handlePetSelection = (itemValue: string | null) => {
        setSelectedPet(pets.find(pet => pet._id === itemValue));
    };

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    const handleSendMessage = async () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            console.log("Message is empty, not sending.");
            return;
        }
    
        setIsLoading(true);
        if(selectedPet) {
            const updatedDiscussion = await sendMessage(selectedPet._id, trimmedMessage); // Ensure you're sending the trimmed message
            if (updatedDiscussion && updatedDiscussion.content && updatedDiscussion.content.messages) {
                setChatHistory(updatedDiscussion.content.messages);
            }
            setMessage(''); // Reset the message input after sending
        } else {
            setChatHistory([{ sender:"System", message:"Chargement de la page"}]);
        }
        setIsLoading(false);
    };

    const navigateToAddPet = () => {
        navigation.navigate('PetForm');
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#EE99C2', '#EE99C2']}>
            <View style={styles.topBar}>
                <Picker
                    selectedValue={selectedPet ? selectedPet._id : null}
                    style={styles.dropdown}
                    onValueChange={(itemValue) => handlePetSelection(itemValue)}
                >
                    {pets.length > 0 ? (
                        pets.map((pet) => (
                            <Picker.Item key={pet._id} label={pet.name} value={pet._id} />
                        ))
                    ) : (
                        <Picker.Item label="No pets available" value="none" />
                    )}
                </Picker>
                <TouchableOpacity onPress={navigateToAddPet} style={styles.addButton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout}>
                    <Text style={styles.buttonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
            </LinearGradient>
            <ScrollView style={styles.historyContainer}>
                {chatHistory.map((chat, index) => (
                    <View key={index} style={chat.sender === "Toi" ? styles.userMessageContainer : styles.petMessageContainer}>
                        <Text style={chat.sender === "Toi" ? styles.userMessageText : styles.petMessageText}>
                            {chat.message}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.interactionBox}>
                <View style={styles.petNameContainer}>
                    <Text style={styles.petNameText}>
                        {selectedPet ? selectedPet.animal : 'Chargement'}
                    </Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Faim</Text>
                        <Text style={styles.statValue}>{selectedPet ? selectedPet.hunger + '%' : '...'}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Soif</Text>
                        <Text style={styles.statValue}>{selectedPet ? selectedPet.thirst + '%' : '...'}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Bonheur</Text>
                        <Text style={styles.statValue}>{selectedPet ? selectedPet.happiness + '%' : '...'}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Fatigue</Text>
                        <Text style={styles.statValue}>{selectedPet ? selectedPet.tiredness + '%' : '...'}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.chatInputContainer}>
                <TextInput
                    placeholder="Taper votre message..."
                    style={styles.chatInput}
                    value={message}
                    onChangeText={setMessage}
                    editable={!isLoading}
                />
                <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={styles.sendButtonText}>⌨️</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    infoText: {
        color: '#000000',
        fontSize: 14,
    },
    dropdown: {
        color: '#000000',
        backgroundColor: '#FFFFFF',
        width: '50%',
    },
    historyContainer: {
        flex: 1,
        padding: 10,
    },
    interactionBox: {
        padding: 10,
        alignItems: 'center',
    },
    petNameContainer: {
        backgroundColor: '#EE99C2',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: '80%',
    },
    petNameText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    statBox: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EE99C2',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: '20%', 
    },
    statText: {
        color: '#FFFFFF',
        fontSize: 10,
        marginBottom: 5,
    },
    statValue: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    chatInputContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    chatInput: {
        color: '#000000',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    sendButton: {
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#EE99C2',
    },
    addButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#9BCF53',
        justifyContent: 'center',
    },
    sendButtonText: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        margin: 5,
        padding: 10,
        backgroundColor: '#EE99C2',
        borderRadius: 10,
    },
    petMessageContainer: {
        alignSelf: 'flex-start',
        margin: 5,
        padding: 10,
        backgroundColor: '#dddddd',
        borderRadius: 10,
    },
    userMessageText: {
        color: '#ffffff',
    },
    petMessageText: {
        color: '#000000',
    },
});

export default Home;