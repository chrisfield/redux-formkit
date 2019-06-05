# Next.js - Handle Early Input

An initial fast load of a form can be good for peceived performance. However on most server rendered forms any changes made by the user while the JS downloads would be overwritten because, when the javascript runs, it sets the controlled inputs to match the state. One way round this would be to initially disable the form inputs. Redux-formkit provides a better solution.

## Redux-formkit forms are usable even before the js downloads
The Field component includes code to update the form-state with the value on the page. In this way your form renders quickly, standard html elements are immediately usable, data is not lost and validation, formatting etc kick in as soon as the Javascript is available.

Checkout the [with-next](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next) example.

Run the example and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.

