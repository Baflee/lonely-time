import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import for Picker
import { useAuth } from '../../hooks/auth';
import LinearGradient from 'react-native-linear-gradient';

const PetForm = ({ navigation }: { navigation: any }) => {
    const { createPet, user, sendNotification, getFcmToken } = useAuth();
    const [name, setName] = useState('');
    const [animal, setAnimal] = useState(''); // This will store the selected animal type
    const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Example data for the picker
    const animalOptions = [
        'Chien',
        'Chat',
        'Perroquet',
        'Lapin',
        'Hamster',
        'Cochon d’Inde',
        'Tortue',
        'Poisson rouge',
        'Serpent',
        'Lézard',
        'Furet',
        'Rat',
        'Souris',
        'Gerbille',
        'Perruche',
        'Canari',
        'Iguane',
        'Axolotl',
        'Hérisson',
        'Écureuil',
        'Chinchilla',
        'Oiseau',
        'Araignée',
        'Scorpion',
        'Capybara',
        'Raton laveur',
    ];

    const traitOptions = [
        'Amical',
        'Timide',
        'Énergique',
        'Paresseux',
        'Curieux',
        'Joueur',
        'Obéissant',
        'Têtu',
    ];

    const skillOptions = [
        'Assis',
        'Rapporte',
        'Reste',
        'Saute',
        'Fait le mort',
        'Roule',
        'Suit au pied',
        'Attrape',
    ];

    const handleToggleTrait = (trait: string) => {
        if (personalityTraits.includes(trait)) {
            setPersonalityTraits(personalityTraits.filter(t => t !== trait));
        } else {
            setPersonalityTraits([...personalityTraits, trait]);
        }
    };

    const handleToggleSkill = (skill: string) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter(s => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

    const handleAddPet = async () => {
        setErrorMessage('');
        const petMessage = await createPet(user._id, name, animal, personalityTraits, skills);
        if (petMessage.statusCode >= 200 && petMessage.statusCode < 300) {
            setErrorMessage('');
            const fcmToken = await getFcmToken();
            if(fcmToken) {
                sendNotification(fcmToken, 'Nouvelle animal ajouté', `Un nouvel animal nommé ${name} a été ajouté à votre liste d'animaux`);
            }
            navigation.navigate('Home');
        } else {
            setErrorMessage(petMessage.statusCode + ' : ' + petMessage.message);
        }
    };

    return (
        <LinearGradient colors={['#EE99C2', '#EE99C2']}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.inputLabel}>Nom : </Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Enter le nom"
            />

            <Text style={styles.inputLabel}>Animal : </Text>
            <View style={styles.pickerContainer}>
                <Picker
                    testID='animalPicker'
                    selectedValue={animal}
                    onValueChange={(itemValue) =>
                        setAnimal(itemValue)
                    }
                    style={styles.picker}>
                    {animalOptions.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.inputLabel}>Traits de caractère : </Text>
            <View style={styles.optionsContainer}>
                {traitOptions.map(trait => (
                    <TouchableOpacity
                        key={trait}
                        style={personalityTraits.includes(trait) ? styles.optionSelected : styles.option}
                        onPress={() => handleToggleTrait(trait)}>
                        <Text>{trait}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.inputLabel}>Talents : </Text>
            <View style={styles.optionsContainer}>
                {skillOptions.map(skill => (
                    <TouchableOpacity
                        key={skill}
                        style={skills.includes(skill) ? styles.optionSelected : styles.option}
                        onPress={() => handleToggleSkill(skill)}>
                        <Text>{skill}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={handleAddPet} style={styles.buttonConfirm}>
                <Text style={styles.textConfirm}>Ajouter un animal</Text>
            </TouchableOpacity>

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    containerGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 10,
        color: '#FFFFFF',
    },
    input: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    picker: {
        width: '100%',
        backgroundColor: '#FFFFFF'
    },
    optionsContainer: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    },
    option: {
        margin: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 5,
    },
    optionSelected: {
        margin: 5,
        borderWidth: 1,
        borderColor: '#EE99C2',
        backgroundColor: '#EE99C2',
        padding: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    buttonConfirm: {
        height: 40,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#FFFFFF'
    },
    textConfirm: {
        textAlign: 'center',
    }
});

export default PetForm;
