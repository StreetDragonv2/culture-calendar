import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RecordEdit from "./RecordEdit";

export default async function View(props){
	const db=(await connectDB).db('culture-calendar');
	let result=await db.collection('event-record').findOne({_id:new ObjectId(props.params.id)});
		result._id=result._id.toString();

    if( result === null ){
        return <div>없는페이지에요</div>
        //return notFound()
    }

	let session=await getServerSession(authOptions);
	let account=undefined;
	if(session !== null){
		account = await db.collection('user-account').findOne({id:session.user.id});
	}
	return(
		<div className='sub record_view'>
			<div className='sub_tit'>
				<em>기록 살펴보기</em>
			</div>
			<div className='info_box clear'>
				<div className='left'>
					<div className='info_img img'>
						<img src={result.poster}/>
					</div>
				</div>
				<div className='right'>
					<div className='info_tit'>
						<span>{result.genrenm}</span>
						<em className='gsans'>{result.prfnm}</em>
					</div>
					<div className='table'>
						<table>
							<colgroup>
								<col width='135px' />
								<col width='*' />
							</colgroup>
							<tbody>
								<tr>
									<th>제목</th>
									<td>{result.title}</td>
								</tr>
								<tr>
									<th>날짜</th>
									<td>{result.date}</td>
								</tr>
								<tr>
									<th>감상</th>
									<td>
										{
											result.content.split('\n').map((line) => {
												return (<span>{line}<br /></span>)
											})
										}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					{
						session !== null && result.author == account._id.toString()
						?<div className='btm'>
							<RecordEdit result={result}></RecordEdit>
						</div>
						:null
					}
					
				</div>
			</div>
		</div>
	)
}