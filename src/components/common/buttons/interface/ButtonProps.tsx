export interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button",
    fullwidth?: boolean,
    children?: string | JSX.Element | JSX.Element[],
    disabled?: boolean
}