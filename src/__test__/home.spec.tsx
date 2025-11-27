import HomePage from "~app/page";
import { SITE_CONFIG } from "~config/site";

import { render } from "./test-utils";

describe("Testing page example", () => {
  it("should find the title", () => {
    const { getAllByText } = render(<HomePage />);
    // Match 'Numize' case-insensitively
    const titles = getAllByText(new RegExp(`^${SITE_CONFIG.title}$`, "iu"));
    expect(titles.length).toBeGreaterThan(0);
  });
});
