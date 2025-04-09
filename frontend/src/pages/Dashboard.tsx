import { Content } from "../components/Content"
import { ContentItem } from "../App";
import { useEffect } from "react";
import { SearchBar } from "../components/SearchBar";


interface DashboardProps {
    isSharingBrain: boolean,
    setIsSharingBrain: React.Dispatch<React.SetStateAction<boolean>>,
    onContentAdded: () => void,
    onContentDeleted: () => void,
    reloadPage: () => void,
    userData: ContentItem[],
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Dashboard = (props: DashboardProps) => {

    useEffect(() => {
        props.reloadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    console.log(props.userData);

    return <>
    <div className='px-4 py-4'>
        <div className='sticky top-16 z-50'>
            <SearchBar 
            isSharingBrain={props.isSharingBrain} 
            setIsSharingBrain={props.setIsSharingBrain}
            onContentAdded={props.onContentAdded} 
            isDialogOpen={props.isDialogOpen} 
            setIsDialogOpen={props.setIsDialogOpen}
            />
        </div>
        <div className='z-40 flex flex-wrap gap-8 mt-10'> 
            {props.userData.map(dataItem => {
            return <Content 
            key={dataItem._id}
            id={dataItem._id}
            type={dataItem.type} 
            title={dataItem.title} 
            link={dataItem.link}
            tags={dataItem.tags} 
            createdAt={dataItem.createdAt}
            onContentDeleted={props.onContentDeleted}
            />
        })}
        </div>
    
    </div>
    </>
}