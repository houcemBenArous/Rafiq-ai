'use client';

import React from 'react';
import { FileText, TrendingUp } from 'lucide-react';
import { Source } from '../types';

interface SourcePanelProps {
    sources: Source[];
}

export default function SourcePanel({ sources }: SourcePanelProps) {
    if (sources.length === 0) {
        return (
            <div className="source-panel empty">
                <div className="empty-state">
                    <FileText size={48} strokeWidth={1.5} />
                    <p>Les sources apparaîtront ici</p>
                </div>

                <style jsx>{`
          .source-panel.empty {
            background: var(--bg-glass);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--spacing-xl);
            text-align: center;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .empty-state {
            color: var(--text-tertiary);
          }

          .empty-state p {
            margin-top: var(--spacing-md);
            font-size: 0.9rem;
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="source-panel">
            <div className="panel-header">
                <FileText size={20} />
                <h3>Sources ({sources.length})</h3>
            </div>

            <div className="sources-list">
                {sources.map((source) => (
                    <div key={source.id} className="source-item">
                        <div className="source-header">
                            <span className="source-badge">Source {source.id}</span>
                            <div className="relevance">
                                <TrendingUp size={14} />
                                <span>{source.score}%</span>
                            </div>
                        </div>
                        <div className="source-preview">{source.preview}</div>
                        {source.preview !== source.text && (
                            <details className="source-full">
                                <summary>Voir le texte complet</summary>
                                <div className="source-text">{source.text}</div>
                            </details>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
        .source-panel {
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .panel-header h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .sources-list {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .source-item {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          transition: all var(--transition-normal);
          animation: fadeIn 0.4s ease;
        }

        .source-item:hover {
          border-color: var(--border-color-hover);
          box-shadow: var(--shadow-sm);
        }

        .source-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }

        .source-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 8px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: white;
          border-radius: 4px;
        }

        .relevance {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          color: var(--color-success);
        }

        .source-preview {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .source-full {
          margin-top: var(--spacing-sm);
        }

        .source-full summary {
          font-size: 0.85rem;
          color: var(--color-primary);
          cursor: pointer;
          user-select: none;
        }

        .source-full summary:hover {
          text-decoration: underline;
        }

        .source-text {
          margin-top: var(--spacing-xs);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
