import LoginBox from "./LoginBox";
import RegistBox from "./RegistBox";

export default function Auth(){
	return(
		<div className='sub auth'>
			<div className='alert'>
				<div className='alert_tit'>
					<em>샘플 계정</em>
				</div>
				<p>별도의 회원가입 없이 자유롭게 이용 가능한 샘플 계정을 제공합니다. <span>id: sample pw: sample</span></p>
			</div>
			<div className='account_box clear'>
				<LoginBox></LoginBox>
				<RegistBox></RegistBox>
			</div>
		</div>
	)
}