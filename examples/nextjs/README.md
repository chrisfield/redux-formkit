# Example form app with next.js

## How to use

Download the example [or clone the repo](https://github.com/chrisfield/redux-formkit):

```bash
curl https://codeload.github.com/chrisfield/redux-formkit/tar.gz/master | tar -xz --strip=2 "redux-formkit"-master/examples/nextjs
cd nextjs
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

Next.js will server render the form so that when the page reaches the browser it already contains the form mark-up. The advantage of this is that the form (prepopulated with any default values etc) will display while the js bundle downloads. At this point the JS is still downloading but the user can enter/use the form controls as thought it was a plain html form.

When the js bundle downloads redux-formkit will compare the value of each actual field with the initial value provided from the redux-store. Where these values are different redux-formkit will run the validation, the formatting and update the redux store with the user entered value.

As long as your components pass 'ref={props.setElementRef}' to the form input/select etc no extra code is required.


## Features
* Server Side rendering with Next JS
* Isomorphic initialisation so fields can be used while the client JS is downloading
* Field-array with add/remove buttons
* Setting initial values
* Field and Inter-field valiation
* Conditional dynamic fields
* Current error count
* Submit button goes green when error count is zero
* Asynchronous submit
* Disabled submit button during submit
* Asynchronous validation with server-side messages displayed next to the relevant field
* Flexible positioning of other server-side validation messages


