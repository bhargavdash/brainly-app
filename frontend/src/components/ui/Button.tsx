import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactElement | null,
    endIcon?: ReactElement,
    onClick: () => void | Promise<void>; 
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


export const Button = (props: ButtonProps) => {
    const size = sizeChart[props.size];
    return <>
        <div onClick={props.onClick} className={`hover:cursor-pointer flex gap-1 rounded-md justify-center items-center
            ${variantStyles[props.variant]}
            ${size.w} ${size.h}
            }`}>
            {props.startIcon}
            <p className='font-bold'>{props.text}</p>
            {props.endIcon}
        </div>
    </>
}

