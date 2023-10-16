'use client'

import { useEffect, useState } from "react";

export default function EventWrite({prfnm, poster, genrenm}){
	let [show,setShow]=useState(false);
	let [eventWriteShow,SetEventWriteShow]=useState(false);

	useEffect(()=>{
		SetEventWriteShow(true);
	},[]);

	const recordChk=(e)=>{
		e.preventDefault();

		let frm=e.target;
		let title=frm.title.value;
		let date=frm.date.value;
		let content=frm.content.value;
		
		if(title == '' || title == null || title == undefined){
			alert('제목을 입력하세요!');
			return false;
		}
		if(date == '' || date == null || date == undefined){
			alert('날짜를 선택해주세요!');
			return false;
		}
		if(content == '' || content == null || content == undefined){
			alert('감상을 남겨주세요!');
			return false;
		}

		fetch('/api/record/write',{
			method:'POST',
			body:JSON.stringify({
				prfnm:prfnm,
				poster:poster,
				genrenm:genrenm,
				title:title,
				date:date,
				content:content
			})
		}).then((res)=>{
			console.log(res);
			if(res.status == 200){
				alert('기록되었습니다!');
				location.href='/record';
			}
		}).catch((error)=>{
			console.log(error);
		})
	}
	return(
		eventWriteShow
		&&
		<>
			<button onClick={()=>{setShow(true)}}>달력에 기록하기</button>
			{
				show
				?<div className='event_write'>
					<div className='modal_bg' onClick={()=>{setShow(false)}}></div>
					<div className='modal'>
						<div className='inner'>
							<div className='btn_close'>
								<button onClick={()=>{setShow(false)}}>닫기</button>
							</div>
							<div className='sub_tit'>
								<em>기록 작성하기</em>
							</div>
							<form onSubmit={recordChk}>
								<div className='record_info'>
									<div className='info_tit'>
										<b className='gsans'>{prfnm}</b>
									</div>
									<div className='info_img'>
										<div className='img'>
											<img src={poster}/>
										</div>
									</div>
								</div>
								<div className='record_form'>
									<div className='table'>
										<table>
											<colgroup>
												<col width='135px' />
												<col width='*' />
											</colgroup>
											<tbody>
												<tr>
													<th>제목</th>
													<td>
														<p className='input'>
															<input type='text' name='title' placeholder='제목입력' />
														</p>
													</td>
												</tr>
												<tr>
													<th>날짜</th>
													<td>
														<p className='input'>
															<input type='date' name='date' />
														</p>
													</td>
												</tr>
												<tr>
													<th>감상</th>
													<td>
														<p className='input'>
															<textarea name='content' placeholder='기록하고 싶었던 감상을 적어주세요!'></textarea>
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div className='btn_submit'>
									<button type='submit'>전송</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				:null
			}
		</>
	)
}