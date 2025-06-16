import type { APIRoute } from 'astro';
import { CacheController } from '@controllers/CacheController';

export const DELETE: APIRoute = CacheController.delete;

export const GET: APIRoute = CacheController.getAll;
