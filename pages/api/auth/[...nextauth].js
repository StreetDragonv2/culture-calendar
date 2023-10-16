import { connectDB } from "@/util/database";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
	providers: [
		GithubProvider({
			id: "github-credential",
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET ,
		}),

		CredentialsProvider({
			//1. 로그인페이지 폼 자동생성해주는 코드 
			id: "id-password-credential",
			name: "Credentials",
			credentials: {
				id: { label: "id", type: "text" },
				password: { label: "password", type: "password" },
			},

			//2. 로그인요청시 실행되는코드
			//직접 DB에서 아이디,비번 비교하고 
			//아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
			async authorize(credentials) {
				let db = (await connectDB).db('culture-calendar');
				let user = await db.collection('user-account').findOne({id : credentials.id})
				if (!user) {
					console.log('해당 아이디는 없음');
					return null;
				}
				const pwcheck = await bcrypt.compare(credentials.password, user.password);
				if (!pwcheck) {
					console.log('비밀번호 불일치');
					return null;
				}
				return user;
			}
		})
	],

	//3. strategy : jwt + jwt 만료일설정
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 //30일
	},


	callbacks: {
		//4. jwt 만들 때 실행되는 코드 
		//user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
		jwt: async ({ token, user }) => {
			if (user) {
				token.user = {};
				token.user.name = user.name
				token.user.id = user.id
			}
			return token;
		},
		//5. 유저 세션이 조회될 때 마다 실행되는 코드
		session: async ({ session, token }) => {
			session.user = token.user;  
			return session;
		},
	},
	pages:{
		signIn:'/auth',
	},
	secret: process.env.NEXTAUTH_SECRET
};
export default NextAuth(authOptions); 