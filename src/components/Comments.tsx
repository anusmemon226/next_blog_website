import React from 'react'
import CommentCard from './CommentCard'
import { SanityDocument } from 'next-sanity'

function Comments({comments}:{comments:SanityDocument[]}) {
    return (
        <div className='px-4 md:w-[75%] mx-auto py-2'>
            <h2 className='font-bold text-lg'>All Comments</h2>
            {
                comments.length != 0 ?
                comments.map((comment)=>{
                    return <CommentCard key={comment._id} name={comment.name} comment={comment.comment}/>
                }): <p className='text-center font-semibold'>No Comments Yet!</p>
            }
        </div>
    )
}

export default Comments