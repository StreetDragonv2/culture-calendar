import { connectDB } from "@/util/database";

export default async function handler(req,res){
	if(req.method=='POST'){
		//아이디 중복 체크
		let db = (await connectDB).db('culture-calendar');
		let result = await db.collection('user-account').findOne({id:req.body});

		if(result != null){
			return res.status(400).json('이미 가입된 아이디입니다!');
		}

		console.log(req.body);
		res.status(200).json('응답완료');
	}
}