import type { APIRoute } from 'astro';
import { CacheController } from '@controllers/CacheController';

export const GET: APIRoute = CacheController.getAll;
