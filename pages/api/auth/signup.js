import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
	//json -> object 전환
	req.body=JSON.parse(req.body);
	
	if (req.method === "POST") {
		let db = (await connectDB).db('culture-calendar');
		let { name, id, password } = req.body;
		
		//입력 확인
		if(!name || !id || !password){
			return res.status(400).json('필요한 데이터가 없습니다!');
		}

		//패스워드 암호화
		const hash = await bcrypt.hash(password, 10);
		password = hash;

		//DB에 회원정보 추가
		await db.collection('user-account').insertOne({name:name,id:id,password:password});
		return res.status(200).json('가입 완료');
	}
}; 