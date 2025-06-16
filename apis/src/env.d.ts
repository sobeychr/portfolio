declare namespace App {
  import type { CRedis } from '@classes/CRedis';
  interface Locals {
    cache: CRedis;
  }
}
