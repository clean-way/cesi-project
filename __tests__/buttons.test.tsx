import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import PrimaryButton from '@/components/common/buttons/PrimaryButton';

test('renders primary button', () => {

    render(<PrimaryButton>PrimaryButton</PrimaryButton>);

    const button = screen.getByText("PrimaryButton");

    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-primary');
});