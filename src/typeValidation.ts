import {
  CreatePageResponse,
  GetPageResponse,
  PageObjectResponse,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints';

// Check by the presence or absence of the url parameter
export const isPageObjectResponse = (
  page: CreatePageResponse | GetPageResponse | UpdatePageResponse,
): page is PageObjectResponse => {
  return (page as any).url !== undefined;
};