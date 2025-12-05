'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import KnowledgeBaseInput from './components/KnowledgeBaseInput';
import ChatInterface from './components/ChatInterface';
import SourcePanel from './components/SourcePanel';
import { Message, Source, KnowledgeStatus } from './types';
import * as api from './lib/api';
import * as storage from './lib/localStorage';
import { RefreshCw, Trash2 } from 'lucide-react';
import './globals.css';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [status, setStatus] = useState<KnowledgeStatus>({
    isReady: false,
    chunkCount: 0,
    message: 'En attente de la base de connaissances',
  });
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      const savedHistory = storage.loadChatHistory();
      setMessages(savedHistory);

      const savedKnowledge = storage.loadKnowledgeBase();
      if (savedKnowledge) {
        // Re-update knowledge base if it was saved
        try {
          await api.updateKnowledge(savedKnowledge);
          const newStatus = await api.getStatus();
          setStatus(newStatus);
        } catch (error) {
          console.error('Failed to restore knowledge base:', error);
        }
      }

      // Fetch welcome message
      try {
        const welcome = await api.getWelcomeMessage();
        setWelcomeMessage(welcome);
      } catch {
        setWelcomeMessage("🇲🇷 Marhaba! Ana Rafiq.\n\n👋 Bienvenue ! Je suis Rafiq, votre secrétaire virtuel.");
      }
    };

    loadData();
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      storage.saveChatHistory(messages);
    }
  }, [messages]);

  const handleUpdateKnowledge = async (text: string) => {
    try {
      await api.updateKnowledge(text);
      storage.saveKnowledgeBase(text);

      const newStatus = await api.getStatus();
      setStatus(newStatus);

      // Clear chat when knowledge base changes
      setMessages([]);
      setSources([]);
      storage.saveChatHistory([]);
    } catch (error) {
      console.error('Failed to update knowledge:', error);
      throw error;
    }
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Get AI response
      const response = await api.askQuestion(content, messages);

      // Add assistant message
      const assistantMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSources(response.sources);
    } catch (error) {
      console.error('Failed to get response:', error);

      const errorMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleClearChat = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer la conversation ?')) {
      setMessages([]);
      setSources([]);
      storage.saveChatHistory([]);
    }
  };

  const handleNewKnowledgeBase = () => {
    if (confirm('Êtes-vous sûr de vouloir charger une nouvelle base de connaissances ? Cela effacera la conversation actuelle.')) {
      setMessages([]);
      setSources([]);
      setStatus({
        isReady: false,
        chunkCount: 0,
        message: 'En attente de la base de connaissances',
      });
      storage.clearAll();
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="content-grid">
          {/* Left side - Knowledge Base & Chat */}
          <div className="main-column">
            <KnowledgeBaseInput onUpdate={handleUpdateKnowledge} status={status} />

            <div className="actions-bar">
              <button onClick={handleClearChat} className="btn btn-secondary" disabled={messages.length === 0}>
                <Trash2 size={16} />
                Effacer la conversation
              </button>
              <button onClick={handleNewKnowledgeBase} className="btn btn-secondary">
                <RefreshCw size={16} />
                Nouvelle base
              </button>
            </div>

            <ChatInterface messages={messages} onSend={handleSendMessage} welcomeMessage={welcomeMessage} />
          </div>

          {/* Right side - Sources */}
          <div className="side-column">
            <SourcePanel sources={sources} />
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding: var(--spacing-xl);
          max-width: 1600px;
          margin: 0 auto;
          width: 100%;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: var(--spacing-xl);
          height: 100%;
        }

        .main-column {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .side-column {
          position: sticky;
          top: var(--spacing-xl);
          height: fit-content;
          max-height: calc(100vh - var(--spacing-2xl));
        }

        .actions-bar {
          display: flex;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .side-column {
            position: static;
            max-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: var(--spacing-md);
          }

          .actions-bar {
            flex-direction: column;
          }

          .actions-bar button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
