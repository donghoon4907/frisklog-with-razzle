import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { loadableReady } from '@loadable/component'
import { ContextProvider } from './context'
import App from './App'
import theme from './theme'
import GlobalStyle from './theme/globalStyle'
import { initializeApollo } from './lib/apollo'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'github-markdown-css/github-markdown.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

const apolloClient = initializeApollo()

/**
 * Wait for all loadable components to be loaded before rendering.
 * Beacuse Loadable components loads all our scripts asynchronously.
 */
loadableReady(() => {
    hydrate(
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <ContextProvider>
                    <GlobalStyle />
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ContextProvider>
            </ThemeProvider>
        </ApolloProvider>,
        document.getElementById('root')
    )
})

if (module.hot) {
    module.hot.accept()
}
