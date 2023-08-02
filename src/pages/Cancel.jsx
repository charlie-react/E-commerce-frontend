import React from 'react'
import {FcCancel} from "react-icons/fc"
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div>
        <div className="flex mx-auto flex-col gap-3 max-w-md h-36 items-center bg-slate-200 p-5 m-5">
            <h1 className='flex items-center text-red-700 font-bold'>
                <span>
                    Payment was unsuccessful!
                </span>
                <FcCancel/>
            </h1>
            <Link to={'/'}>
                <button className='bg-green-500 hover:bg-green-700 rounded-md p-2 text-white'>
                    Go Back Home
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Cancel