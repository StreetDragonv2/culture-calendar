'use client'

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LoginBox(){
	let [loginView,setLoginView]=useState(false);

	useEffect(()=>{
		setLoginView(true);
	},[]);

	const login = async (e)=>{
		e.preventDefault();

		const response = await signIn("id-password-credential", {
            id:e.target.id.value,
            password:e.target.password.value,
            redirect: true,
			callbackUrl:'/'
        });
	}
	const snsLogin = async (e)=>{
		e.preventDefault();
		const response = await signIn("github-credential", {
            redirect: true,
			callbackUrl:'/'
        });
	}
	return(
		loginView
		&&
		<div className='login_box'>
			<div className='auth_tit'>
				<em className='gsans'>로그인</em>
			</div>
			<form onSubmit={login}>
				<fieldset>
					<div className="form_group">
						<label>아이디</label>
						<p className="input">
							<input type="text" name="id" placeholder="아이디를 입력해주세요" autocomplete="off"/>
						</p>
					</div>
					<div className="form_group">
						<label>비밀번호</label>
						<p className="input">
							<input type="password" name="password" placeholder="비밀번호를 입력해주세요" autocomplete="off"/>
						</p>
					</div>
					<div className="form_button">
						<button type="submit">로그인</button>
					</div>
				</fieldset>
				<fieldset className="sns_login">
					<div className="form_button">
						<button onClick={snsLogin} className="wh">github 로그인</button>
					</div>
				</fieldset>
			</form>
		</div>
	)
}