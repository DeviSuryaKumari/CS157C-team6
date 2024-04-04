import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import { StaticImageData } from 'next/image';
import Image1 from '../../../public/logo.png';
import Image2 from '../../../public/logo.png';
import Image3 from '../../../public/logo.png';
import ButtonIcon1 from '../../../public/logo.png';
import ButtonIcon2 from '../../../public/logo.png';
import ButtonIcon3 from '../../../public/logo.png';

export default function Home() {

    interface Item {
        img: StaticImageData;
        desc: string;
        buttonIcon: StaticImageData;
    }

    const items: Item[] = [
        {
            img: Image1,
            desc: 'Description 1',
            buttonIcon: ButtonIcon1
        },
        {
            img: Image2,
            desc: 'Description 2',
            buttonIcon: ButtonIcon2
        },
        {
            img: Image3,
            desc: 'Description 3',
            buttonIcon: ButtonIcon3
        },
        {
            img: Image3,
            desc: 'Description 4',
            buttonIcon: ButtonIcon3
        }
        
    ];

    return (
        <div className="h-screen w-screen">
            <Navbar />
            <div className="justify-center items-center mt-52">
                <Carousel items={items} />
            </div>
        </div>
    )
}