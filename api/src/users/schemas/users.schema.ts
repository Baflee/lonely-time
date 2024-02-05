import * as mongoose from 'mongoose';

const environmentSchema = new mongoose.Schema({
    mainDailyEnvironment: String,
    secondaryEnvironments: [String],
});

const timePreferencesSchema = new mongoose.Schema({
    productiveTimeOfDay: String,
});

const socialBehaviorSchema = new mongoose.Schema({
    socialInteraction: String,
    primaryHobbies: [String],
});

const technologyUseSchema = new mongoose.Schema({
    primaryDevice: String,
});

const psychologicalFactorsSchema = new mongoose.Schema({
    personalityType: String,
    motivationalDrivers: String,
});

const environmentalPreferencesSchema = new mongoose.Schema({
    preferredClimate: String,
    noiseLevel: String,
    indoorOutdoorPreference: String,
});

const profilesSchema = new mongoose.Schema({
    name: String, // Nom ou identifiant unique de l'IA
    role: String, // Rôle spécifique de l'IA (ex. Assistant virtuel, Analyste de données, etc.)
    personalityTraits: [String], // Traits de personnalité (ex. amical, professionnel, motivant)
    skills: [String], // Compétences clés (ex. traitement du langage naturel, analyse de données)
    domainsOfExpertise: [String], // Domaines d'expertise (ex. santé, technologie, éducation)
    languages: [String], // Langues parlées par l'IA
}, { minimize: false });

export const userSchema = new mongoose.Schema({
    id: String,
    threadId: String,
    email: String,
    password: String,
    registrationDate: { type: Date, default: Date.now },
    age: String,
    occupation: String,
    AIProfiles: { type: profilesSchema, default: () => ({}) },
}, { minimize: false });

export const User = mongoose.model('User', userSchema);