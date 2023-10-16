import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req,res){
	//json -> object 전환
	req.body=JSON.parse(req.body);

	if(req.method=='POST'){
		let db = (await connectDB).db('culture-calendar');
		let { _id, title, date, content } = req.body;
		
		//입력 확인
		if(!title || !date || !content){
			return res.status(400).json('필요한 데이터가 없습니다!');
		}

		let update ={
			title:title,
			date:date,
			content:content
		}
		let result = await db.collection('event-record').updateOne({_id:new ObjectId(_id)},
            {$set:update}
        )

		res.status(200).json('수정 완료');
	}
}