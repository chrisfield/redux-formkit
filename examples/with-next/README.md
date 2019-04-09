# Redux-formkit with next.js

## How to use

Download the example [or clone the repo](https://github.com/chrisfield/redux-formkit):

```bash
curl https://codeload.github.com/chrisfield/redux-formkit/tar.gz/master | tar -xz --strip=2 "redux-formkit"-master/examples/with-next
cd with-next
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

## The idea behind the example

Using `redux-formkit` with `next` is simple. The pages._app.js includes a `FormStateProvider` so `Forms` can be rendered in any component. In this case I've rendered a form straight from the index page.

An interesting aspect of this implementation is aparent when you compare it to the [with-next-and-redux example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next-and-redux). There is a fundemental difference in the way the initial values from `Index.getInitialProps` get on to the web page. 

In this example they are passed as initialValues directly to the `Form`. `Form` then uses these initialValues in a useEffect (which replaced componentDidMount). Since useEffect is client-only the pre-rendered form sent to the client will be blank and the initialValues will only be added once the JS downloads and runs.