import { TextController } from '@controllers/TextController';
import type { APIRoute } from 'astro';

export const GET: APIRoute = TextController.getRandomTexts;
