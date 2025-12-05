'use client';

import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle } from 'lucide-react';

interface KnowledgeBaseInputProps {
    onUpdate: (text: string) => Promise<void>;
    status: {
        isReady: boolean;
        chunkCount: number;
        message: string;
    };
}

export default function KnowledgeBaseInput({ onUpdate, status }: KnowledgeBaseInputProps) {
    const [text, setText] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        if (!text.trim()) {
            alert('Veuillez coller du texte avant de mettre à jour');
            return;
        }

        setIsUpdating(true);
        try {
            await onUpdate(text);
        } catch (error) {
            console.error('Update failed:', error);
            alert('Erreur lors de la mise à jour. Veuillez réessayer.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="knowledge-base-container">
            <label htmlFor="knowledge-input" className="label">
                <span className="label-text">📚 Base de connaissances</span>
                <span className="label-hint">Collez ici toute la description du projet, services, FAQ, contacts, etc.</span>
            </label>

            <textarea
                id="knowledge-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Collez votre texte ici... Vous pouvez inclure la description complète de votre projet, vos services, votre FAQ, vos coordonnées, etc. Plus le texte est complet, plus Rafiq sera précis dans ses réponses !"
                disabled={isUpdating}
            />

            <div className="actions">
                <button
                    onClick={handleUpdate}
                    disabled={isUpdating || !text.trim()}
                    className="btn btn-primary"
                >
                    {isUpdating ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Analyse en cours...
                        </>
                    ) : (
                        <>
                            <Upload size={18} />
                            Mettre à jour la base de connaissances
                        </>
                    )}
                </button>

                <div className="status">
                    {status.isReady && (
                        <>
                            <CheckCircle size={18} className="status-icon success" />
                            <span className="status-text">{status.message}</span>
                        </>
                    )}
                    {!status.isReady && !isUpdating && (
                        <span className="status-text pending">En attente de la base de connaissances...</span>
                    )}
                </div>
            </div>

            <style jsx>{`
        .knowledge-base-container {
          padding: var(--spacing-lg);
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        
        .label {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-md);
        }
        
        .label-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .label-hint {
          font-size: 0.9rem;
          color: var(--text-tertiary);
        }
        
        textarea {
          width: 100%;
          min-height: 300px;
          font-size: 0.95rem;
          line-height: 1.6;
          resize: vertical;
        }
        
        textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .actions {
          margin-top: var(--spacing-md);
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }
        
        .status {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.95rem;
        }
        
        .status-icon.success {
          color: var(--color-success);
        }
        
        .status-text {
          color: var(--text-secondary);
        }
        
        .status-text.pending {
          color: var(--text-tertiary);
          font-style: italic;
        }
      `}</style>
        </div>
    );
}
