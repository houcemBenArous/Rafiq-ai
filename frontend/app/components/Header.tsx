import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <div className="logo-icon">
                        <Bot size={40} />
                        <Sparkles className="sparkle" size={20} />
                    </div>
                </div>
                <div className="header-text">
                    <h1>Rafiq-AI</h1>
                    <p className="subtitle">Secrétaire virtuel du Village Numérique Résistant</p>
                </div>
            </div>

            <style jsx>{`
        .header {
          padding: var(--spacing-xl) var(--spacing-lg);
          text-align: center;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          animation: fadeIn 0.6s ease;
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-lg);
        }
        
        .logo {
          position: relative;
        }
        
        .logo-icon {
          position: relative;
          color: var(--color-primary);
          filter: drop-shadow(0 0 20px rgba(66, 153, 225, 0.5));
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .sparkle {
          position: absolute;
          top: -5px;
          right: -5px;
          color: var(--color-accent);
          animation: spin 3s linear infinite;
        }
        
        .header-text {
          text-align: left;
        }
        
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 700;
        }
        
        .subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: var(--spacing-xs);
        }
        
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
          }
          
          .header-text {
            text-align: center;
          }
          
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
        </header>
    );
}
