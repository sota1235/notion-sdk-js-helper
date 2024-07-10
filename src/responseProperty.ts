import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Properties = PageObjectResponse["properties"];
type Property = Properties[string];
export type ResponsePropertyBlock<T extends string> = Extract<
  Property,
  { type: T }
>;

export const isExactProperty = <T extends string>(
  type: T,
  property: Property,
): property is ResponsePropertyBlock<T> => {
  return property.type === type;
};
