# Form

Renders an html form and acts as a container for `Fields`. `Form` components must directly or indirectly be inside a `FormStateProvider`.
Any children/descendants of Form can use the `useForm` hook to get the current forms name.

| Property Name      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name               | Yes      | String. A unique name for the Form                                                                                                                                                                                                                                                                                                                                                                   |
| initialValues      |          | Object. Any initial field values for the form. Note you can also set field values by dispatching an updateFields action |
| onSubmit           |          | Function. Use this to submit the field-values which will be passed in as a parameter. It can make api calls syncronously or by returning a promise. It will only be called if the form fields are valid. An important point to make is that this function can throw an exception that passes error messages back to the form. If you do not pass an onSubmit prop a traditional submit will take place.|
| onSuccess          |          | Function. Use this to reset the form fields or show a feedback message etc. It will be passed the form instance as a parameter.|
| component          |          | String or node. This is what will be rendered as the outer element (default is form) |
| render             |          | function. A render function that will be called with props handleSubmit and elementRef |
| children           |          | Node or function. A function that will be called with props handleSubmit and elementRef. Or normal JSX children |

---
