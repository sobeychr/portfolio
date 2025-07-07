export const DEFAULT_REGEXP = /([^A-z0-9-\_]|\[|\])/g;

export const TextInput = ({ id, name: nameParam, regexp: regexpParam, ...rest }) => {
  const name = nameParam || id;
  const regexp = regexpParam || DEFAULT_REGEXP;

  const onInput = (e: Event) => {
    const valuePre = e?.target?.value || '';
    const valuePost = valuePre.replace(regexp, '');

    if (!!valuePre) e.target.value = valuePost;
  };

  return <input type='text' id={id} name={name} onInput={onInput} {...rest} />;
};
