# Example form with next.js and server validation

## How to use

Download the example [or clone the repo](https://github.com/chrisfield/redux-formkit):

```bash
curl https://codeload.github.com/chrisfield/redux-formkit/tar.gz/master | tar -xz --strip=2 "redux-formkit"-master/examples/servervalidation
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
The main point of the example is to show separation of the validation/formatting from the rendering of the form. The defined validation/formatting is then used in two places:
- In the client browser (eg. for the client browser to validate fields with onChange events)
- On the server (eg the form-data-handler validates sets of submitted data)

A secondary point is that the example has been written to allow data to be posted in two ways:
- JSON content - eg when the form is submitted asyncronously using 'Send' button (postman would work too)
- form-urlencoded content - eg when client JS is disabled or using 'Standard Submit (no client JS) button' 

Whichever way data is sent it will be validated/formatted consistently because the same code has been used.

Try tuning javascript off: Messages for errors that would have been caught on the client are now displayed when the form is redisplayed after submission to the server.

## Future direction
It is likely that form-data-handler will either be added to redux-formkit or will be published as a separate but closely related npm module. I'd be particularly interested in other people thoughts and feedback on this. Thanks.
