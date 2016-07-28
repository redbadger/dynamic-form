import React, { Component, PropTypes } from 'react';
import InputField from './InputField';
import { Field } from 'redux-form';

const { func, shape, object, string, bool } = PropTypes;

export default class Form extends Component {
  static propTypes = {
    dirty: bool.isRequired, // redux-form
    handleSubmit: func.isRequired, // redux-form
    pristine: bool.isRequired,
    reset: func.isRequired, // redux-form
    schema: shape({
      properties: object,
    }).isRequired,
    style: string,
    submitText: string.isRequired,
    submitting: bool.isRequired,
    valid: bool.isRequired, // redux-form
  };

  onSubmit = (...args) => {
    const { handleSubmit, reset, valid, dirty } = this.props;
    if (valid && dirty) {
      handleSubmit(...args);
      reset();
    }
  }

  render() {
    const {
      pristine,
      schema: { properties },
      submitText,
      submitting,
    } = this.props;

    const inputFields = Object.keys(properties).map(key => (
      <Field component={InputField} key={key} name={key} {...properties[key]} />
    ));

    return (
      <form onSubmit={this.onSubmit}>
        {inputFields}
        <button type="submit" disabled={pristine || submitting}>
          {submitText}
        </button>
      </form>
    );
  }
}
