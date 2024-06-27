import PrimaryButton from '../src/components/common/buttons/PrimaryButton.tsx';
import SecondaryButton from '../src/components/common/buttons/SecondaryButton.tsx';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("PrimaryButton", () => {
  it("render PrimaryButton", () => {
    render(<PrimaryButton>TEST</PrimaryButton>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
});

describe("SecondaryButton", () => {
  it("render SecondaryButton", () => {
    render(<SecondaryButton>TEST</SecondaryButton>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
});