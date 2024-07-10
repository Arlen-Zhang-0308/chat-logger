import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Record from "../components/Records";
import { host } from '../App';
import '../style/home.css';
import "../components/record.css";


export default function Home(props) {
  const [inputValue, setInputValue] = useState("");
  const [records, setRecords] = useState([]);
  const [addedRecords, setAdded] = useState([]);
  const [messageContent, setMessage] = useState("No message.");
  const [isShiftLine, setIsShiftLine] = useState(false);

  let userId = "668c9012180096c508792c65";
  const token = localStorage.getItem("access-token");
  console.log("token:", token);
  if(token) {
    // userId = 
  }

  useEffect(() => {
    fetchRecords();
    if(addedRecords.length > 0) {
      updateRecords(addedRecords);
    }

    async function fetchRecords() {
      let gotRecords = JSON.parse(localStorage.getItem("records"));
      if(token) {
        if(gotRecords) {
          for(let rec of gotRecords) {
            rec.time = new Date(rec.time);
            rec.userId = userId;
          }
          updateRecords(gotRecords);
          localStorage.removeItem("records");
        }
        /* Get records from the backend if the user is logged in. */
        try {
          const response = await fetch(`${host}/message?userId=${userId}`);
          gotRecords = await response.json();
          console.log(gotRecords);
          for(let rec of gotRecords) {
            rec.time = new Date(rec.time);
          }
          setRecords(gotRecords);
        }
        catch (err) {
          console.log(err.message);
        }
      }
      else {
        /* Get records from local storage if not logged in. */
        if(!gotRecords) {
          gotRecords = [];
        }
        for(let rec of gotRecords) {
          rec.time = new Date(rec.time);
        }
        setRecords(gotRecords);
      }
    }

    function updateRecords(newAdded)  {
      if(token) {
        /* Get and update records from the backend if the user is logged in. */
        const addData = {
          messageList: newAdded,
          listNumber: newAdded.length,
          userId: userId
        }
        fetch(`${host}/message`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(addData)
        })
        .then(response => response.json())
        .then(jsonData => {
          console.log(jsonData);
          if(jsonData.status === "ok") {
            setMessage(`Updated ${newAdded.length} records. `)
            setAdded([]);
          }
          else {
            setMessage(`Updating ${newAdded.length} records failed. `)
          }
        })
        .catch(err => {
            console.log(err)
        })
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
  }, [addedRecords, userId]);
  
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

  return (
    <div className="main-box">
      <div className="header">
        <div className="message-box">
          <label>Notification: &nbsp;</label>
          <label style={{"color": "blue"}}>{messageContent}</label>
        </div>
        <div className="user-operation">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div className="record-container" onClick={recordClick} ref={listRef}>
        <MessageList records={records} />
      </div>
      
      <div className="input-box">
        <textarea onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onChange={handleInputChange} value={inputValue} multiple={true} />
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

  return (
      <ul id="record-list">
        {recordList}
      </ul>
  );
}
