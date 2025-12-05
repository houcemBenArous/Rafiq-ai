export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: Source[];
}

export interface Source {
    id: number;
    text: string;
    score: number;
    preview: string;
}

export interface KnowledgeStatus {
    isReady: boolean;
    chunkCount: number;
    message: string;
}

export interface ChatResponse {
    success: boolean;
    answer: string;
    sources: Source[];
}

export interface UpdateKnowledgeResponse {
    success: boolean;
    message: string;
    chunkCount: number;
}
