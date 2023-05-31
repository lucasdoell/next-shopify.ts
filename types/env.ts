import { z } from "zod";

const envVariables = z.object({
  SHOPIFY_STORE_DOMAIN: z.string(),
  SHOPIFY_STOREFRONT_ACCESSTOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
