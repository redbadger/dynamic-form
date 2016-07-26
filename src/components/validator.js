import tv4 from 'tv4';
import formats from 'tv4-formats';

export const defaultMessage = 'Please check this field is filled in correctly';

export class Validator {
  constructor(api = tv4.freshApi()) {
    this.api = api;
    this.api.addFormat(formats);
  }

  normalizeNumberInputs(values, schema) {
    const returnValues = values;
    Object.keys(schema.properties).forEach(key => {
      if (schema.properties[key].type === 'number') {
        returnValues[key] = isNaN(returnValues[key]) ? undefined : Number(returnValues[key]);
      }
    });
    return returnValues;
  }

  removeOptionalEmptyValues(values) {
    const returnValues = JSON.parse(JSON.stringify(values));
    Object.keys(values).forEach(key => {
      if (values[key] === undefined || values[key] === null || values[key] === '') {
        delete returnValues[key];
      }
    });
    return returnValues;
  }

  check(values, schema) {
    let sanitisedValues = this.normalizeNumberInputs(values, schema);
    sanitisedValues = this.removeOptionalEmptyValues(sanitisedValues);
    return this.api.validateMultiple(sanitisedValues, schema).errors.reduce((prev, current) => {
      const key = current.params.key || current.dataPath.replace('/', '');

      return {
        ...prev,
        [key]: schema.properties[key] && schema.properties[key].errorMessage
                  ? schema.properties[key].errorMessage
                  : defaultMessage,
      };
    }, {});
  }
}

export default new Validator();
