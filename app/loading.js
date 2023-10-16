export default function Loading(){
	const squareLoop = () =>{
		const square = [];
		for(let i=0; i <9; i++){
			square.push(<li style={{animationDelay:`${i*0.125}s`}} key={`square${i}`}></li>)
		}
		return square;
	}
	return(
		<div className='sub loading'>
			<div className='spinner'>
				<ul>
					{squareLoop()}
				</ul>
			</div>
			<em className='gsans'>LOADING</em>
		</div>
	)
}