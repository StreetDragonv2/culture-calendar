'use client'

import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import css from "../css/calendar.css";
import Link from "next/link";

const cx = classNames.bind(css);

export default function Calendar({record}){
	let [calendarShow,SetCalendarShow]=useState(false);
	useEffect(()=>{
		SetCalendarShow(true);

		//새로고침시 오늘로 달력 초기화
		setSelectedYear(today.year);
		setSelectedMonth(today.month);
	},[]);

	const today = {
		year : new Date().getFullYear(),
		month : new Date().getMonth() + 1,
		date : new Date().getDate(), 
		day : new Date().getDay()
	}
	const week=['일','월','화','수','목','금','토'];
	const [selectedYear,setSelectedYear]=useState(today.year);
	const [selectedMonth,setSelectedMonth]=useState(today.month);

	const endDate=new Date(selectedYear,selectedMonth,0).getDate();
	const startDay=new Date(selectedYear,selectedMonth-1,1).getDay();
	const weekNumber=Math.ceil((startDay+endDate)/7);

	const filterRecord = record.filter(data => new Date(data.date).getMonth() + 1 == selectedMonth);

	//이전달 보기
	const prevMonth = useCallback(()=>{
		if(selectedMonth === 1){
			//작년 12월
			setSelectedMonth(12);
			setSelectedYear(selectedYear - 1);
		}else{
			setSelectedMonth(selectedMonth - 1);
		}
	},[selectedMonth]);

	//다음달 보기
	const nextMonth = useCallback(()=>{
		if(selectedMonth === 12){
			setSelectedMonth(1);
			setSelectedYear(selectedYear + 1);
		}else{
			setSelectedMonth(selectedMonth + 1);
		}
	},[selectedMonth]);
	
	const monthControl = useCallback(()=>{
		let monthArr=[];
		for(let i=0; i<12; i++){
			monthArr.push(<option key={`monthArr${i+1}`} value={i+1}>{i+1}월</option>)
		}
		return(
			<select onChange={changeSelectMonth} value={selectedMonth}>
				{monthArr}
			</select>
		)
	},[selectedMonth]);

	const yearControl = useCallback(()=>{
		let yearArr=[];
		const startYear=today.year - 10;
		const endYear=today.year + 10;
		for(let i=startYear; i<endYear; i++){
			yearArr.push(<option key={`yearArr${i}`} value={i}>{i}년</option>);
		}
		return(
			<select onChange={changeSelectYear} value={selectedYear}>
				{yearArr}
			</select>
		)
	},[selectedYear]);

	const changeSelectMonth = (e) =>{
		setSelectedMonth(Number(e.target.value));
	}

	const changeSelectYear = (e) =>{
		setSelectedYear(Number(e.target.value));
	}

	const returnWeek = useCallback(()=>{
		let weekArr=[];
		week.forEach((v)=>{
			weekArr.push(
				<li key={`weekArr${v}`} 
					className={cx({sunday:v === "일"},{saturday:v === "토"})}>
					<span>{v}</span>
				</li>
			);
		});
		return weekArr;
	},[]);

	const returnDay = useCallback(()=>{
		let dayArr=[];
		let keyCnt=0;
		let nowDate=0;
		let nowDay=0;

		//주
		for(let i=0; i < weekNumber; i++){
			//일
			for(let j=0; j<7; j++){
				if(startDay <= nowDay && nowDate < endDate){
					nowDate++;

					dayArr.push(
						<li key={`dayArr${keyCnt+1}`}
							className={
								cx(
									{
										today:
											today.year === selectedYear &&
											today.month === selectedMonth &&
											today.date === nowDate,
									},
									//{weekday:true},
									{
										sunday:
											new Date(
												selectedYear,
												selectedMonth - 1,
												nowDate
											).getDay() === 0,
									},
									{
										saturday:
											new Date(
												selectedYear,
												selectedMonth - 1,
												nowDate
											).getDay() === 6,
									},
									{
										friday:
											new Date(
												selectedYear,
												selectedMonth - 1,
												nowDate
											).getDay() === 5,
									}
								)
							}>
							<span className="num">{nowDate}</span>
							<div className="cell">
								{	
									filterRecord.map((data)=>{
										let id=data._id.toString();
										return new Date(data.date).getDate() == nowDate
										? <div className="record_box">
											<Link href={`/record/view/${id}`}>
												<em>{data.title}</em>
											</Link>
											<div className="preview">
												<div className="inner clear">
													<div className='left'>
														<div className="prev_img">
															<div className='img'>
																<img src={data.poster}/>
															</div>
														</div>
													</div>
													<div className='right'>
														<div className='prev_tit'>
															<em>{data.title}</em>
														</div>
														<div className="prev_info">
															<ul className='clear'>
																<li>{data.prfnm}</li>
																<li className='genrenm'>{data.genrenm}</li>
															</ul>
														</div>
														<div className="prev_con">
															<p>{data.content}</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										: null
									})
								}
							</div>
						</li>
					)
					keyCnt++;
				}else{
					dayArr.push(<li key={`dayArr${keyCnt+1}`} className="blank"></li>);
					keyCnt++;
				}
				nowDay++;
			}
		}

		return dayArr;
	},[selectedYear,selectedMonth,endDate,startDay,filterRecord]);

	return(
		calendarShow
		&&
		<div className="calendarBox">
			<div className="cal_top">
				<div className="cal_arr clear">
					<button onClick={prevMonth} className="prev">이전달</button>
					<button onClick={nextMonth} className="next">다음달</button>
				</div>
				<div className="cal_tit">
					<strong>
						{yearControl()}년 {monthControl()}월
					</strong>
				</div>
			</div>
			<div className="cal_con">
				<div className="cal_week">
					<ul className="clear">
						{returnWeek()}
					</ul>
				</div>
				<div className="cal_date">
					<ul className="clear">
						{returnDay()}
					</ul>
				</div>
			</div>			
		</div>
	)
}