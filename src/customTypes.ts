import type {
  CodeBlockObjectResponse,
  CreatePageParameters,
  RichTextItemResponseCommon,
} from "@notionhq/client/build/src/api-endpoints.js";

export type Annotation = RichTextItemResponseCommon["annotations"];
export type AnnotationForRequest = Partial<Annotation>;

// Workaround: Extract necessary types
export type BlockObjectRequest = Exclude<
  CreatePageParameters["children"],
  undefined
>[0];

// Internal: BlockObjectWithSingleLevelOfChildrenRequest from the Notion SDK.
// This represents blocks that can appear as children of other blocks.
// Using this as the base for NotionBlock ensures that function return types
// are assignable to ChildBlockObject, enabling composition like:
//   paragraph("text", { children: [paragraph("inner")] })
type BlockObjectWithChildren = Exclude<
  Extract<BlockObjectRequest, { paragraph: any }>["paragraph"]["children"],
  undefined
>[0];

// Prefer the child-level variant for type compatibility.
// Fallback to BlockObjectRequest for top-level-only blocks (e.g. column, column_list).
export type NotionBlock<T extends string> = [
  Extract<BlockObjectWithChildren, { [key in T]: any }>,
] extends [never]
  ? Extract<BlockObjectRequest, { [key in T]: any }>
  : Extract<BlockObjectWithChildren, { [key in T]: any }>;

// Enums
export type Emoji = Extract<
  Exclude<NotionBlock<"callout">["callout"]["icon"], undefined>,
  { [key in "emoji"]: any }
>["emoji"];

// hack :(
export type RichTextForRequest =
  NotionBlock<"heading_1">["heading_1"]["rich_text"][0];

export type Language = CodeBlockObjectResponse["code"]["language"];

export type TextColor = Annotation["color"];

// Extract the children block type from NotionBlock (BlockObjectWithSingleLevelOfChildrenRequest)
export type ChildBlockObject = Exclude<
  NotionBlock<"paragraph">["paragraph"]["children"],
  undefined
>[0];
