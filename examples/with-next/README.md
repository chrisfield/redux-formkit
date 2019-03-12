# Example form app with next.js

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

Next.js renders html on the server so the form is available to use while the js bundle downloads.

Without something like redux-formkit any changed field values get overwritten because, when the javascript runs, it sets the controlled inputs to match the react (or redux) form-state.

One way round this would be to initially disable the form inputs. Redux-formkit provides a better solution: 
> The Field component includes code to update the form-state with the value on the page. In this way your form renders quickly, standard html elements are immediately usable, data is not lost and validation, formatting etc kick in as soon as the Javascript is available.

To see this in action run the example and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.