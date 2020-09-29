import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { ContextProvider } from './context'
import App from './App'
import theme from './theme'
import GlobalStyle from './theme/globalStyle'
import { initializeApollo } from './lib/apollo'

const apolloClient = initializeApollo()

hydrate(
    <ApolloProvider client={apolloClient}>
        <ContextProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <>
                        <App />
                        <GlobalStyle />
                    </>
                </BrowserRouter>
            </ThemeProvider>
        </ContextProvider>
    </ApolloProvider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept()
}
