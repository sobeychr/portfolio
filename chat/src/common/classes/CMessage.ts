export type CMessageParam = {
  chatUuid: string;
  content: string;
  timestamp: number;
  username: string;
};

export class CMessage implements CMessageParam {
  chatUuid: string;
  content: string;
  date: Date;
  dateStr: string;
  timeStr: string;
  key: string;
  timestamp: number;
  username: string;

  constructor(param: CMessageParam) {
    this.chatUuid = param?.chatUuid;
    this.content = param?.content;
    this.timestamp = param?.timestamp;
    this.username = param?.username;

    this.date = new Date(this.timestamp);
    this.dateStr = [
      this.date.toISOString().split('T')?.[0],
      this.date.toTimeString().split(' ')?.[0],
    ].join(' ');
    this.timeStr = this.date.toTimeString().split(' ')?.[0];

    this.key = `${this.chatUuid}-${this.timestamp}`;

    Object.freeze(this);
  }

  static generateList = (list: CMessageParam[]): CMessage[] => {
    return list.map(entry => new CMessage(entry)).sort(CMessage.sort);
  };

  static sort(a: CMessage, b: CMessage) {
    return a.timestamp > b.timestamp ? 1 : -1;
  }
};
