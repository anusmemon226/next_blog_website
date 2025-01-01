import React from 'react'

function CommentCard({name,comment}:{name:string,comment:string}) {
  return (
    <div className='bg-gray-100 py-4 px-2 shadow-sm shadow-gray-500 mb-4'>
        <h2 className='font-bold'>{name}</h2>
        <p>{comment}</p>
    </div>
  )
}

export default CommentCard