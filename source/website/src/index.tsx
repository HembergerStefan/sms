import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import App from './App'
import './Translation' /* Very IMPORTANT import - without it, nothing can be translated */
import './index.css'
import {ReactQueryDevtools} from "react-query/devtools";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const queryClient = new QueryClient()

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>
)
