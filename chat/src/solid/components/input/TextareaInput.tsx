export const DEFAULT_REGEXP = /([^A-z0-9-\_\n\ ]|\[|\])/g;

export const TextareaInput = ({ id, name: nameParam, onKeyUp: onKeyUpParam, regexp: regexpParam, ref, ...rest }) => {
  let inputRef;

  const name = nameParam || id;
  const regexp = regexpParam || DEFAULT_REGEXP;

  const onKeyUp = (e: Event) => {
    const valuePre = (ref || inputRef)?.value || '';
    const valuePost = valuePre.replace(regexp, '');

    if (ref) ref.value = valuePost;
    else if (inputRef) inputRef.value = valuePost;

    if (typeof onKeyUpParam === 'function') {
      onKeyUpParam(e);
    }
  };

  return <textarea id={id} name={name} onKeyUp={onKeyUp} ref={ref || inputRef} {...rest} />;
};
