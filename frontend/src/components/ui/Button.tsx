import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary",
    hasBackground: boolean,
    size: "sm" | "md" | "lg" | "xl",
    text: string,
    startIcon?: ReactElement | null,
    endIcon?: ReactElement,
    onClick: () => void | Promise<void>,
    disabled?: boolean
}

const sizeChart = {
    "sm": {w: "w-12", h: "h-6"},
    "md": {w: "w-24", h: "h-8"},
    "lg": {w: "w-36", h: "h-10"},
    "xl": {w: "w-40", h: "h-12"}
}


const disabledStyle = "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60";

export const Button = (props: ButtonProps) => {
    const size = sizeChart[props.size];

    const variantStyles = {
        "primary": props.hasBackground ? "bg-gradient-to-b from-blue-950  to-blue-900" : "hover:underline",
        "secondary": props.hasBackground ? "bg-gradient-to-b from-blue-950  to-blue-900" : "hover:underline"
    }
    const baseStyle = props.disabled ? disabledStyle : variantStyles[props.variant];
    
    const handleClick = () => {
        if(props.disabled) return;
        props.onClick();
    }
    return <>
        <div onClick={handleClick}  className={`flex gap-2 rounded-md justify-center items-center
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

