import type {
  BlockObjectResponse,
  CreatePageResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  UpdatePageResponse,
} from "@notionhq/client/build/src/api-endpoints.js";

// Check by the presence or absence of the url parameter
export const isPageObjectResponse = (
  page: CreatePageResponse | GetPageResponse | UpdatePageResponse,
): page is PageObjectResponse => {
  return (page as any).url !== undefined;
};

// BlockObjectResponse
export const isBlockObjectResponse = (
  result: ListBlockChildrenResponse["results"][0],
): result is BlockObjectResponse => {
  return (result as any).type !== undefined;
};
export type SomeBlockObjectResponse<T extends string> = Extract<
  BlockObjectResponse,
  { type: T }
>;
export const isSomeBlockObjectResponse = <T extends string>(
  type: T,
  object: BlockObjectResponse,
): object is SomeBlockObjectResponse<T> => {
  return object.type === type;
};
