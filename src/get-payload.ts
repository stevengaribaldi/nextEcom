import dotenv from 'dotenv';
import path from 'path';
import type { InitOptions } from 'payload/config';
import payload, { Payload } from 'payload';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

let cached = (global as any).payload;
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  InitOptions?: Partial<InitOptions>;
}
export const getPayloadClient = async ({
  InitOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('Payload secret is MISSING');
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: InitOptions?.express ? false : true,
      ...(InitOptions || {}),
    });
  }
  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    console.log('cached promise error', e);
    throw e;
  }
  return cached.client;
};
