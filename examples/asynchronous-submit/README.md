# Example asynchronous-submit form

## How to use

Download the example [or clone the repo](https://github.com/chrisfield/redux-formkit):

```bash
curl https://codeload.github.com/chrisfield/redux-formkit/tar.gz/master | tar -xz --strip=2 "redux-formkit"-master/examples/asynchronous-submit
cd asynchronous-submit
```

Install it and run:

```bash
npm install
npm start
# or
yarn install
yarn start
```

## The idea behind the example
The submitValues function in [my-form.jsx](src/my-form.jsx) uses a timer to simulate waiting for a response to an async post to a server. When the response from the server indicates an error a SubmissionError is thrown. SubmissionError can contain error messages for form fields. It can contain additional messages than can be placed anywhere on the form by accessing the error just as though it was for a field.