import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactElement | null,
    endIcon?: ReactElement,
    onClick: () => void | Promise<void>,
    disabled?: boolean
}

const sizeChart = {
    "sm": {w: "w-12", h: "h-10"},
    "md": {w: "w-20", h: "h-16"},
    "lg": {w: "w-36", h: "h-10"}
}

const variantStyles = {
    "primary": "hover:bg-blue-600 bg-purple-600 text-white",
    "secondary": "hover:bg-blue-200 bg-purple-300 text-purple-500"
}

const disabledStyle = "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60";

export const Button = (props: ButtonProps) => {
    const size = sizeChart[props.size];
    const baseStyle = props.disabled ? disabledStyle : variantStyles[props.variant];

    const handleClick = () => {
        if(props.disabled) return;
        props.onClick();
    }
    return <>
        <div onClick={handleClick}  className={`flex gap-1 rounded-md justify-center items-center
            ${baseStyle}
            ${size.w} ${size.h}
            ${props.disabled ? "hover:cursor-events-none" : "hover:cursor-pointer"}
            }`}>
            {props.startIcon}
            <p className='font-bold'>{props.text}</p>
            {props.endIcon}
        </div>
    </>
}

