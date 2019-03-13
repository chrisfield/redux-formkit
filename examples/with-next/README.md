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

There is very little to do to use `redux-formkit` with `next`. The pages._app.js includes a `FormStateProvider` so `Forms` can be rendered in any component. In this case I've rendered a form straight from the index page.

The most interesting aspects of this implementation are aparent when you compare it to the with-next-and-redux example. There is a fundemental difference in the way the initial values from `Index.getInitialProps` get on to the web page. In this example they are passed as initialValues to the `Form`. `Form` then uses these initialValues in a useEffect (which replaced componentDidMount). Since useEffect is client-only the pre-rendered form sent to the client will be blank and the initialValues will only be added once the JS downloads and runs.

To see this in action run the example and in the chrome dev-tools network tab choose the slow-3g option. Try entering some values while you wait for the JS to download. Then take a look at the difference with-next-and-redux.