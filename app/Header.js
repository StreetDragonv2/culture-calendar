import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import Link from 'next/link';
import Gnb from './Gnb';
import HeaderUtil from './HeaderUtil';

export default async function Header(){
	let session=await getServerSession(authOptions);
	let user_name=session !== null ? session.user.name : undefined;

	return(
		<div id='header' className='header'>
			<div className='size clear'>
				<div className='logo'>
					<Link href='/' className='gsans' prefetch={false}>문화달력</Link>
				</div>
				<div className='gnb'>
					<Gnb></Gnb>
				</div>
				<div className='util'>
					<HeaderUtil user_name={user_name}></HeaderUtil>
				</div>
			</div>
		</div>
	)
}