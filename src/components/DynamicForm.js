import React, { Component, PropTypes } from 'react';
import Form from './Form';
import { reduxForm } from 'redux-form';
import validator from './validator';

const { shape, object, func, string, bool } = PropTypes;
const FormContainer = reduxForm()(Form);

export default class DynamicForm extends Component {
  static propTypes = {
    alwaysShowErrors: bool,
    initialValues: object,
    onSubmit: func.isRequired,
    readOnly: bool,
    schema: shape({
      properties: object,
    }).isRequired,
    style: string,
    submitText: string,
  };

  validate = values => {
    const { schema } = this.props;
    return validator.check(values, schema);
  }

  render() {
    const {
      alwaysShowErrors,
      initialValues,
      onSubmit,
      readOnly,
      schema,
      style,
      submitText,
    } = this.props;
    if (schema.properties) {
      const fields = Object.keys(schema.properties);
      const initValues = fields.reduce((values, field) => {
        if (values && values[field] === undefined) {
          const schemaField = schema.properties[field];
          switch (schemaField.editor) {
            case 'RadioInput':
              return {
                ...values,
                [field]: schemaField.enum[0],
              };
            case 'MultiCheckboxes':
              return {
                ...values,
                [field]: schemaField.options.ids,
              };
            default:
              return values;
          }
        }
        return values;
      }, initialValues || {});

      return (
        <FormContainer
          fields={fields}
          form={schema.title}
          initialValues={initValues}
          onSubmit={onSubmit}
          readOnly={readOnly}
          schema={schema}
          style={style}
          submitText={submitText}
          validate={this.validate}
        />
      );
    }
    return null;
  }
}
