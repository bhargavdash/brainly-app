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
    "sm": "w-20 p-1",
    "md": "w-24 p-2",
    "lg": "w-36 p-2",
    "xl": "w-40 p-2" 
}


const disabledStyle = "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60";

export const Button = (props: ButtonProps) => {
    const size = sizeChart[props.size];

    const variantStyles = {
        "primary": props.hasBackground ? "transition-all transform duration-300 bg-gradient-to-b from-blue-950 to-blue-900 hover:underline" : "hover:underline",
        "secondary": props.hasBackground ? "transition-all transform duration-300 bg-gradient-to-b from-blue-700 to-blue-800 hover:underline" : "hover:underline"
    }
    const baseStyle = props.disabled ? disabledStyle : variantStyles[props.variant];
    
    const handleClick = () => {
        if(props.disabled) return;
        props.onClick();
    }
    return <>
        <div onClick={handleClick}  className={`flex gap-2 rounded-md justify-center items-center
            ${baseStyle}
            ${size}
            ${props.disabled ? "hover:cursor-events-none" : "hover:cursor-pointer"}
            }`}>
            {props.startIcon}
            <p className='font-bold'>{props.text}</p>
            {props.endIcon}
        </div>
    </>
}

