import { type ChangeEvent, useRef } from 'react';

export const DEFAULT_REGEXP = /([^A-z0-9-\_]|\[|\])/g;

export const TextInput = ({ id, name: nameParam, onChange: onChangeParam, regexp: regexpParam, ref, ...rest }) => {
  const inputRef = !ref && useRef(null);

  const name = nameParam || id;
  const regexp = regexpParam || DEFAULT_REGEXP;

  const onChange = (e: ChangeEvent) => {
    const valuePre = (ref || inputRef)?.current.value || '';
    const valuePost = valuePre.replace(regexp, '');

    if (ref?.current) ref.current.value = valuePost;
    else if (inputRef?.current) inputRef.current.value = valuePost;

    if (typeof onChangeParam === 'function') {
      onChangeParam(e);
    }
  };

  return <input type='text' id={id} name={name} onChange={onChange} ref={inputRef} {...rest} />;
};
