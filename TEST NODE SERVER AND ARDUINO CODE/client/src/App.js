import './App.css';
import  {useState, useEffect} from 'react'
import axios from './axios.js'

function App() {

	const [connection_url, setconnection_url] = useState("parvg555");
	const [from, setFrom] = useState("");
	const [to,setTo] = useState("");

  	const [board, setBoard] = useState({
		"online":false,
		"status":"unknown"
  	})


	const makeMove = async () => {
		const {data} = await axios.post('/sendMove',{
			connection_string:connection_url,
			from:from,
			to:to,
		})
		if(data.success){
			setFrom("");
			setTo("");
		}else{
			makeMove();
		}
	}  

	const getBoardStatus = async () => {
		await axios.get(`/GetStatus/${connection_url}`)
		.then((response) => {
			if(response.data.success){
				setBoard({
					"online":response.data.online,
					"status":response.data.status
				})
			}else{
				setBoard({
					"online":false,
					"status":"unable to find board"
				})
			}
		})
	}

	useEffect(() => {
		const interval = setInterval(async () => {
			await getBoardStatus();
		},1000);
		return () => {
			clearInterval(interval);
		};
	},[])

	// setInterval(getBoardStatus,5000);

  	return (
    	<div className="App">
      		<h1>Sample Project</h1>
      		<div className="Status">
        		{board.online?"online":"offline"}
				<br/>
				{board.status}
      		</div><br/>
			<div className='move'>
				<input type="text" placeholder='from' value={from} onChange={(e) => setFrom(e.target.value)} />
				<input type="text" placeholder='to' value={to} onChange={(e) => setTo(e.target.value)}/>
				<br/>
				<button onClick={makeMove} >MOVE</button>
			</div>
    	</div>
  	);
}

export default App;
