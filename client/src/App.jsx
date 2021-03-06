import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import React, { Fragment } from 'react'

import $ from'jquery'
import Popper from'popper.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'

import FavouriteComicsPage from './components/FavouriteComics/FavouriteComicsPage'
import HomePage from './components/Comics/HomePage'
import SearchComicsPage from './components/Comics/SearchComicsPage'
import Page404 from './components/Page404'
import Footer from './components/Footer'
import Header from './components/Header'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const App = () => (
    <div id='app'>
        <BrowserRouter>
            <Fragment>
                <Header />
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/search' exact component={SearchComicsPage} />
                    <Route path='/favs' exact component={FavouriteComicsPage} />
                    <Route path='/404' exact component={Page404} />
                    <Redirect to='/404' />
                </Switch>
                <Footer />
            </Fragment>
        </BrowserRouter>
    </div>
)

export default App
