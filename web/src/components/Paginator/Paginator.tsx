import React from 'react';
import '../../styles/shared/components/Paginator.css';

export interface PaginatorProps {
    /** Total number of items */
    total: number;
    /** Current page (1-based) */
    page: number;
    /** Rows shown per page */
    pageSize: number;
    /** Available page size options */
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({
    total,
    page,
    pageSize,
    pageSizeOptions = [10, 15, 25, 50],
    onPageChange,
    onPageSizeChange,
}) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    return (
        <div className="paginator">
            {/* Section 1 — rows per page */}
            <div className="paginator-section paginator-left">
                <span className="paginator-label">Linhas por página: {pageSize}</span>
                <div className="paginator-size-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                    <select
                        className="paginator-size-select"
                        value={pageSize}
                        onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
                        aria-label="Linhas por página"
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Section 2 — info */}
            <div className="paginator-section paginator-middle">
                <span className="paginator-info">
                    {from} a {to} de {total} items
                </span>
            </div>

            {/* Section 3 — navigation */}
            <div className="paginator-section paginator-right">
                <button
                    className="paginator-btn"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    aria-label="Página anterior"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <div className="paginator-right-divider" />
                <button
                    className="paginator-btn"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Próxima página"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
