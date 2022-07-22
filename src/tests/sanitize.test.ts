import { Sanitize } from "../utils/functions/sanitize";

describe("Sanitize", () => {
  test("Sanitize <script>", () => {
    expect(Sanitize({ field: "<script>alert('hello')</script>" })).toEqual({
      field: "&lt;script&gt;alert('hello')&lt;/script&gt;",
    });
  });

  test("Sanitize <img>", () => {
    expect(Sanitize({ field: "<img src='null' onerror='alert(1)'/>" })).toEqual(
      { field: "<img src />" }
    );
  });

  test("Sanitize child fields", () => {
    expect(
      Sanitize({
        field: {
          child: "<script>alert('hello')</script>",
        },
      })
    ).toEqual({
      field: { child: "&lt;script&gt;alert('hello')&lt;/script&gt;" },
    });
  });
});
