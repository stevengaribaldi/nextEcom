import { TRPCError } from '@trpc/server';
import { privateProdure, router } from './trpc';
import { z } from 'zod';
import { getPayloadClient } from '../get-payload';
import payload from 'payload';
import { stripe } from '../lib/stripe';
import type Stripe from 'stripe';

export const paymentRouter = router({
  createSession: privateProdure
    .input(z.object({ productIds: z.array(z.string().min(1)).min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      let { productIds } = input;
      if (productIds.length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No products in cart',
        });
      }
      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: 'products',
        where: {
          id: { in: productIds },
        },
      });

      const filterProducts = products.filter((prod) => Boolean(prod.priceId));
      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          products: filterProducts.map((prod) => prod.id),
          user: user.id,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      filterProducts.forEach((products) => {
        line_items.push({
          price: products.priceId!,
          quantity: 1,
        });
      });
      line_items.push({
        price: process.env.STRIPE_FEE,
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      });
      try {
        const idempotencyKey = `checkout_${order.id}`;

        const stripeSession = await stripe.checkout.sessions.create(
          {
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderid=${order.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
            payment_method_types: ['amazon_pay', 'cashapp', 'card'],

            mode: 'payment',
            metadata: {
              userId: user.id,
              orderId: order.id,
            },
            line_items,
          },
          {
            idempotencyKey,
          },
        );
        return { url: stripeSession.url };
      } catch (err) {
        console.error('Failed to create Stripe session:', err);
        return { url: null };
      }
    }),
});
