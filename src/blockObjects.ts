import type { BlockObjectRequestWithoutChildren } from "@notionhq/client/build/src/api-endpoints.js";
import type { Emoji, Language, NotionBlock, TextColor } from "./customTypes.js";
import { DEFAULT_COLOR, type RichText, richText } from "./richTextObject.js";

type Text = string | RichText;
type TextForBlock = Text | Text[];

function forRichText(text: TextForBlock): RichText[] {
  if (Array.isArray(text)) {
    return text.map((t) => {
      if (typeof t === "string") {
        return richText(t);
      }

      return t;
    });
  }

  if (typeof text === "string") {
    return [richText(text)];
  }

  return [text];
}

// https://developers.notion.com/reference/block#paragraph-blocks
export const paragraph = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"paragraph"> => ({
  type: "paragraph",
  paragraph: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#heading-one-blocks
export const heading1 = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    isToggleable?: boolean;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"heading_1"> => ({
  type: "heading_1",
  heading_1: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    is_toggleable: options.isToggleable ?? false,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#heading-two-blocks
export const heading2 = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    isToggleable?: boolean;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"heading_2"> => ({
  type: "heading_2",
  heading_2: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    is_toggleable: options.isToggleable ?? false,
    children: options.children,
  },
});

// https://developers.notion.com/reference/block#heading-three-blocks
export const heading3 = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    isToggleable?: boolean;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"heading_3"> => ({
  type: "heading_3",
  heading_3: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    is_toggleable: options.isToggleable ?? false,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#callout-blocks
export const callout = (
  text: TextForBlock,
  icon: Emoji,
  options: {
    blockColor?: TextColor;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"callout"> => ({
  type: "callout",
  callout: {
    rich_text: forRichText(text),
    icon: {
      emoji: icon,
    },
    color: options.blockColor ?? DEFAULT_COLOR,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#quote-blocks
export const quote = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"quote"> => ({
  type: "quote",
  quote: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#bulleted-list-item-blocks
export const bulletedListItem = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"bulleted_list_item"> => ({
  type: "bulleted_list_item",
  bulleted_list_item: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#numbered-list-item-blocks
export const numberedListItem = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"numbered_list_item"> => ({
  type: "numbered_list_item",
  numbered_list_item: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#to-do-blocks
export const todo = (
  text: TextForBlock,
  options: {
    checked?: boolean;
    blockColor?: TextColor;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"to_do"> => ({
  type: "to_do",
  to_do: {
    rich_text: forRichText(text),
    checked: !!options.checked,
    color: options.blockColor ?? DEFAULT_COLOR,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#toggle-blocks
export const toggle = (
  text: TextForBlock,
  options: {
    blockColor?: TextColor;
    children?: BlockObjectRequestWithoutChildren[];
  } = {},
): NotionBlock<"toggle"> => ({
  type: "toggle",
  toggle: {
    rich_text: forRichText(text),
    color: options.blockColor ?? DEFAULT_COLOR,
    children: options.children ?? undefined,
  },
});

// https://developers.notion.com/reference/block#code-blocks
export const code = (
  text: TextForBlock,
  language: Language,
): NotionBlock<"code"> => ({
  type: "code",
  code: {
    rich_text: forRichText(text),
    language,
  },
});

// https://developers.notion.com/reference/block#embed-blocks
export const embed = (
  url: string,
  options: {
    captions?: RichText[];
  } = {},
): NotionBlock<"embed"> => ({
  type: "embed",
  embed: {
    url,
    caption: options.captions,
  },
});

// https://developers.notion.com/reference/block#image-blocks
export const image = (
  url: string,
  options: {
    captions?: RichText[];
  } = {},
): NotionBlock<"image"> => ({
  type: "image",
  image: {
    external: {
      url,
    },
    caption: options.captions,
  },
});

// https://developers.notion.com/reference/block#video-blocks
export const video = (
  url: string,
  options: {
    captions?: RichText[];
  } = {},
): NotionBlock<"video"> => ({
  type: "video",
  video: {
    external: {
      url,
    },
    caption: options.captions,
  },
});

// https://developers.notion.com/reference/block#file-blocks
export const file = (
  url: string,
  options: { captions?: RichText[] } = {},
): NotionBlock<"file"> => ({
  type: "file",
  file: {
    external: {
      url,
    },
    caption: options.captions,
  },
});

// https://developers.notion.com/reference/block#pdf-blocks
export const pdf = (
  url: string,
  options: { captions?: RichText[] } = {},
): NotionBlock<"pdf"> => ({
  type: "pdf",
  pdf: {
    external: {
      url,
    },
    caption: options.captions,
  },
});

// https://developers.notion.com/reference/block#bookmark-blocks
export const bookmark = (
  url: string,
  options: {
    captions?: RichText[];
  } = {},
): NotionBlock<"bookmark"> => ({
  type: "bookmark",
  bookmark: {
    url,
    caption: options.captions,
  },
});

// https://developers.notion.com/reference/block#equation-blocks
export const equation = (expression: string): NotionBlock<"equation"> => ({
  type: "equation",
  equation: {
    expression,
  },
});

// https://developers.notion.com/reference/block#divider-blocks
export const divider = (): NotionBlock<"divider"> => ({
  type: "divider",
  divider: {},
});

// https://developers.notion.com/reference/block#table-of-contents-blocks
export const tableOfContents = (
  blockColor?: TextColor,
): NotionBlock<"table_of_contents"> => ({
  type: "table_of_contents",
  table_of_contents: {
    color: blockColor ?? DEFAULT_COLOR,
  },
});

// https://developers.notion.com/reference/block#breadcrumb-blocks
export const breadcrumb = (): NotionBlock<"breadcrumb"> => ({
  type: "breadcrumb",
  breadcrumb: {},
});

// https://developers.notion.com/reference/block#column-list-and-column-blocks
export const columnList = (
  children: NotionBlock<"column">[],
): NotionBlock<"column_list"> => ({
  type: "column_list",
  column_list: {
    children,
  },
});

// https://developers.notion.com/reference/block#column-list-and-column-blocks
export const column = (
  children: BlockObjectRequestWithoutChildren[],
): NotionBlock<"column"> => ({
  type: "column",
  column: {
    children: children,
  },
});

// https://developers.notion.com/reference/block#template-blocks
export const template = (
  text: TextForBlock,
  children: BlockObjectRequestWithoutChildren[],
): NotionBlock<"template"> => ({
  type: "template",
  template: {
    rich_text: forRichText(text),
    children,
  },
});

// https://developers.notion.com/reference/block#link-to-page-blocks
export const linkToPage = (pageId: string): NotionBlock<"link_to_page"> => ({
  type: "link_to_page",
  link_to_page: {
    page_id: pageId,
  },
});

// https://developers.notion.com/reference/block#synced-block-blocks
export const syncedBlock = (
  blockId: string | undefined,
  children?: BlockObjectRequestWithoutChildren[],
): NotionBlock<"synced_block"> => {
  const syncedFrom =
    blockId !== undefined
      ? {
          block_id: blockId,
        }
      : null;
  return {
    type: "synced_block",
    synced_block: {
      synced_from: syncedFrom,
      children: children ?? undefined,
    },
  };
};

// https://developers.notion.com/reference/block#table-blocks
export const table = (
  width: number,
  children: NotionBlock<"table_row">[],
  options: {
    has_column_header?: boolean;
    has_row_header?: boolean;
  } = {},
): NotionBlock<"table"> => ({
  type: "table",
  table: {
    table_width: width,
    children,
    has_column_header: !!options.has_column_header,
    has_row_header: !!options.has_row_header,
  },
});

// https://developers.notion.com/reference/block#table-row-blocks
export const tableRow = (texts: TextForBlock[]): NotionBlock<"table_row"> => ({
  type: "table_row",
  table_row: {
    cells: texts.map((text) => forRichText(text)),
  },
});
