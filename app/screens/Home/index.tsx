import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Pet } from '../../../shared/interfaces/pet';
import { useAuth } from '../../hooks/auth';
import { Picker } from '@react-native-picker/picker';

const Home = () => {
    const { user, getPet } = useAuth(); // Assuming useAuth provides setPet for fetching pets
    const [pets, setPets] = useState<Pet[]>([]); // State to hold the list of pets
    const [selectedPet, setSelectedPet] = useState<Pet>(); // State to hold the selected pet

    useEffect(() => {
        const fetchPets = async () => {
            if (user?.id) {
                const petResponse = await getPet(user.id); // Fetch pets once when the user is defined
                setPets(petResponse.content || []); // Update the pets state
            }
        };
        fetchPets();
        console.log('Fetching pets... ' + selectedPet);
    }, [user, getPet]); // Dependency on user and setPet to fetch pets once

    // Handler for when a new pet is selected from the Picker
    const handlePetSelection = (itemValue: string | null) => {
        setSelectedPet(pets.find(pet => pet._id === itemValue)); // Update the selectedPet state based on selection
        // Optionally, here you can fetch chat history or other data related to the selected pet
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.logoText}>{user ? user.email : "N/A"}</Text>
                <Picker
                    selectedValue={selectedPet ? selectedPet.name : null}
                    style={styles.dropdown}
                    onValueChange={(itemValue) => handlePetSelection(itemValue)}
                >
                    {pets.map((pet) => (
                        <Picker.Item key={pet._id} label={pet.name} value={pet.name} />
                    ))}
                </Picker>
            </View>
            <ScrollView style={styles.historyContainer}>
                {/* Dynamically add ChatGPT history items here based on selectedPet */}
            </ScrollView>
            <View style={styles.interactionBox}>
                {/* This is where you could display selected pet information or images */}
                <Text style={styles.logoText}>Selected Pet: {selectedPet ? selectedPet.name : 'None'}</Text>
            </View>
            <View style={styles.chatInputContainer}>
                <TextInput
                    placeholder="Type your message..."
                    style={styles.chatInput}
                    onSubmitEditing={() => {/* Handle the submission based on selectedPet */}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: 150,
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
        height: 150, // Set a fixed height or make it responsive as needed
    },
    chatInputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#fff',
        padding: 10,
    },
    chatInput: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    // Add styles for other components as needed
});

export default Home;