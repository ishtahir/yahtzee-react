import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("should render App", () => {
    render(<App />);
    expect(screen).toBeTruthy();
  });
});
