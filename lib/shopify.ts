import type {
  ProductQueryResultType,
  AllProductsQueryResultType,
  SlugsType,
  GetProductsInCollectionResultType,
  ProductQueryByHandleType,
  ProductType,
  CheckoutCreateType,
  CheckoutType,
  CartItemType,
  CheckoutLineItemsReplaceType,
  CheckoutUpdateType,
  ShopifyDataType,
} from "@/types/shopify";
import {
  ProductQueryResult,
  AllProductsQueryResult,
  SlugsSchema,
  GetProductsInCollectionResult,
  ProductQueryByHandle,
  CheckoutCreateSchema,
} from "@/types/shopify";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData<T extends ShopifyDataType>(query: string) {
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json() as Promise<T>;
    });

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection(): Promise<GetProductsInCollectionResultType> {
  const query = `{
    collection(handle: "flower-subscriptions") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
               edges {
                node {
                  url
                  altText
                }
              } 
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData<ProductQueryResultType>(query);
  ProductQueryResult.parse(response);

  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  GetProductsInCollectionResult.parse(allProducts);
  return allProducts;
}

export async function getAllProducts(): Promise<SlugsType> {
  const query = `{
    products(first: 25) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }`;

  const response = await ShopifyData<AllProductsQueryResultType>(query);
  AllProductsQueryResult.parse(response);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  SlugsSchema.parse(slugs);

  return slugs;
}

export async function getProduct(handle: string): Promise<ProductType> {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  totalInventory
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            price {
              amount
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData<ProductQueryByHandleType>(query);
  ProductQueryByHandle.parse(response);

  const product: ProductType = response.data.product
    ? response.data.product
    : ({} as ProductType);

  return product;
}

export async function createCheckout(
  id: string,
  quantity: number
): Promise<CheckoutType> {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData<CheckoutCreateType>(query);
  CheckoutCreateSchema.parse(response);

  const checkout: CheckoutType = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : ({} as CheckoutType);

  return checkout;
}

export async function updateCheckout(
  id: string,
  lineItems: CartItemType[]
): Promise<CheckoutUpdateType> {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`;
  });

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData<CheckoutLineItemsReplaceType>(query);
  const checkout: CheckoutUpdateType = response.data.checkoutLineItemsReplace
    .checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : ({} as CheckoutUpdateType);

  return checkout;
}
