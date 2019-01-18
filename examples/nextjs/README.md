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

## Features
* Server Side rendering with Next JS
* Isomorphic initialisation so fields can be used while the client JS is downloading (see below)
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


## Client and Server-Side Rendering

Next.js renders html-markup on the server so the form (prepopulated with any default values etc) is available to use while the js bundle downloads.

Without something like redux-formkit the data entered would be overwritten when the javascript sets the controlled inputs to match the redux-state. The problem would be most noticable for users with a slow internet connection. 

One way round this would be to initially disable the form inputs. Redux-formkit provides a better solution: 
* The Field component includes code to update the redux-state using any data entered. In this way your form renders quickly, standard html elements are immediately usable, data is not lost and validation, formatting etc kick in as soon as the Javascript is available.

To see this in action run the example and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.
