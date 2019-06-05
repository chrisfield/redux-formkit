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
Using `redux-formkit` with `next` is simple. The pages/index.js includes a `FormStateProvider` containing the form. The FormStateProvider has the initial state set using the redux-formkit formReducer with an updateFields action.

Normally updateFields would have the form name added by the dispatch function returned from useFormReducer. Here, since we are not using that dispatch function I had to add the form-name separately.