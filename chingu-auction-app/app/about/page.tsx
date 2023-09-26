'use client'

import React from 'react'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import NextJs from '@/public/assets/icons/nextjs.png'
import MySql from '@/public/assets/icons/mysql.png'
import TypeScript from '@/public/assets/icons/typescript.png'
import Github from '@/public/assets/icons/github.png'
import Prisma from '@/public/assets/icons/prisma.png'
import PlanetScale from '@/public/assets/icons/planetscale.png'
import Tailwind from '@/public/assets/icons/tailwind.png'
import curtImg from '@/public/assets/images/curt.png'
import yongImg from '@/public/assets/images/yong.png'
import ebrahimImg from '@/public/assets/images/ebrahim.jpg'
import Link from 'next/link'

export default function About() {
  return (
    <div className='max-w-[1000px] mx-auto p-4 flex flex-col items-center justify-center w-full h-full'>
      <div className='mb-6'>
        <h1 className='text-4xl text-center m-4 '>Meet Chingu Trio-Coders</h1>
        <h4 className='text-xl text-center mb-4'>
          A Trio of coders, in voyage 45, group 46, collaborated togehter to
          create an auction site
        </h4>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='flex flex-col w-[240px]'>
          <Image
            src={curtImg}
            width={240}
            height={240}
            className='mb-4 rounded-md'
            alt='curt-image'
          />
          <div>
            <p className='mb-4'>
              Meet Curt, a backend guru/engineer who enjoys learning new BE
              technologies and making beautiful apps.
            </p>
          </div>
        </div>
        <div className='flex flex-col w-[240px]'>
          <Link
            href='https://www.linkedin.com/in/yong-cho-dev/'
            target='_blank'
          >
            <Image
              src={yongImg}
              width={240}
              height={240}
              className='mb-4 rounded-md'
              alt='yong-image'
            />
          </Link>
          <div>
            <p className='mb-4'>
              Meet Yong, who enjoys making useful apps, fun apps, learning new
              tech stack, and collaborating with others to create apps.
            </p>
          </div>
        </div>
        <div className='flex flex-col w-[240px]'>
          <Link
            href='https://www.linkedin.com/in/ebrahim-haji/'
            target='_blank'
          >
            <Image
              src={ebrahimImg}
              width={240}
              height={240}
              className='mb-4 rounded-md'
              alt='ebarahim-image'
            />
          </Link>
          <div>
            <p className='mb-4'>
              Meet Ebrahim, a frontend engineer, svelte specialist, and css
              purist, enjoys learning new tech and collaborating with other
              developers.
            </p>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <p className='text-4xl font-bold inline border-b-4 border-[#466294] '>
          TechStack
        </p>
        <p className='py-4'> These are the techstack our team used</p>
      </div>
      <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
        <div className='m-4'>
          <Image
            width={150}
            alt='Nextjs icon'
            src={NextJs}
            className='w-20 mx-auto mt-5 hover:scale-125'
          />
          <p className='my-4'>Next.Js</p>
        </div>

        <div>
          <Image
            width={150}
            alt='Typescript icon'
            src={TypeScript}
            className='w-20 mx-auto mt-5 hover:scale-125'
          />
          <p className='my-4'>TypeScript</p>
        </div>
        <div>
          <Image
            width={200}
            height={200}
            alt='Github icon'
            src={Github}
            className='w-20 mx-auto mt-5 hover:scale-125'
          />
          <p className='my-4'>Github</p>
        </div>
        <div>
          <Image
            width={200}
            height={200}
            alt='Prisma icon'
            src={Prisma}
            className='w-20 mx-auto mt-5 hover:scale-125'
          />
          <p className='my-4'>Prisma</p>
        </div>
        <div>
          <Image
            width={200}
            height={200}
            alt='Planetscale icon'
            src={PlanetScale}
            className='w-20 mx-auto mt-5 hover:scale-125'
          />
          <p className='my-4'>Planetscale</p>
        </div>
        <div>
          <Image
            width={200}
            height={200}
            alt='Tailwind icon'
            src={Tailwind}
            className='w-20 mx-auto mt-5 hover:scale-125'
          />
          <p className='my-4'>Tailwind</p>
        </div>
        <div>
          <Image
            width={200}
            height={200}
            alt='MySql icon'
            src={MySql}
            className='w-20 mx-auto mt-5 hover:scale-125'
          />
          <p className='my-4'>MySql</p>
        </div>
      </div>
    </div>
  )
}
