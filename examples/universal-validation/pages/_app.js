import React from 'react';
import App, {Container} from 'next/app';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import FormStateProvider from 'redux-formkit-redux-state-provider';

class MyApp extends App {
  render () {
    const {Component, pageProps, reduxStore} = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <FormStateProvider>
            <Component {...pageProps} />
          </FormStateProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);