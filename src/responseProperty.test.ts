import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isExactProperty } from "./responseProperty";

describe("responseProperty", () => {
  it("correct type", () => {
    const test: PageObjectResponse["properties"] = {
      test_key: {
        type: "number",
        number: 123,
        id: "id",
      },
    };

    const test_key = test.test_key;
    if (isExactProperty("number", test_key)) {
      console.log(test_key.number);
    }
  });
});
