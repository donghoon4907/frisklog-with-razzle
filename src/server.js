import path from "path";
import express from "express";
import { StaticRouter } from "react-router-dom";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { Helmet } from "react-helmet";
import cookieParser from "cookie-parser";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ContextProvider } from "./context";
import GlobalStyle from "./theme/globalStyle";
import theme from "./theme";
import { initializeApollo } from "./lib/apollo";
import App from "./App";

//const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
/** init express */
const server = express();
/** init cookie parser */
server.use(cookieParser());

server
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get("/*", async (req, res) => {
        const location = req.url;

        const extractor = new ChunkExtractor({
            statsFile: path.resolve("build/loadable-stats.json"),
            entrypoints: ["client"]
        });
        /** Init apollo client */
        const client = initializeApollo();
        /** Create the server side style sheet */
        const sheet = new ServerStyleSheet();

        const Root = () => (
            <ChunkExtractorManager extractor={extractor}>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <ContextProvider>
                            <GlobalStyle />
                            <StaticRouter location={location} context={{}}>
                                <App />
                            </StaticRouter>
                        </ContextProvider>
                    </ThemeProvider>
                </ApolloProvider>
            </ChunkExtractorManager>
        );

        try {
            /** get query in pages */
            await getDataFromTree(<Root />);
        } catch (e) {
            console.log(e);
        }
        /** Get apollo cache */
        const initialApolloState = client.extract();
        /** When the app is rendered collect the styles that are used inside it */
        const markup = renderToString(sheet.collectStyles(<Root />));
        /** Generate all the style tags so they can be rendered into the page */
        const styleTags = sheet.getStyleTags();
        const helmet = Helmet.renderStatic();

        res.status(200).send(`
                <!DOCTYPE html>
                <html lang="en" ${helmet.htmlAttributes.toString()}>
                    <head>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta charset="utf-8" />
                        ${helmet.title.toString()}
                        <meta
                            name="viewport"
                            content="width=device-width,initial-scale=1"
                        />
                        ${helmet.meta.toString()} ${helmet.link.toString()}
                        ${extractor.getLinkTags()}
                        ${extractor.getStyleTags()}
                        <!-- Render the style tags gathered from the components into the DOM -->
                        ${styleTags}
                        ${extractor.getScriptTags()}
                    </head>
                    <body ${helmet.bodyAttributes.toString()}>
                        <div id="root">${markup}</div>
                        <script>
                            window.__APOLLO_STATE__ = ${JSON.stringify(
                                initialApolloState
                            ).replace(/</g, "\\u003c")};
                        </script>
                    </body>
                </html>
            `);
    });

export default server;
