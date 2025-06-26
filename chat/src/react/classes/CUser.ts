type CUserParam = {
  isLoggedIn?: boolean;
  username?: string;
};

export class CUser implements CUserParam {
  isLoggedIn: boolean;
  username: string;

  constructor(param: CUserParam = {}) {
    this.isLoggedIn = param?.isLoggedIn || false;
    this.username = param?.username || '';

    Object.freeze(this);
  }
};
