import { Message } from '../types';

const KNOWLEDGE_KEY = 'rafiq_knowledge_base';
const HISTORY_KEY = 'rafiq_chat_history';

export const saveKnowledgeBase = (text: string): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(KNOWLEDGE_KEY, text);
        }
    } catch (error) {
        console.error('Failed to save knowledge base:', error);
    }
};

export const loadKnowledgeBase = (): string | null => {
    try {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(KNOWLEDGE_KEY);
        }
    } catch (error) {
        console.error('Failed to load knowledge base:', error);
    }
    return null;
};

export const saveChatHistory = (history: Message[]): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
    } catch (error) {
        console.error('Failed to save chat history:', error);
    }
};

type StoredMessage = Omit<Message, 'timestamp'> & { timestamp: string };

export const loadChatHistory = (): Message[] => {
    try {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem(HISTORY_KEY);
            if (data) {
                const parsed = JSON.parse(data) as StoredMessage[];
                // Convert timestamp strings back to Date objects
                return parsed.map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp),
                }));
            }
        }
    } catch (error) {
        console.error('Failed to load chat history:', error);
    }
    return [];
};

export const clearAll = (): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(KNOWLEDGE_KEY);
            localStorage.removeItem(HISTORY_KEY);
        }
    } catch (error) {
        console.error('Failed to clear storage:', error);
    }
};
