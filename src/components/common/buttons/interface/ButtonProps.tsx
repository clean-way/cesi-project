export interface ButtonProps {
    text?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button",
    fullwidth?: boolean
}