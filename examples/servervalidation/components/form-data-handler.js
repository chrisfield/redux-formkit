export const createFormDataHandler = (fieldDefinitions, formValidation=noop) => (
  async (data, {isAlreadyFormattedForStore = true}={}) => {
    const formDataHandler = new FormDataHandler(fieldDefinitions);

    console.log('isAlreadyFormattedForStore:', isAlreadyFormattedForStore);
    console.log('data:', data);
  
    const storeValues = isAlreadyFormattedForStore? data : formDataHandler.formatValuesToStore(data)
    return {
      fieldValues: storeValues,
      fieldStatus: formDataHandler.validate(storeValues),
      formStatus: {errorCount: formDataHandler.errorCount},
      fieldErrors: formValidation(storeValues) || {}
    }
  }  
);

export const getFieldDefinitionsByName = (definedFields) => {
  const fieldDefinitionsByName = {};
  definedFields.forEach(fieldDefinition => {
    if (fieldDefinition.fieldArray) {
      fieldDefinitionsByName[fieldDefinition.name] = getFieldDefinitionsByName(fieldDefinition.fieldArray);
    } else {
      fieldDefinitionsByName[fieldDefinition.name] = fieldDefinition;
    }
  });
  return fieldDefinitionsByName;
}

class FormDataHandler {
  constructor(fields) {
    this.fields = fields;
  }

  getField = name => (
    this.fields.filter(field => (field.name === name))[0]
  )

  formatValuesToStore = rawValues => {
    const values = {}
    this.fields.forEach(field => {
      const formatToStore = field.formatToStore
      values[field.name] = formatToStore ? formatToStore(rawValues[field.name]) : rawValues[field.name]
    })
    return values
  }

  formatValuesFromStore = (storeValues) => {
    const values = {}
    this.fields.forEach(field => {
      const formatFromStore = field.formatFromStore
      values[field.name] = formatFromStore ? formatFromStore(storeValues[field.name]) : storeValues[field.name]
    })
    return values
  }
 
  validate = values => {
    this.errorCount = 0;
    const errors = {}
    this.fields.forEach(field => {
      if (field.fieldArray) {
        errors[field.name] = this.validateArray(field.fieldArray, values[field.name], values)
      } else {
        errors[field.name] = this.validateField(field, values)
      }
    })
    return errors
  }
  
  noop = () => {};
  
  validateField = (field, values) => {
    let error
    const fieldValidation = field.validate || this.noop
    if (Array.isArray(fieldValidation)) {
      for (let i = 0; i < fieldValidation.length && !error; i++) {
        error = fieldValidation[i](values[field.name], values)
      }
    } else {
      error = fieldValidation(values[field.name], values)
    }
    const result = {touched: true}
    if (error) {
      this.errorCount ++
      result.error = error
    }
    return result
  }
  
  validateArray = (definition, array=[], values) => {
    return array.map(arrayItem => {
      const result = {}
      definition.forEach(field => {
        let error
        if (field.validate) {
          error = field.validate(arrayItem[field.name])
        }
        result[field.name] = {touched: true}
        if (error) {
          this.errorCount ++
          result[field.name].error = error
        }
      })
      return result
    })
  }  
}
