'use client'

export default function SearchForm({shcate}){
	const searchGo = (e) =>{
		e.preventDefault();
		let shprfnm=e.target.shprfnm.value;
		
		if (shprfnm == undefined || shprfnm == ''){
			alert('검색어를 입력해주세요!');
		}
		
		location.href=`/event/${shcate}?cpage=1&shprfnm=${shprfnm}`;
	}
	return(
		<div className='search_box'>
			<div className='search_tit'>
				<em className='gsans'>검색하기</em>
			</div>
			<form onSubmit={searchGo}>
				<div className='input'>
					<input type='text' name='shprfnm' placeholder='찾고싶은 공연명을 적어주세요!'/>
				</div>
				<div className='btn_submit'>
					<button type='submit'>검색</button>
				</div>
			</form>
		</div>
	)
}