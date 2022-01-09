import  { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

import {Sidebar, UserProfile }from '../components';
import Pins from './Pins';
import { client } from '../lib/client';

const HomeContainer = () => {
    const router = useRouter();
    const [toggleSidebar, setToggleSidebar] = useState(true);
    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar />
            </div>
            <div className="flex md:hidden flex-row items-center">
                <HiMenu fontSize={35} className='cursor-pointer' onClick={() => setToggleSidebar(false)}/>
                <Link href={'/'}>
                    <a>
                        <Image src="/logo.png" alt="logo" width={120} height={28} className='w-[28px]' />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default HomeContainer
