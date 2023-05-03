import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

  // activity
  const [activity, setActivity] = useState('');
  const [type, setType] = useState('');
  const [flag, setFlag] = useState(false);
  const [participants, setParticipants] = useState(0);

  const [info, setInfo] = useState([{}]);

  // get the activity -> on launch
  useEffect(() => {
    getData();
  }, [])

  // regenererate responses
  const getData = async () => {
    const response = await fetch('https://www.boredapi.com/api/activity');
    const data = await response.json();
    setActivity(data.activity);
    setType(data.type);
    setParticipants(data.participants)
    setFlag(true);
  }

  // get the data
  useEffect(() => {
    Axios.get('http://localhost:5000/')
      .then((res) => {
        setInfo(res.data);
      })
  }, []);

  // add to DB
  const addToDB = () => {
    Axios.post('http://localhost:5000/', {
      activity: activity,
      type: type,
      participants: participants
    })
      .then(() => {
        setInfo([...info, {
          activity: activity,
          type: type,
          participants: participants
        }])
      });
  }

  // delete from db
  const deleteItem = (id) => {
    Axios.delete(`http://localhost:5000/${id}`)
      .then(() => {
        setInfo(info.filter((val) => {
          return val._id !== id;
        }))
      })
  };

  return (
    <div className="d-flex justify-center align-item-center m-4">
      <div className='get-bored'>
        <div className="card p-4">
          <h1 className='card-title text-center mb-4'>Activity Generated</h1>
          <p className='card-text text-start'>Activity: {activity}</p>
          <p className='card-text text-start'>Type: {flag && type}</p>
          <p className='card-text text-start'>Participants: {participants}</p>
          <button onClick={getData} className='btn btn-dark m-1'>Generate Activity</button>
          <button onClick={addToDB} className='btn btn-success m-1'>Add Activity</button>
        </div>
        <table className="mt-5 table table-bordered table-hover">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Type</th>
              <th>Participants</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {info.map((item, key) => {
            return (
              <tr key={key}>
                <td className='text-start p-2'>{item?.activity}</td>
                <td className='text-center p-2'>{flag && item?.type}</td>
                <td className='text-center p-2'>{item?.participants}</td>
                <td><button className='btn btn-danger' onClick={() => deleteItem(item?._id)}>Delete</button></td>
              </tr>);
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;