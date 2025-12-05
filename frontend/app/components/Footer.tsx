import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <span className="footer-text">
                    Propulsé par <strong>Google Gemini</strong>
                </span>
                <Sparkles size={14} className="sparkle" />
                <span className="footer-text">
                    Nuit de l&apos;Info 2025
                </span>
                <span className="footer-separator">•</span>
                <span className="footer-text">
                    Équipe <strong className="team-name">allez-y</strong>
                </span>
            </div>

            <style jsx>{`
        .footer {
          padding: var(--spacing-md);
          text-align: center;
          border-top: 1px solid var(--border-color);
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .footer-text {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .footer-separator {
          color: var(--text-tertiary);
        }

        .sparkle {
          color: var(--color-accent);
        }

        .team-name {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          .footer-content {
            font-size: 0.8rem;
          }
        }
      `}</style>
        </footer>
    );
}
