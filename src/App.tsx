import { useState } from 'react'
import MyRoutes from './routers/index'
import { Provider } from "react-redux";
import store from "states/store";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <MyRoutes />
        </div>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
