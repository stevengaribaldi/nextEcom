import { publicProcedure, router } from './trpc';
import { authRouter } from './auth-router';
import { z } from 'zod';
export const appRouter = router({
  auth: authRouter,
  getInfiniteProducts: publicProcedure.input(
    z.object({
      limit: z.number().min(1).max(100),
      cursor
    }),
  ),
});

export type AppRouter = typeof appRouter;
