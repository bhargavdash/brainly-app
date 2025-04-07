import { Content } from "../components/Content"
import { ContentItem } from "../App";
import { useEffect } from "react";


interface DashboardProps {
    reloadPage: () => void,
    onContentDeleted: () => void,
    userData: ContentItem[]
}

export const Dashboard = (props: DashboardProps) => {

    useEffect(() => {
        props.reloadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    console.log(props.userData);
    return <>
    <div className='px-4 py-4 flex flex-wrap gap-8'>
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
    </>
}