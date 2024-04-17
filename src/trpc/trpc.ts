import { User } from '@/payload-types';
import { ExpressContext } from '@/server';
import { TRPCError, initTRPC } from '@trpc/server';
import { PayloadRequest } from 'payload/types';

const t = initTRPC.context<ExpressContext>().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest;

  const { user } = req as { user: User | null };

  if (!user || !user.id) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }
  return next({
    ctx: {
      user,
    },
  });
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProdure = t.procedure.use(isAuth);
