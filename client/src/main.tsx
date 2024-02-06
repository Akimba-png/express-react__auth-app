import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { checkAuth } from './store/async-reducers/check-auth.ts';
import './index.css'

store.dispatch(checkAuth());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
