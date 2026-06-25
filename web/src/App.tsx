import { useState } from 'react';
import { EstablishmentsPage } from './features/establishments/EstablishmentsPage';
import { EstablishmentsPageDirty } from './features/establishments/EstablishmentsPageDirty';
import { InspectionsPage } from './features/inspections/InspectionsPage';
import { StyleGuide } from './features/style-guide/StyleGuide';

type Tab = 'compliant' | 'dirty' | 'inspections' | 'styleguide';

// Demo shell — chrome around the example pages. This tab bar is NOT part of
// the reviewed code; each page stays "pure" (one compliant, one with violations)
// so the demo-frontend-reviewer audits them in isolation.
export default function App() {
  const [tab, setTab] = useState<Tab>('compliant');

  return (
    <div className="demo-shell">
      <header className="demo-tabs" role="tablist" aria-label="Exemplos">
        <button
          role="tab"
          aria-selected={tab === 'compliant'}
          className={`demo-tab ${tab === 'compliant' ? 'is-active' : ''}`}
          onClick={() => setTab('compliant')}
        >
          ✅ Página conforme
          <span className="demo-tab-sub">EstablishmentsPage.tsx</span>
        </button>
        <button
          role="tab"
          aria-selected={tab === 'dirty'}
          className={`demo-tab ${tab === 'dirty' ? 'is-active' : ''}`}
          onClick={() => setTab('dirty')}
        >
          ⚠️ Página com erros
          <span className="demo-tab-sub">EstablishmentsPageDirty.tsx</span>
        </button>
        <button
          role="tab"
          aria-selected={tab === 'inspections'}
          className={`demo-tab ${tab === 'inspections' ? 'is-active' : ''}`}
          onClick={() => setTab('inspections')}
        >
          🧪 Inspeções
          <span className="demo-tab-sub">InspectionsPage.tsx</span>
        </button>
        <button
          role="tab"
          aria-selected={tab === 'styleguide'}
          className={`demo-tab ${tab === 'styleguide' ? 'is-active' : ''}`}
          onClick={() => setTab('styleguide')}
        >
          📖 Style guide
          <span className="demo-tab-sub">features/style-guide</span>
        </button>
      </header>

      <div role="tabpanel" className="demo-panel">
        {tab === 'compliant' && <EstablishmentsPage />}
        {tab === 'dirty' && <EstablishmentsPageDirty />}
        {tab === 'inspections' && <InspectionsPage />}
        {tab === 'styleguide' && <StyleGuide />}
      </div>
    </div>
  );
}
