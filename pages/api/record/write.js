import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req,res){
	//json -> object 전환
	req.body=JSON.parse(req.body);
	let session = await getServerSession(req, res, authOptions);

	if(req.method=='POST'){
		let db = (await connectDB).db('culture-calendar');
		let { prfnm, poster, genrenm, title, date, content } = req.body;
		let author = await db.collection('user-account').findOne({id:session.user.id});
		
		//입력 확인
		if(!title || !date || !content){
			return res.status(400).json('필요한 데이터가 없습니다!');
		}

		let insert ={
			prfnm:prfnm,
			poster:poster,
			genrenm:genrenm,
			title:title,
			date:date,
			content:content,
			author:author._id.toString()
		}
		let result = await db.collection('event-record').insertOne(insert);

		res.status(200).json('기록 완료');
	}
}