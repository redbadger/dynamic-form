import React, { PropTypes } from 'react';
import * as editors from './Editors';

const InputField = props => {
  const {
    input: {
      description,
      editor,
      ...editorProps,
    },
  } = props;
  const Editor = editors[editor] || editors.TextInput;

  return (
    <div>
      <div>{description}</div>
      <Editor {...editorProps} />
      {props.error && <span>{props.error}</span>}
    </div>
  );
};

const { string, shape } = PropTypes;

InputField.propTypes = {
  editor: string,
  error: string,
  input: shape({
    description: string.isRequired,
  }).isRequired,
};

export default InputField;
