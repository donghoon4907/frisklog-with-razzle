import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { loadableReady } from '@loadable/component'
import { ContextProvider } from './context'
import App from './App'
import { initializeApollo } from './lib/apollo'

const apolloClient = initializeApollo()

/**
 * Wait for all loadable components to be loaded before rendering.
 * Beacuse Loadable components loads all our scripts asynchronously.
 */
loadableReady(() => {
    hydrate(
        <ApolloProvider client={apolloClient}>
            <ContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ContextProvider>
        </ApolloProvider>,
        document.getElementById('root')
    )
})

if (module.hot) {
    module.hot.accept()
}
