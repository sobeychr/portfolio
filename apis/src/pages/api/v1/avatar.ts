import type { APIRoute } from 'astro';
import { AvatarController } from '@controllers/AvatarController';

export const GET: APIRoute = AvatarController.getRandomAvatars;
