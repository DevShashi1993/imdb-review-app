import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import Navbar from './component/section/Navbar';
import Landing from './component/section/Landing';
import LoginForm from './component/section/LoginForm';
import './App.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ChakraProvider>
          <Navbar />
          <Box className="main-container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/admin/login" component={LoginForm} />
          </Box>
        </ChakraProvider>
      </Switch>
    </BrowserRouter>
  );
}
