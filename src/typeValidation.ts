import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";

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
