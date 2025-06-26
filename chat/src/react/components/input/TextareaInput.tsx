import { ChangeEvent, useRef } from 'react';

export const DEFAULT_REGEXP = /([^A-z0-9-\_]|\[|\])/g;

export const TextAreaInput = ({ id, name: nameParam, onChange: onChangeParam, regexp: regexpParam, ...rest }) => {
  const inputRef = useRef(null);

  const name = nameParam || id;
  const regexp = regexpParam || DEFAULT_REGEXP;

  const onChange = (e: ChangeEvent) => {
    const valuePre = inputRef?.current.value || '';
    const valuePost = valuePre.replace(regexp, '');
    inputRef.current.value = valuePost;

    if (typeof onChangeParam === 'function') {
      onChangeParam(e);
    }
  };

  return <textarea id={id} name={name} onChange={onChange} ref={inputRef} {...rest} />;
};
