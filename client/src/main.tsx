import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Rout from './Rout/Rout';
import store from './Redux/Store';
import { Provider } from 'react-redux'
import SocketContext from './ContextHandler/SocketContext/SocketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketContext>
      <Provider store={store}>
        <RouterProvider router={Rout} />
      </Provider>
    </SocketContext>
  </React.StrictMode>,
)
