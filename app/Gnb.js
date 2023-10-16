'use client'

import { usePathname } from 'next/navigation';
import Link from "next/link"
import { useEffect, useState } from 'react';

export default function Gnb(){
	let [gnbShow,SetGnbShow]=useState(false);
	useEffect(()=>{
		SetGnbShow(true);
	});
	const pathname=usePathname();
	const gnbList=[
		{name:'기록',path:'/record'},
		{name:'연극',path:'/event/AAAA'},
		{name:'무용',path:'/event/BBBC'},
		{name:'클래식',path:'/event/CCCA'},
		{name:'뮤지컬',path:'/event/GGGA'},
	];

	return(
		gnbShow
		&&
		<ul className='clear'>
			{
				gnbList.map((data,i)=>{
					return(
						<li key={`gnbList${i}`} className={ pathname.includes(data.path) ? 'on' : null }>
							<Link href={data.path} prefetch={false}>{data.name}</Link>
						</li>
					)
				})
			}
		</ul>
	)
}