import { z } from "zod";

export const ImageSchema = z.object({
  edges: z.array(
    z.object({
      node: z.object({
        url: z.string().url(),
        altText: z.string().or(z.null()),
      }),
    })
  ),
});

export const PriceRangeSchema = z.object({
  minVariantPrice: z.object({
    amount: z.string(),
  }),
});

export const ProductQueryResult = z.object({
  data: z.object({
    collection: z.object({
      title: z.string(),
      products: z.object({
        edges: z.array(
          z.object({
            node: z.object({
              id: z.string(),
              title: z.string(),
              handle: z.string(),
              priceRange: PriceRangeSchema,
              images: ImageSchema,
            }),
          })
        ),
      }),
    }),
  }),
});

export const GetProductsInCollectionResult = z.array(
  z.object({
    node: z.object({
      title: z.string(),
      id: z.string(),
      handle: z.string(),
      priceRange: PriceRangeSchema,
      images: ImageSchema,
    }),
  })
);

export const AllProductsQueryResult = z.object({
  data: z.object({
    products: z.object({
      edges: z.array(
        z.object({
          node: z.object({
            handle: z.string(),
            id: z.string(),
          }),
        })
      ),
    }),
  }),
});

export const SlugsSchema = z.array(
  z.object({
    node: z.object({
      handle: z.string(),
      id: z.string(),
    }),
  })
);

export const ProductSchema = z.object({
  collections: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          products: z.object({
            edges: z.array(
              z.object({
                node: z.object({
                  priceRange: PriceRangeSchema,
                  handle: z.string(),
                  title: z.string(),
                  id: z.string(),
                  totalInventory: z.number(),
                  images: ImageSchema,
                }),
              })
            ),
          }),
        }),
      })
    ),
  }),
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  description: z.string(),
  images: ImageSchema,
  options: z.array(
    z.object({
      name: z.string(),
      values: z.array(z.string()),
      id: z.string(),
    })
  ),
  variants: z.object({
    edges: z.array(
      z.object({
        node: z.object({
          selectedOptions: z.array(
            z.object({
              name: z.string(),
              value: z.string(),
            })
          ),
          image: z.object({
            url: z.string().url(),
            altText: z.string().or(z.null()),
          }),
          title: z.string(),
          id: z.string(),
          availableForSale: z.boolean(),
          price: z.object({
            amount: z.string(),
          }),
        }),
      })
    ),
  }),
});

export const ProductQueryByHandle = z.object({
  data: z.object({
    product: ProductSchema,
  }),
});

export const CheckoutCreateSchema = z.object({
  data: z.object({
    checkoutCreate: z.object({
      checkout: z.object({
        id: z.string(),
        webUrl: z.string(),
      }),
    }),
  }),
});

export const CheckoutSchema = z.object({
  id: z.string(),
  webUrl: z.string(),
});

export type CartItemType = {
  id: string;
  variantQuantity: number;
};

export const CheckoutLineItemsReplaceSchema = z.object({
  data: z.object({
    checkoutLineItemsReplace: z.object({
      checkout: z.object({
        id: z.string(),
        webUrl: z.string(),
        lineItems: z.array(
          z.object({
            edges: z.array(
              z.object({
                node: z.object({
                  id: z.string(),
                  title: z.string(),
                  quantity: z.number(),
                }),
              })
            ),
          })
        ),
      }),
    }),
  }),
});

export const CheckoutUpdateSchema = z.object({
  id: z.string(),
  webUrl: z.string(),
  lineItems: z.array(
    z.object({
      edges: z.array(
        z.object({
          node: z.object({
            id: z.string(),
            title: z.string(),
            quantity: z.number(),
          }),
        })
      ),
    })
  ),
});

export const ProductByCollection = z.object({
  node: z.object({
    title: z.string(),
    id: z.string(),
    handle: z.string(),
    priceRange: PriceRangeSchema,
    images: ImageSchema,
  }),
});

export type ProductQueryResultType = z.infer<typeof ProductQueryResult>;
export type GetProductsInCollectionResultType = z.infer<
  typeof GetProductsInCollectionResult
>;
export type AllProductsQueryResultType = z.infer<typeof AllProductsQueryResult>;
export type SlugsType = z.infer<typeof SlugsSchema>;
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductQueryByHandleType = z.infer<typeof ProductQueryByHandle>;
export type CheckoutCreateType = z.infer<typeof CheckoutCreateSchema>;
export type CheckoutType = z.infer<typeof CheckoutSchema>;
export type CheckoutLineItemsReplaceType = z.infer<
  typeof CheckoutLineItemsReplaceSchema
>;
export type CheckoutUpdateType = z.infer<typeof CheckoutUpdateSchema>;
export type ProductByCollectionType = z.infer<typeof ProductByCollection>;

export type ShopifyDataType =
  | ProductQueryResultType
  | AllProductsQueryResultType
  | ProductQueryByHandleType
  | CheckoutCreateType
  | CheckoutLineItemsReplaceType;
