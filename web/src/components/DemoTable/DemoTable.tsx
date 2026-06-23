import React, { createContext, useContext } from 'react';
import '../../styles/shared/components/DemoTable.css';
import { Paginator, type PaginatorProps } from '../Paginator';

// ── Context for auto-striping ────────────────────────────────────────────────
const RowIndexContext = createContext<number>(0);
type Align = 'left' | 'center' | 'right';

interface RootProps {
  'aria-label'?: string;
  pagination?: PaginatorProps;
  children?: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ 'aria-label': ariaLabel, pagination, children }) => (
  <div className="demo-table-wrap">
    <table className="demo-table" aria-label={ariaLabel}>{children}</table>
    {pagination != null && pagination.total > 0 && <Paginator {...pagination} />}
  </div>
);

const Header: React.FC<{ height?: number; children?: React.ReactNode }> = ({ height = 80, children }) => (
  <thead>
    <tr className="demo-table-header-row bg-demo-table-header" style={{ height: `${height}px` }}>
      {children}
    </tr>
  </thead>
);

const Column: React.FC<{ width?: string | number; align?: Align; children?: React.ReactNode }> = ({ width, align = 'left', children }) => {
  const style: React.CSSProperties = { textAlign: align };
  if (width != null) style.width = typeof width === 'number' ? `${width}px` : width;
  return <th className="demo-table-th text-neutral-800" style={style}>{children}</th>;
};

interface BodyProps {
  loading?: boolean;
  empty?: boolean;
  loadingLabel?: string;
  emptyLabel?: string;
  children?: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ loading = false, empty = false, loadingLabel = 'A carregar…', emptyLabel = 'Sem resultados.', children }) => {
  const colSpan = React.useMemo(() => {
    const first = React.Children.toArray(children)[0];
    if (React.isValidElement<{ children?: React.ReactNode }>(first)) {
      return React.Children.count(first.props.children) || 1;
    }
    return 1;
  }, [children]);

  if (loading || empty) {
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan} className="demo-table-state-cell text-s-regular text-neutral-400">
            {loading ? loadingLabel : emptyLabel}
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {React.Children.map(children, (child, index) => (
        <RowIndexContext.Provider value={index}>{child}</RowIndexContext.Provider>
      ))}
    </tbody>
  );
};

const Row: React.FC<{ striped?: boolean; onClick?: () => void; children?: React.ReactNode }> = ({ striped, onClick, children }) => {
  const index = useContext(RowIndexContext);
  const isStriped = striped ?? index % 2 === 1;
  const className = ['demo-table-row', isStriped ? 'bg-demo-table-row-alt' : 'bg-demo-table-row', onClick ? 'demo-table-row-clickable' : '']
    .filter(Boolean).join(' ');
  const handleKeyDown = onClick
    ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }
    : undefined;
  return (
    <tr className={className} onClick={onClick} onKeyDown={handleKeyDown} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </tr>
  );
};

const Cell: React.FC<{ align?: Align; fill?: boolean; children?: React.ReactNode }> = ({ align = 'left', fill = false, children }) => {
  const className = ['demo-table-td', 'text-s-regular', 'text-neutral-900', fill ? 'demo-table-td-fill' : ''].filter(Boolean).join(' ');
  return <td className={className} style={{ textAlign: align }}>{children}</td>;
};

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <tfoot><tr><td className="demo-table-footer-cell" colSpan={99}>{children}</td></tr></tfoot>
);

type DemoTableType = React.FC<RootProps> & {
  Header: typeof Header; Column: typeof Column; Body: typeof Body;
  Row: typeof Row; Cell: typeof Cell; Footer: typeof Footer;
};

export const DemoTable = Root as DemoTableType;
DemoTable.Header = Header;
DemoTable.Column = Column;
DemoTable.Body = Body;
DemoTable.Row = Row;
DemoTable.Cell = Cell;
DemoTable.Footer = Footer;
