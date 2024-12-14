import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppAllModules from './AppAllModules.jsx';
import {UsuarioProvider} from './crud_reva/UsuarioProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      <AppAllModules/>
    </UsuarioProvider>
  </StrictMode>,
)
