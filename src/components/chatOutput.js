import React, { Fragment, useState } from "react";
//import { output } from "../../../server/controllers/chat_controller";

const ChatOutput = ({setAuth}) => {

    const [message, setMessage] = useState('');
    // const [name, setName] = useState('');
    // //const [response, setResponse] = useState('');
    
    // async function getName() {
    //     try {
    //         const response = await fetch('http://localhost:5000/dashboard',{
    //             method: "GET",
    //             headers: {token : localStorage.token}
    //         });
    //         const parseResponse = await response.json();
    //         console.log(parseResponse);
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }
    const HandleMulChoiceBut = async (e, choice) => {
        e.preventDefault();
        
        try {
            //const body = response;
                await fetch(`http://localhost:5000/chat/choice`,{
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify( {message: choice} ), //json string, like literally string but json inside. would need to parse to make it usable
                })
                .then((res) => res.json())
                .then((data) => setMessage(data.message));
                //const jsonData = await response.json();
                //JSON.stringify({jsonData});
                //setMessage(jsonData.message);
                // .then((res) => res.json())
                // .then((data) => setResponse(data.message));
                console.log(message);
              
        } catch (error) {
            console.error(error.message);
        }
    }
     
    const handleStartButton = async (e) => {
        e.preventDefault();
        try {
            //const body = response;
                await fetch(`http://localhost:5000/chat/start`,{
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    //body: JSON.stringify( {message: } ), //json string, like literally string but json inside. would need to parse to make it usable
                })
                .then((res) => res.json())
                .then((data) => setMessage(data.message));
                //const jsonData = await response.json();
                //JSON.stringify({jsonData});
                //setMessage(jsonData.message);
                // .then((res) => res.json())
                // .then((data) => setResponse(data.message));
                console.log(message);
              
        } catch (error) {
            console.error(error.message);
        }
      
    }
    return <Fragment>
    
    <form className="mt-5" onSubmit={HandleMulChoiceBut}>
        {/* <textarea
            value={message.message}
            onChange={(e) => setMessage(e.target.value)}
            >
        </textarea> */}
        <button className="btn btn-success btn-block my-5" onClick={(e) => handleStartButton(e)}>START</button>
        <pre className="text-left mt-5" >{message}</pre> 
        <button className="btn btn-secondary btn-lg col-2 m-3" onClick={(e) => HandleMulChoiceBut(e, 'A')}>A</button>
        <button className="btn btn-secondary btn-lg col-2 m-3" onClick={(e) => HandleMulChoiceBut(e, 'B')}>B</button>
        <button className="btn btn-secondary btn-lg col-2 m-3" onClick={(e) => HandleMulChoiceBut(e, 'C')}>C</button>     
    </form>
    </Fragment>
}

export default ChatOutput