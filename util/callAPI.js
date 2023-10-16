import convert from 'xml-js';

async function getEvent(shcate, cpage, shprfnm){

	let getEventURL=`${process.env.HOST}/pblprfr?service=${process.env.SERVICE_KEY}&stdate=20230601&eddate=20230630&rows=12&cpage=${cpage}&shcate=${shcate}`;
	if(shprfnm != undefined){
		getEventURL +=`&shprfnm=${shprfnm}`;
	}
	const res=await fetch(getEventURL);
	if(!res.ok){
		throw new Error('Failed to fetch data');
	}
	const result=convert.xml2json(await res.text(),{compact:true, spaces:4});
	return JSON.parse(result)['dbs']['db'];
}

async function getView(mt20id){
	const res=await fetch(`${process.env.HOST}/pblprfr/${mt20id}?service=${process.env.SERVICE_KEY}`);
	if(!res.ok){
		throw new Error('Failed to fetch data');
	}
	const result=convert.xml2json(await res.text(),{compact:true, spaces:4});
	return JSON.parse(result)['dbs']['db'];
}

async function getCount(){
	const res=await fetch(`${process.env.HOST}/prfstsCate?service=${process.env.SERVICE_KEY}&stdate=20230601&eddate=20230630`);
	if(!res.ok){
		throw new Error('Failed to fetch data');
	}
	const result=convert.xml2json(await res.text(),{compact:true, spaces:4});
	return JSON.parse(result)['prfsts']['prfst'];
}

export { getEvent, getView, getCount };