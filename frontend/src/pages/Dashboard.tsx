import { Content } from "../components/Content"
import { ContentItem } from "../App";


interface DashboardProps {
    onContentDeleted: () => void,
    userData: ContentItem[]
}

export const Dashboard = (props: DashboardProps) => {

    console.log(props.userData);
    return <>
    <div>
        Problems: 
        <p>1. When another user logs in , he has to refresh to get his content</p>
        <p>2. On add content , the component does not automatically fetches data. Works for delete but not here</p>

    </div>
    <div className='px-4 py-4 flex flex-wrap gap-8'>
    {props.userData.map(dataItem => {
        return <Content 
        key={dataItem._id}
        id={dataItem._id}
        type={dataItem.type} 
        title={dataItem.title} 
        link={dataItem.link}
        tags={dataItem.tags} 
        onContentDeleted={props.onContentDeleted}
        />
    })}
    </div>
    </>
}