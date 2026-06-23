import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Faithful Demo style chain (same order as the real frontoffice App.tsx):
//   1. AgoraDS Tailwind utilities  2. AgoraDS component styles
//   3. Demo shared global.css (tokens → typography → buttons → tables → …)
//   4. demo-only extras (page wrapper + demo tab shell)
import '@ama-pt/agora-design-system/artifacts/dist/tailwind.css';
import '@ama-pt/agora-design-system/artifacts/dist/style.css';
import './styles/shared/global.css';
import './styles/demo-extras.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
