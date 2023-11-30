"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    id: string;
    image: string;
    name: string;
    avatarUrl: string;
    title: string;
    userId: string;
}

const ProjectCard = ({ id, image, name, avatarUrl, title, userId }: Props) => {
    const [randomViews, setRandomViews] = useState(0);
    const [randomLikes, setRandomLikes] = useState('');

    useEffect(() => {
        setRandomViews(() =>  Math.floor(Math.random() * 10000));
        setRandomLikes(() => String((Math.floor(Math.random() * 10000) / 1000).toFixed(1)) + 'k');
    }, []);
    
    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
            <Link href={ `/project/${ id }` } className='flexCenter group relative w-full h-full'>
                <Image
                    src={ image }
                    width={414}
                    height={314}
                    className='w-full h-full object-cover rounded-2xl'
                    alt="Project Image"
                />

                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{ title }</p>
                </div>
            </Link>
            <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
                <Link href={ `/profile/${ userId }` }>
                    <div className="flexCenter gap-2">
                        <Image
                            src={ avatarUrl }
                            width={24}
                            height={24}
                            alt='Profile Image'
                            className='rounded-full'
                        />
                        <p>{ name }</p>
                    </div>
                </Link>
                <div className="flexCenter gap-3">
                    <div className="flexCenter gap-4">
                        <Image
                            src='/hearth.svg'
                            width={13}
                            height={12}
                            alt='Heart'
                        />
                        <p className="text-sm">{randomLikes}</p>
                    </div>
                    <div className="flexCenter gap-2">
                        <Image
                            src='/eye.svg'
                            width={13}
                            height={12}
                            alt='heart'
                        />
                        <p className="text-sm">{randomViews}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;