type BaseRequestParam = {
  asJson?: boolean;
  getData?: object;
  method?: 'get' | 'post' | undefined;
  headers?: object;
  origin?: string;
  postData?: object;
  url: string;
};

export const baseRequest = async ({
  asJson = true,
  getData = {},
  method,
  headers = {},
  origin = '',
  postData = {},
  url,
}: BaseRequestParam): Promise<object | string> => {
  const request = new URL(url, origin || window.location.origin);

  Object.keys(getData).forEach(key => request.searchParams.append(key, getData[key]));
  const hasPost = Object.keys(postData).length > 0;

  const contentType = asJson ? 'application/json' : 'text/plain';

  return fetch(request, {
    body: !hasPost ? null : JSON.stringify(postData),
    headers: new Headers({
      ...headers,
      'Content-Type': `${contentType};charset=utf-8`,
    }),
    method: method || (hasPost && 'post') || 'get',
  })
    .then(resp => asJson && resp.json() || resp.text())
    .catch(err => {
      console.error('[formRequest()] error', err);
    });
};

type FormRequestParam = {
  asJson?: boolean;
  form: HTMLFormElement;
  origin?: string;
};

export const formRequest = async ({
  asJson = true,
  form,
  origin = '',
}: FormRequestParam): Promise<object | string> => {
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const isGet = method === 'get';

  return baseRequest({
    asJson,
    getData: isGet ? data : {},
    method,
    origin,
    postData: isGet ? {} : data,
    url,
  });
};
