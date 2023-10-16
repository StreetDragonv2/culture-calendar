import { getView } from "@/util/callAPI";
import EventWrite from "./EventWrite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { notFound } from "next/navigation";

export default async function View(props){
	const eventView=await getView(props.params.id);

	if( eventView == undefined){
        return notFound();
    }

	let session=await getServerSession(authOptions);

	return(
		<div className='sub event_view'>
			<div className='top clear'>
				<div className='img_box'>
					<div className='img'>
						{
							eventView.poster._text == undefined
							? <img src='/images/img_bg.jpg' />
							: <img src={`${eventView.poster._text}`} />
						}						
					</div>
				</div>
				<div className='info_box'>
					<div className='genrenm'>
						<span>{eventView.genrenm._text}</span>
					</div>
					<div className='info_tit'>
						<em className='gsans'>{eventView.prfnm._text}</em>
					</div>
					<div className='table'>
						<table>
							<colgroup>
								<col width='135px' />
								<col width='*' />
							</colgroup>
							<tbody>
								<tr>
									<th>공연기간</th>
									<td>{eventView.prfpdfrom._text} ~ {eventView.prfpdto._text}</td>
								</tr>
								<tr>
									<th>공연장소</th>
									<td>{eventView.fcltynm._text}</td>
								</tr>
								<tr>
									<th>공연시간</th>
									<td>{eventView.dtguidance._text}</td>
								</tr>
								{
									Object.keys(eventView.prfruntime).length > 0 ?
									<tr>
										<th>공연 런타임</th>
										<td>{eventView.prfruntime._text}</td>
									</tr>
									:null
								}
								<tr>
									<th>관람연령</th>
									<td>{eventView.prfage._text}</td>
								</tr>
								<tr>
									<th>티켓가격</th>
									<td>{eventView.pcseguidance._text}</td>
								</tr>
								{
									Object.keys(eventView.prfcast).length > 0 ?
									<tr>
										<th>출연진</th>
										<td>{eventView.prfcast._text}</td>
									</tr>
									:null
								}
								{
									Object.keys(eventView.prfcrew).length > 0 ?
									<tr>
										<th>제작진</th>
										<td>{eventView.prfcrew._text}</td>
									</tr>
									:null
								}
							</tbody>
						</table>
					</div>
					{
						session !== null
						?<div className='btn_record'>
							<EventWrite prfnm={eventView.prfnm._text} poster={eventView.poster._text} genrenm={eventView.genrenm._text}></EventWrite>
						</div>
						:null
					}
					
				</div>
			</div>
			<div className='btm'>
				<div className='img_tit'>
					<em className='gsans'>소개 이미지</em>
				</div>
				<div className='img_box'>
					{	eventView.styurls == undefined ? <p>등록된 이미지가 없습니다</p> :
						!Array.isArray(eventView.styurls.styurl) ? 
						<div className='img'><img src={`${eventView.styurls.styurl._text}`} key={`viewImg`}/></div>
						:eventView.styurls.styurl.map((data,i)=>{
							return(
								<div className='img'>
									<img src={`${data._text}`} key={`viewImg${i}`}/>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}