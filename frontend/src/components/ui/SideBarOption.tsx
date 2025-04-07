import { ReactElement } from "react"

interface SideBarOptionProps {
    icon: ReactElement,
    title: string
}

export const SideBarOption = (props: SideBarOptionProps) => {
    return <>
        <div className='flex items-center gap-3'>
            {props.icon}
            <p className='text-lg'>{props.title}</p>
        </div>
    </>
}