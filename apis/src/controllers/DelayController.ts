import { minMax } from '@utils/number';

export class DelayController {
  static DELAY_DEFAULT = 0;
  static DELAY_GET = 'delay';
  static DELAY_MAX = 2500;
  static DELAY_MIN = 0;

  static async applyDelay(searchParams: URLSearchParams) {
    const delayParam = parseInt(searchParams?.get(DelayController.DELAY_GET) || '', 10) || DelayController.DELAY_DEFAULT;
    const delay = minMax(delayParam, DelayController.DELAY_MIN, DelayController.DELAY_MAX);
    return await new Promise(resolve => setTimeout(() => resolve(true), delay));
  }
}
