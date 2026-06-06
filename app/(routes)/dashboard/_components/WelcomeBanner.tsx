"use client"
import { useUser } from '@/lib/auth'
import Image from 'next/image'
import React, { useContext } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'

function WelcomeBanner() {
    const { user } = useUser();
    const { userDetail } = useContext(UserDetailContext) as any;
    const displayName = userDetail?.name || user?.fullName || 'Learner';
    return (
        <div className='flex gap-3 items-center'>
            <Image src={'/machine.webp'} alt='robo' width={120} height={120} />
            <h2 className='font-game text-2xl p-4 border w-full bg-zinc-800 rounded-lg rounded-bl-none'>
                Welcome Back <span className='text-yellow-500'>{displayName}</span>, Start Learning something new !</h2>
        </div>
    )
}

export default WelcomeBanner