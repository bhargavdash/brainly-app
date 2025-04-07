import { DocumentIcon } from "../icons/DocumentIcon"
import { HashtagIcon } from "../icons/HashtagIcon"
import { LinkIcon } from "../icons/LinkIcon"
import { LogoIcon } from "../icons/LogoIcon"
import { XIcon } from "../icons/XIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SideBarOption } from "./ui/SideBarOption"


interface SidebarProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}


export const Sidebar = (props: SidebarProps) => {
    return <>
    <div className="bg-black text-white pl-4 pt-2 w-[20%] flex flex-col gap-8">
        <div className="flex gap-2 items-center">
            <LogoIcon size="lg"/>
            <p className="font-bold text-xl">Brainly</p>
        </div>
        {props.isLoggedIn && <div className='pl-4 flex flex-col gap-2'>
            <SideBarOption icon={<XIcon size='md'/>} title="Tweets" />
            <SideBarOption icon={<YoutubeIcon size='md'/>} title="Videos" />
            <SideBarOption icon={<DocumentIcon size='md'/>} title="Documents" />
            <SideBarOption icon={<LinkIcon size='md'/>} title="Links" />
            <SideBarOption icon={<HashtagIcon size='md'/>} title="Tags" />
        </div>}
    </div>
         
    </>
}