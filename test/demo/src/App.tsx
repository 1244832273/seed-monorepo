import React from 'react';
import AppRouter from './router/index';
// import { SWRConfig } from 'swr';
// import SWRConfigValue from '@/service/fetch/SWRConfig';
import './App.less';

function App() {
  return (
    // <SWRConfig value={SWRConfigValue}>
    <AppRouter />
    // {/* </SWRConfig> */}
  );
}

export default App;
