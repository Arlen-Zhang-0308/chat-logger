import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Record from "../../components/record";
import { host } from '../../App';
import './home.css';
import "../../components/record/index.css";


export default function Home(props) {
  const [inputValue, setInputValue] = useState("");
  const [records, setRecords] = useState([]);
  const [addedRecords, setAdded] = useState([]);
  const [messageContent, setMessage] = useState("No message.");
  const [isShiftLine, setIsShiftLine] = useState(false);

  const navigate = useNavigate();

  let userEmail = null;
  const token = localStorage.getItem("access-token");
  if(token) {
    userEmail = localStorage.getItem("email");
  }

  useEffect(() => {
    fetchRecords();
    if(addedRecords.length > 0) {
      updateRecords(addedRecords);
    }

    async function fetchRecords() {
      let gotRecords = JSON.parse(localStorage.getItem("records"));
      if(token) {
        setMessage("Logged in user. Syncronizing data...");
        if(gotRecords) {
          for(let rec of gotRecords) {
            rec.time = new Date(rec.time);
          }
          await updateRecords(gotRecords);
          localStorage.removeItem("records");
        }
        /* Get records from the backend if the user is logged in. */
        try {
          const response = await fetch(`${host}/message`, {
            method: "GET", 
            headers: { 'Content-Type': 'application/json',
                      "Authorization": token }
          });
          if(response.status === 401) {
            alert(response.text());
            navigate("/login");
            return;
          }
          gotRecords = await response.json();
          console.log(gotRecords);
          for(let rec of gotRecords) {
            rec.time = new Date(rec.time);
          }
          setRecords(gotRecords);
          setMessage("Record data are updated with database!")
        }
        catch (err) {
          console.log(err.message);
        }
      }
      else {
        /* Get records from local storage if not logged in. */
        setMessage("Haven't login, using browser storage.")
        if(!gotRecords) {
          gotRecords = [];
        }
        for(let rec of gotRecords) {
          rec.time = new Date(rec.time);
        }
        setRecords(gotRecords);
        setMessage("Record data are updated from the browser!");
      }
    }

    async function updateRecords(newAdded)  {
      if(token) {
        /* Get and update records from the backend if the user is logged in. */
        const addData = {
          messageList: newAdded,
          listNumber: newAdded.length,
        }
        const response = await fetch(`${host}/message`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json',
                      "Authorization": token },
            body: JSON.stringify(addData)
        })
        if(response.status === 401) {
          alert(response.text());
          navigate("/login");
          return;
        }
        const jsonData = response.json();
        if(jsonData.result === "ok") {    // Status returned from the backend is ok, not http response status.
          setMessage(`Updated ${newAdded.length} records. `)
          setAdded([]);
        }
        else {
          setMessage(`Updating ${newAdded.length} records failed: ${jsonData.message}`)
        }
      }
      else {
        /* Get and update records from local storage if not logged in. */
        let gotRecords = JSON.parse(localStorage.getItem("records"));
        if(!gotRecords) {
          gotRecords = [];
        }
        for(let rec of gotRecords) {
          rec.time = new Date(rec.time);
        }
        gotRecords = [...gotRecords, ...newAdded];
        localStorage.setItem("records", JSON.stringify(gotRecords));
        setRecords(current => {
          return [...current, ...newAdded]
        });
        setAdded([]);
      }
    }
  }, [addedRecords, navigate, token]);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyUp = (e) => {
    if(e.key === "Shift" || e.key === "Control") {
      setIsShiftLine(false);
    }
    if(e.key === "Enter" && !isShiftLine)  {
      setInputValue("");
    }
  }
  const handleKeyDown = (e) => {
    if(e.key === "Shift" || e.key === "Control") {
      setIsShiftLine(true);
    }
    if(e.key === "Enter" && !isShiftLine)  {
      submitRecord();
    }
  }

  function submitRecord() {
    let newValue = inputValue;

    if(inputValue.charAt(inputValue.length-1) === "\n") {
      console.log("is new line");
      newValue = newValue.substring(0, newValue.length-1);
    }
    if(newValue.charAt(0) === "\n") {
      setInputValue(newValue.substring(1, newValue.length));
    }
    setInputValue("");

    const data = {
        time: new Date(),
        message: newValue
    }
    setRecords(current => {
      return [...current, data]
    });
    setAdded(current => {
      return [...current, data];
    });
  }

  const listRef = useRef(null);
  const recordClick = (e) => {
    if(listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    else {
      console.log("Null ref. ")
    }
  }

  function clearAuth() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("email");
    navigate("/");
    setMessage("Haven't login, using browser storage.")
  }
  
  let nav1;
  let nav2;
  if(token) {
    nav1 = <button className='dashboard-btn' onClick={() => navigate("/dashboard")}>{userEmail}</button>;
    nav2 = <button onClick={() => clearAuth()}>Logout</button>;
  }
  else {
    nav1 = <button onClick={() => navigate("/register")}>Register</button>;
    nav2 = <button onClick={() => navigate("/login ")}>Login</button>;
  }

  return (
    <div className="main-box">
      <div className="header">
        <div className="message-box">
          <label>Notification: &nbsp;</label>
          <label style={{"color": "blue"}}>{messageContent}</label>
        </div>
        <div className="user-operation">
          {nav1}
          {nav2}
        </div>
      </div>
      <div className="record-container" onClick={recordClick} ref={listRef}>
        <MessageList records={records} />
      </div>
      
      <div className="input-box">
        <textarea onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onChange={handleInputChange} value={inputValue} multiple={true}/>
        <button onClick={submitRecord}>⬆</button>
      </div>
    </div>
  );
}

function MessageList({records}) {
  let insertedRecords = [];

  for(let i=0; i<records.length; i++) {
    let dateTime = records[i].time;
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();

    if(i > 0) {
      let dateTime0 = records[i-1].time;
      let year0 = dateTime0.getFullYear();
      let month0 = dateTime0.getMonth() + 1;
      let day0 = dateTime0.getDate();

      if(year !== year0) {
        insertedRecords.push({year: `${year}`});
      }
      if(day !== day0 && month !== month0) {
        insertedRecords.push({date: `${month}-${day}`});
      }
    }
    else {
      insertedRecords.push({year: `${year}`});
      insertedRecords.push({date: `${month}-${day}`});
    }
    insertedRecords.push(records[i]);
  }

  const recordList = insertedRecords.map((record, index) => record.time? <Record key={index} time={record.time} content={record.message}/>: record.year? <h3 key={index} className="year-title">{record.year}</h3>: <h4 key={index} className="date-title">{record.date}</h4>)
  if(recordList.length === 0) {
    recordList.push(<h2 key={0} className='no-data-label'>Type below to add your first record</h2>);
    recordList.push(<h5 key={1} className='no-data-label'>Press <span style={{"fontWeight": "lighter", "background": "#DDDDDD"}}>Enter</span> to add new record</h5>);
    recordList.push(<h5 key={2} className='no-data-label'>Press <span style={{"fonWeight": "lighter", "background": "#DDDDDD"}}>Shift + Enter</span> to add a new line</h5>);
  }

  return (
      <ul id="record-list">
        {recordList}
      </ul>
  );
}
