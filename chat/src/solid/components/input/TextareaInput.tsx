export const DEFAULT_REGEXP = /([^A-z0-9-\_\n\ ]|\[|\])/g;

export const TextareaInput = ({ id, name: nameParam, onChange: onChangeParam, regexp: regexpParam, ref, ...rest }) => {
  let inputRef;

  const name = nameParam || id;
  const regexp = regexpParam || DEFAULT_REGEXP;

  const onChange = (e: Event) => {
    const valuePre = (ref || inputRef)?.current.value || '';
    const valuePost = valuePre.replace(regexp, '');

    if (ref?.current) ref.current.value = valuePost;
    else if (inputRef?.current) inputRef.current.value = valuePost;

    if (typeof onChangeParam === 'function') {
      onChangeParam(e);
    }
  };

  return <textarea id={id} name={name} onChange={onChange} ref={ref || inputRef} {...rest} />;
};
