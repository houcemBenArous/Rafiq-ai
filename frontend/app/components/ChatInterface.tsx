'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { format } from 'date-fns';

interface ChatInterfaceProps {
    messages: Message[];
    onSend: (message: string) => Promise<void>;
    welcomeMessage: string;
}

export default function ChatInterface({ messages, onSend, welcomeMessage }: ChatInterfaceProps) {
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isSending) return;

        const message = input.trim();
        setInput('');
        setIsSending(true);

        try {
            await onSend(message);
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {/* Welcome message */}
                {messages.length === 0 && (
                    <div className="message assistant welcome">
                        <div className="message-avatar">
                            <Bot size={24} />
                        </div>
                        <div className="message-content">
                            <div className="message-text" dangerouslySetInnerHTML={{ __html: welcomeMessage.replace(/\n/g, '<br>') }} />
                        </div>
                    </div>
                )}

                {/* Chat messages */}
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.role}`}>
                        <div className="message-avatar">
                            {message.role === 'assistant' ? <Bot size={24} /> : <User size={24} />}
                        </div>
                        <div className="message-content">
                            <div className="message-text">{message.content}</div>
                            <div className="message-time">{format(message.timestamp, 'HH:mm')}</div>
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {isSending && (
                    <div className="message assistant typing">
                        <div className="message-avatar">
                            <Bot size={24} />
                        </div>
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Posez votre question... (شنو بغيتي تعرف؟)"
                    disabled={isSending}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || isSending}
                    className="btn btn-primary send-btn"
                >
                    {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
            </div>

            <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 600px;
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .message {
          display: flex;
          gap: var(--spacing-md);
          animation: slideIn 0.3s ease;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          border: 2px solid var(--border-color);
        }

        .message.assistant .message-avatar {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-color: var(--color-primary);
          color: white;
        }

        .message.user .message-avatar {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .message-content {
          flex: 1;
          max-width: 70%;
        }

        .message.user .message-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .message-text {
          background: var(--bg-secondary);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .message.user .message-text {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: white;
        }

        .message.welcome .message-text {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
        }

        .message-time {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-top: var(--spacing-xs);
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          width: fit-content;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
          animation: pulse 1.4s ease-in-out infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .input-area {
          padding: var(--spacing-md);
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
          display: flex;
          gap: var(--spacing-sm);
        }

        .input-area input {
          flex: 1;
          border-radius: var(--radius-md);
        }

        .send-btn {
          flex-shrink: 0;
          padding: var(--spacing-sm) var(--spacing-md);
        }

        @media (max-width: 768px) {
          .chat-container {
            height: 500px;
          }

          .message-content {
            max-width: 85%;
          }
        }
      `}</style>
        </div>
    );
}
