import Calendar from "./Calendar";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default async function Event(){
	const db=(await connectDB).db("culture-calendar");

	let session=await getServerSession(authOptions);
	let author=await db.collection('user-account').findOne({id:'sample'});

	if(session !== null){
		author=await db.collection('user-account').findOne({id:session.user.id});
	}

	let record=await db.collection('event-record').find({author:author._id.toString()}).toArray();

	record.map((data)=>{
		data._id=data._id.toString()
	})

	return(
		<div className='sub record_list'>
			{
				session == null
				?<div className='alert'>
					<div className='alert_tit'>
						<em>미 로그인시</em>
					</div>
					<p>Sample 계정의 데이터의 열람만 가능합니다. <span>추가, 수정, 삭제 불가능</span></p>
				</div>
				:null
			}
			<Calendar record={record}></Calendar>
		</div>
	)
}