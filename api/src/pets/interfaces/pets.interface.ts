export interface Pet extends Document {
    userId: string; // ID de l'utilisateur
    name: string; // Nom ou identifiant unique de l'IA
    animal: string; // Animal associé à l'IA (ex. chat, chien, etc.)
    personalityTraits: string[]; // Traits de personnalité (ex. amical, professionnel, motivant)
    skills: string[]; // Compétences clés (ex. communication, organisation, etc.)
    happiness: number; // Niveau de bonheur
    hunger: number; // Niveau de faim
    thirst: number; // Niveau de soif
    tiredness: number; // Niveau de fatigue
    threadId: string; // ID du thread de l'IA
}