'use client'

import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HeaderUtil({user_name}){
	let [utilView,SetUtilView] = useState(false);
	useEffect(()=>{
		SetUtilView(true);
	},[]);
	return(
		utilView
		&&
		<div>
			{
				user_name == undefined
				?<button onClick={()=>{signIn();}}>로그인</button>
				:<><span>{user_name}</span><button onClick={()=>{signOut();}}>로그아웃</button></>
			}
			
			
		</div>
	)
}