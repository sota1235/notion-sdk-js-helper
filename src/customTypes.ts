import type {
  CodeBlockObjectResponse,
  CreatePageParameters,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type Annotation = TextRichTextItemResponse["annotations"];
export type AnnotationForRequest = Partial<Annotation>;

// Workaround: Extract necessary types
export type BlockObjectRequest = Exclude<
  CreatePageParameters["children"],
  undefined
>[0];
export type NotionBlock<T extends string> = Extract<
  BlockObjectRequest,
  { [key in T]: any }
>;

// Enums
export type Emoji = Extract<
  Exclude<NotionBlock<"callout">["callout"]["icon"], undefined>,
  { [key in "emoji"]: any }
>["emoji"];

export type Language = CodeBlockObjectResponse["code"]["language"];

export type TextColor = Annotation["color"];
