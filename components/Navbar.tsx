'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RiGithubFill } from '@remixicon/react';
import { login, logout } from '@/lib/auth-actions';
import { Session } from 'next-auth';

const Navbar = ({ session }: { session: Session | null }) => {
  console.log("Session:", session);
  return (
    <nav className='w-full shadow-md border-b border-gray-200 flex p-3 px-50'>
      <div className='container flex items-center justify-between w-full'>
        <Link href={'/'} className='flex justify-center items-center gap-3'>
          <Image src={"/logo.png"} alt='logo' width={50} height={50} />
          <span className='text-xl'>Travel Planner</span>
        </Link>
        <div className='flex items-center space-x-6'>
          {session ? (
            <>
              <Link href={'/trips'} className='text-slate-900 hover:text-sky-500'>My trips</Link>
              <Link href={'/globe'} className='text-slate-900 hover:text-sky-500'>Globe</Link>
              <button
                className='flex p-2 bg-slate-800 text-white justify-center items-center gap-1 hover:bg-slate-900 px-4'
                onClick={logout}
              >
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <button
              className='flex p-2 bg-slate-800 text-white justify-center items-center gap-1 hover:bg-slate-900 px-4'
              onClick={login}
            >
              <span>Sign In</span>
              <RiGithubFill />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar