export default async function Home() {
	return (
		<div id='main' className='main'>
			<div className='section section1'>
				<div className='sec_tit'>
					<strong className='gsans'>HYCU 2023 소프트웨어 프로젝트 01분반 최종과제</strong>
					<p>H201946069 응용소프트웨어공학과 강재연</p>
				</div>
				<div className='sec_cont'>
					<div className='cont cont1 clear'>
						<div className='cont_tit'>
							<em>프로젝트 개요</em>
						</div>
						<div className='cont_box'>
							<ul className='intro_list'>
								<li>
									<div className='list_tit'>
										<b>주제</b>
									</div>
									<div className='list_box'>
										<ul>
											<li>직접 만드는 나만의 문화 달력</li>
										</ul>
									</div>
								</li>
								<li>
									<div className='list_tit'>
										<b>기능</b>
									</div>
									<div className='list_box'>
										<ul>
											<li>NextAuth.js를 이용한 회원가입</li>
											<li>JWT를 사용한 로그인 & GITHUB 소셜 로그인</li>
											<li>React hook으로 구현한 달력</li>
											<li>API를 활용한 공연정보목록 &#40;SSR&#41; & XML을 JSON으로 파싱</li>
											<li>공연정보와 함께 달력에 감상을 기록 및 수정, 삭제, 업데이트 구현&#40;CSR&#41;</li>
											<li>PWA 적용</li>
										</ul>
									</div>
								</li>
								<li>
									<div className='list_tit'>
										<b>사용 기술</b>
									</div>
									<div className='list_box'>
										<ul>
											<li>Frontend - HTML5, CSS3, Javascript, AJAX, React</li>
											<li>Backend - NEXT.js 13</li>
											<li>DataBase - MongoDB</li>
											<li>Library - bcrypt, NextAuth, xml-js</li>
											<li>API - KOPIS OPEN API <a href='https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074' target='_blank'>&#40;https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074&#41;</a></li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className='cont cont2 clear'>
						<div className='cont_tit'>
							<em>참고사이트</em>
						</div>
						<div className='cont_box'>
							<ul className='intro_list'>
								<li>
									<div className='list_tit'>
										<b>벤치마킹</b>
									</div>
									<div className='list_box'>
										<ul>
											<li>예술경영지원센터 공연예술통합전산망 <a href='https://www.kopis.or.kr/por/main/main.do' target='_blank'>&#40;https://www.kopis.or.kr/por/main/main.do&#41;</a></li>
											<li>문화포털 <a href='https://www.culture.go.kr/index.do' target='_blank'>&#40;https://www.culture.go.kr/index.do&#41;</a></li>
										</ul>
									</div>
								</li>
								<li>
									<div className='list_tit'>
										<b>디자인 소스</b>
									</div>
									<div className='list_box'>
										<ul>
											<li>미리캔버스 <a href='https://www.miricanvas.com/' target='_blank'>&#40;https://www.miricanvas.com/&#41;</a></li>
											<li>Pretendard <a href='https://cactus.tistory.com/306' target='_blank'>&#40;https://cactus.tistory.com/306&#41;</a></li>
											<li>지마켓 산스 <a href='https://corp.gmarket.com/fonts/' target='_blank'>&#40;https://corp.gmarket.com/fonts/&#41;</a></li>
										</ul>
									</div>
								</li>
								<li>
									<div className='list_tit'>
										<b>버전 관리</b>
									</div>
									<div className='list_box'>
										<ul>
											<li>GITHUB <a href='https://github.com/StreetDragonv2/culture-calendar' target='_blank'>&#40;https://github.com/StreetDragonv2/culture-calendar&#41;</a></li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
