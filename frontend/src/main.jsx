import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
