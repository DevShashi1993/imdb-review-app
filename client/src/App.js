import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import Navbar from './component/section/Navbar';
import Landing from './component/section/Landing';
import './App.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ChakraProvider>
        <Navbar />
          <Route path="/">
            <Landing />
          </Route>
        </ChakraProvider>
      </Switch>
    </BrowserRouter>
  );
}
