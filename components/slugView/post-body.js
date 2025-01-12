import React from 'react'
import Tiptap from '../TipTap';

export default function PostBody({ content }) {

  return (
    <>
      <h1 className='section-head text-xl md:text-2xl lg:text-3xl font-bold mt-10 md:mt-20 mb-4 text-black'>Deep Dive.</h1>
      <div className='border-2 rounded-lg'>
        <div className='ml-2'>
          <Tiptap content={content} editMode={false}/>
        </div>
      </div>
    </>
  )
}
