import React, { PropTypes } from 'react';
import TextInput from './TextInput';

const { string, bool, object } = PropTypes;

const InputField = props => {
  const Editor = undefined;

  return (
    <div>
      <div>{props.description}</div>
      {
        Editor
        ? (<Editor {...props} />)
        : (<TextInput id={props.name} {...props.input} />)
      }
      {props.error && <span>{props.error}</span>}
    </div>
  );
};

InputField.propTypes = {
  description: string,
  editor: string,
  informationMessage: string,
  required: bool,
  type: string,
  error: string,
  name: string,
  input: object.isRequired,
};

export default InputField;
