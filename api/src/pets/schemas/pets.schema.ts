import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const petSchema = new mongoose.Schema({
    userId: ObjectId, // ID de l'utilisateur
    name: String, // Nom ou identifiant unique de l'IA
    animal: String, // Animal associé à l'IA (ex. chat, chien, etc.)
    personalityTraits: [String], // Traits de personnalité (ex. amical, professionnel, motivant)
    skills: [String], // Compétences clés (ex. communication, organisation, etc.)
    happiness: Number, // Niveau de bonheur
    hunger: Number, // Niveau de faim
    thirst: Number, // Niveau de soif
    tiredness: Number, // Niveau de fatigue
    threadId: String, // ID du thread de l'IA
}, { minimize: false });

export const Pet = mongoose.model('Pet', petSchema);