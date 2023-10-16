import { getEvent } from '@/util/callAPI';
import Image from 'next/image';
import Link from 'next/link';
import img_bg from '/public/images/img_bg.jpg';
import { notFound } from 'next/navigation';
import SearchForm from './SearchForm';

//30초 캐싱
//export const revalidate=30;

export default async function Event(props){
	let shcateList = ['AAAA','BBBC','CCCA','GGGA'];
	
	if( shcateList.indexOf(props.params.shcate) == -1){
        return notFound();
    }

	let cpage=parseInt(props.searchParams.cpage);
	if(isNaN(cpage) || cpage == undefined || cpage == null || cpage == ''){cpage=1}

	let shprfnm=props.searchParams.shprfnm;

	const eventList=await getEvent(props.params.shcate,cpage,shprfnm);
	const NextEventList=await getEvent(props.params.shcate,cpage+1,shprfnm);

	if(eventList == undefined){
		return notFound();
	}

	let prevLink=`/event/${props.params.shcate}?cpage=${cpage-1}`;
	let nextLink=`/event/${props.params.shcate}?cpage=${cpage+1}`;

	if(shprfnm != undefined || shprfnm != ''){
		prevLink +=`&shprfnm=${shprfnm}`;
		nextLink +=`&shprfnm=${shprfnm}`;
	}

	return(
		<div className='sub event_list'>
			<SearchForm shcate={props.params.shcate}></SearchForm>
			<ul className='clear'>
				{
					eventList.map((data,i)=>{
						return(
							<li key={`list${i}`}>
								<Link href={`/event/${props.params.shcate}/view/${data.mt20id._text}`} prefetch={false}>
									<div className='img_box img'>
										<div className='img back_img' style={{backgroundImage:`url(${data.poster._text})`}}>
											<Image src={img_bg} className='basic_img' alt={data.prfnm._text}/>
										</div>
									</div>
									<div className='txt_box'>
										<div className='state'>
											<span>{data.prfstate._text}</span>
										</div>
										<div className='list_tit'>
											<em>{data.prfnm._text}</em>
										</div>
										<ul className='list_cont'>
											<li>기간 : {data.prfpdfrom._text} ~ {data.prfpdto._text}</li>
											<li>장소 : {data.fcltynm._text}</li>
										</ul>
									</div>
								</Link>
							</li>
						)
					})
				}
			</ul>
			<div className='btn_page clear'>
				{
					cpage > 1
					?<Link href={prevLink} className='btn_prev' prefetch={false}>이전페이지</Link>
					:null
				}
				{
					NextEventList !== undefined
					?<Link href={nextLink} className='btn_next' prefetch={false}>다음페이지</Link>
					:null
				}				
			</div>
		</div>
	)
}