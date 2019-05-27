# Next.js - Server Rendered Forms

Next.js renders html on the server. It has several advantages including:
* Fast initial page load - particularly compared to SPA sites which don't render until the js loads.
* Progressive Web App - including AJAX loading just what needs to change and rich js facilities for modern clients
* Universal js - no separate language or templating on the server.

An initial fast load of a form can be good for peceived performance. However any changes entered on the form would be overwritten because, when the javascript runs, it sets the controlled inputs to match the state. One way round this would be to initially disable the form inputs. Redux-formkit provides a better solution.

## Redux-formkit forms are usable even before the js downloads
The Field component includes code to update the form-state with the value on the page. In this way your form renders quickly, standard html elements are immediately usable, data is not lost and validation, formatting etc kick in as soon as the Javascript is available.

Checkout the [with-next-and-redux](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next-and-redux) example.

Run the example and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.