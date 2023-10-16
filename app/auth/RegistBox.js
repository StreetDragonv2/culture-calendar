'use client'

import { useEffect, useState } from "react";

export default function RegistBox() {
	let [inputId,setInputId] = useState('');
	let [validId,setValidId]=useState(false);
	let [registView,setRegistView]=useState(false);

	useEffect(()=>{
		setRegistView(true);
	},[]);

	const idCheck=()=>{
		if(inputId==''){
			alert('아이디를 입력해주세요!');
			return false;
		}
		
		fetch('/api/auth/idcheck',{
			method:'POST',
			body:inputId
		}).then((res)=>{
			if(res.status == 200){
				alert('사용 가능한 아이디입니다!');
				setValidId(true);
			}else if(res.status == 400){
				alert('이미 가입된 아이디입니다!');
				setInputId('');
				setValidId(false);
			}
		})
	}

	const loginChk = (e)=>{
		e.preventDefault();

		let frm=e.target;
		let name=frm.name.value;
		let id=frm.id.value;
		let password=frm.password.value;

		if(name == '' || name == null || name == undefined){
			alert('이름을 입력하세요!');
			return false;
		}

		if(id == '' || id == null || id == undefined){
			alert('이메일을 입력하세요!');
			return false;
		}

		if(password == '' || password == null || password == undefined){
			alert('비밀번호를 입력하세요!');
			return false;
		}

		let pwdChk=/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
		if(!pwdChk.test(password)){
			alert('비밀번호는 영문자, 숫자, 특수문자 조합으로 8~15자리를 사용해야 합니다');
			return false;
		}

		if(validId == false){
			alert('아이디 중복 체크를 진행해주세요!');
			return false;
		}
		
		fetch('/api/auth/signup',{
			method:'POST',
			body:JSON.stringify({
				name:name,
				id:id,
				password:password
			})
		}).then((res)=>{
			if(res.status == 200){
				alert('회원가입이 완료되었습니다!');
				location.href='/';
			}			
		}).catch((error)=>{
			console.log(error);
		})
	}
	
	return (
		registView 
		&& 
		<div className='regist_box'>
			<div className='auth_tit'>
				<em className='gsans'>회원가입</em>
			</div>
			<form onSubmit={loginChk} >
				<fieldset>
					<div className="form_group">
						<label>이름</label>
						<p className="input">
							<input type="text" name="name" placeholder="이름" /> 
						</p>
					</div>
					<div className="form_group">
						<label>아이디</label>
						<p className="input id_check">
							<input type="text" name="id" placeholder="아이디를 입력해주세요" onKeyUp={(e)=>{setInputId(e.target.value);}} />
							<button type="button" onClick={idCheck}>중복확인</button>
						</p>						
					</div>
					<div className="form_group">
						<label>비밀번호</label>
						<p className="input">
							<input type="password" name="password" placeholder="비밀번호는 영문자, 숫자, 특수문자 조합으로 8~15자리를 사용해야 합니다" />
						</p>
					</div>
					<div className="form_button">
						<button type="submit">가입요청</button>
					</div>
				</fieldset>
			</form>
		</div>
	)
  }