import { render, userEvent, waitFor } from "~__test__/test-utils";

import ChangeLanguageButton from "./ChangeLanguageButton";

describe("ChangeLanguageButton", () => {
  it("initial render should have button text in english", () => {
    const { getByText } = render(<ChangeLanguageButton />);
    expect(getByText(/change language/iu)).toBeInTheDocument();
  });

  it("pressing the button changes the button text to french when the promise resolves", async () => {
    const user = userEvent.setup();
    const { getByText } = render(<ChangeLanguageButton />);
    await user.click(getByText(/change language/iu));

    await waitFor(() => {
      expect(getByText(/changer la langue/iu)).toBeInTheDocument();
    });
  });
});
