import type { APIRoute } from 'astro';
import { TextController } from '@controllers/TextController';

export const GET: APIRoute = TextController.getRandomTexts;
