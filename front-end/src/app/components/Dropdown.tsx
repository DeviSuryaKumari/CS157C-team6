"use client";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link';
import Cookies from 'js-cookie';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface DropdownProps {
    profilePicture: string;
}


export default function Dropdown({ profilePicture}: DropdownProps) {
    const handleLogout = () => {
        // Clear the cookie
        Cookies.remove('username');
    }

    return (
        <>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
                <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {/* User profile pictures will go here*/}
                        <img
                            className="h-8 w-8 rounded-full"
                            src={profilePicture}
                            alt=""
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/profile"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    View Profile
                                </a>
                            )}
                        </Menu.Item>
                        <Link href="\" onClick={handleLogout}>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Sign out
                                </a>
                            )}
                        </Menu.Item>
                        </Link>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
