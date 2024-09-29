import * as z from "zod";

export const proxySchema = z.object({
  name: z.string({
    required_error: "Proxy name is required",
  }),
  host: z.string({
    required_error: "Proxy host is required",
  }),
  port: z.number({
    required_error: "Proxy port is required",
  }),
  username: z.string({
    required_error: "Proxy username is required",
  }),
  password: z.string({
    required_error: "Proxy password is required",
  }),
  rotation_link: z.string().optional(),
});

export type ProxySchemaType = z.infer<typeof proxySchema>;
