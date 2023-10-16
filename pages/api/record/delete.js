import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req,res){
	//json -> object 전환
	req.body=JSON.parse(req.body);

	if(req.method=='DELETE'){
		let session = await getServerSession(req, res, authOptions);

        let db = (await connectDB).db('culture-calendar');
        let result = await db.collection('event-record').findOne({_id:new ObjectId(req.body._id)});
		let account = await db.collection('user-account').findOne({id:session.user.id});
		
        if(result.author == account._id.toString()){
            await db.collection('event-record').deleteOne({_id:new ObjectId(req.body._id)});
            return res.status(200).json('삭제완료');
        }else{
            return res.status(500).json('현재유저와 작성자 불일치');
        }
	}
}