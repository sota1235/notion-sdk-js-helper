import { Annotation, AnnotationForRequest, TextColor } from './customTypes';
import { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

export const DEFAULT_COLOR: TextColor = 'default' as const;

// https://developers.notion.com/reference/rich-text
export type RichText = ReturnType<typeof richText>;

export const richText = (
  text: string,
  annotation?: AnnotationForRequest,
  link?: string | undefined,
): TextRichTextItemResponse => ({
  type: 'text',
  text: {
    content: text,
    link: link === undefined ? null : linkObject(link),
  },
  annotations: {
    ...defaultAnnotation,
    ...annotation,
  },
  plain_text: text,
  href: null,
});

// https://developers.notion.com/reference/rich-text#link-objects
export type LinkObject = Exclude<
  TextRichTextItemResponse['text']['link'],
  null
>;
export const linkObject = (link: string): LinkObject => ({
  url: link,
});

// https://developers.notion.com/reference/rich-text#annotations
export const defaultAnnotation: Annotation = {
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
  color: 'default',
};

export const annotation = (options: {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: TextColor;
}): Annotation => ({
  bold: options.bold || false,
  italic: options.italic || false,
  strikethrough: options.strikethrough || false,
  underline: options.underline || false,
  code: options.code || false,
  color: options.color || 'default',
});
