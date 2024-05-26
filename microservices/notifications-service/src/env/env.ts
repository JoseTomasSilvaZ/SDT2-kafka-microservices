import { z } from 'zod';

export const envSchema = z.object({
  NOTIFICATION_SENDER: z.string(),
  NOTIFICATION_HOST: z.string(),
  NOTIFICATION_PORT: z.string().transform((port) => +port),
  NOTIFICATION_AUTH_USER: z.string(),
  NOTIFICATION_AUTH_PASS: z.string(),
});

export type Env = z.infer<typeof envSchema>;
