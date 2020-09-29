import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Feed from './pages/feed'
import NoMatch from './pages/404'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'github-markdown-css/github-markdown.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/create" component={Feed} />
            <Route exact path="/update" component={Feed} />
            <Route exact path="/user/:id" component={Feed} />
            <Route exact path="/post/:id" component={Feed} />
            <Route exact path="/category/:content" component={Feed} />
            <Route exact path="/search/:query" component={Feed} />
            <Route component={NoMatch} />
        </Switch>
    </Layout>
)
