import { Message, ChatResponse, UpdateKnowledgeResponse, KnowledgeStatus } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const updateKnowledge = async (text: string): Promise<UpdateKnowledgeResponse> => {
    const response = await fetch(`${API_URL}/api/chat/update-knowledge`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        throw new Error('Failed to update knowledge base');
    }

    return response.json();
};

export const askQuestion = async (question: string, history: Message[] = []): Promise<ChatResponse> => {
    const response = await fetch(`${API_URL}/api/chat/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question,
            history: history.map(msg => ({
                role: msg.role,
                content: msg.content,
            })),
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to get answer');
    }

    return response.json();
};

export const getStatus = async (): Promise<KnowledgeStatus> => {
    const response = await fetch(`${API_URL}/api/chat/status`);

    if (!response.ok) {
        throw new Error('Failed to get status');
    }

    return response.json();
};

export const getWelcomeMessage = async (): Promise<string> => {
    const response = await fetch(`${API_URL}/api/chat/welcome`);

    if (!response.ok) {
        return "Bienvenue ! Je suis Rafiq, votre secrétaire virtuel.";
    }

    const data = await response.json();
    return data.message;
};
