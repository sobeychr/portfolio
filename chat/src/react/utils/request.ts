export const formRequest = async (form: HTMLFormElement, asJson = true): Promise<object | string> => {
  const url = form.getAttribute('action') as string;
  const method = form.getAttribute('method') as 'get' | 'post';
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const request = new URL(url, window.location.origin);
  if (method === 'get') {
    Object.keys(data).forEach(key => request.searchParams.append(key, data[key]));
  }
  const body = method === 'get' ? null : JSON.stringify(data);

  const contentType = asJson ? 'application/json' : 'text/plain';

  return fetch(url, {
    body,
    method,
    headers: new Headers({
      'Content-Type': `${contentType};charset=utf-8`,
    }),
  })
    .then(resp => asJson && resp.json() || resp.text())
    .catch(err => {
      console.error('[formRequest()] error', err);
    });
};
