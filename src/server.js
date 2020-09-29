import express from 'express'
import { StaticRouter } from 'react-router-dom'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { Helmet } from 'react-helmet'
import cookieParser from 'cookie-parser'
import { ContextProvider } from './context'
import GlobalStyle from './theme/globalStyle'
import theme from './theme'
import { initializeApollo } from './lib/apollo'
import { GET_CATEGORIES } from './graphql/query/category'
import { GET_USERS } from './graphql/query/user'
import { GET_NOTICES } from './graphql/query/notice'
import App from './App'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)
/** init express */
const server = express()
/** init cookie parser */
server.use(cookieParser())

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', async (req, res) => {
        const location = req.url
        /** Init apollo client */
        const client = initializeApollo()
        /** Create the server side style sheet */
        const sheet = new ServerStyleSheet()
        /** Load recommand users */
        await client.query({
            query: GET_USERS,
            variables: {
                first: 10,
                orderBy: 'postCount_DESC'
            }
        })
        /** Load recommand categories */
        await client.query({
            query: GET_CATEGORIES,
            variables: {
                first: 3,
                orderBy: 'useCount_DESC'
            }
        })
        /** Load recent notice */
        await client.query({
            query: GET_NOTICES,
            variables: {
                first: 1,
                orderBy: 'createdAt_DESC'
            }
        })

        const Root = () => (
            <ApolloProvider client={client}>
                <ContextProvider>
                    <ThemeProvider theme={theme}>
                        <StaticRouter location={location} context={{}}>
                            <>
                                <App />
                                <GlobalStyle />
                            </>
                        </StaticRouter>
                    </ThemeProvider>
                </ContextProvider>
            </ApolloProvider>
        )

        try {
            /** get query in pages */
            await getDataFromTree(<Root />)
        } catch (e) {
            console.log(e)
        }
        /** Get apollo cache */
        const initialApolloState = client.cache.extract()
        /** When the app is rendered collect the styles that are used inside it */
        const markup = renderToString(sheet.collectStyles(<Root />))
        /** Generate all the style tags so they can be rendered into the page */
        const styleTags = sheet.getStyleTags()
        const helmet = Helmet.renderStatic()

        res.status(200).send(
            `<!doctype html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-178659482-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-178659482-1');
        </script>
        
        ${
            assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
        }
        ${
            process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <!-- Render the style tags gathered from the components into the DOM -->
        ${styleTags}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
           <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(
              initialApolloState
          ).replace(/</g, '\\u003c')}
        </script>
    </body>
</html>`
        )
    })

export default server
