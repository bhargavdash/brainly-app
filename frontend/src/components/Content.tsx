import { DeleteIcon } from "../icons/DeleteIcon"
import { DocumentIcon } from "../icons/DocumentIcon"
import { ShareIcon } from "../icons/ShareIcon"

export const Content = () => {
    return <>
        <div className='w-64 p-4 h-80 bg-gray-900 text-white rounded-lg'>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <DocumentIcon size="md" />
                    <p className='text-lg'>Project Ideas</p>
                </div>
                <div className='flex gap-2'>
                    <ShareIcon size='md' />
                    <DeleteIcon size='md' />
                </div>
            </div>
            <div>
                <p className="text-2xl font-bold mt-2">Future Projects</p>
            </div>
            <div className='mt-2 text-lg'>
                <ul>
                    <li>Build a personal knowledge base</li>
                    <li>Create a habit tracker</li>
                    <li>Design a minimalist todo app</li>
                </ul>
            </div>
            <div className="mt-2 flex gap-2 text-xl">
                <div className='bg-purple-200 text-blue-800'>
                    #productivity
                </div>
                <div className='bg-purple-200 text-blue-800'>
                    #ideas
                </div>
            </div>
            <div className='mt-2 text-xl'>
                Added on 10/3/2024
            </div>
        </div>
    </>
}