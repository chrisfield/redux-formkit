import React from 'react';
import App, {Container} from 'next/app';
import { FormStateProvider } from '../redux-formkit';

class MyApp extends App {
  render () {  
    const {Component, pageProps} = this.props
    return (
      <Container>
        <FormStateProvider>
          <Component {...pageProps} />
        </FormStateProvider>
      </Container>
    );
  }
}

export default MyApp;