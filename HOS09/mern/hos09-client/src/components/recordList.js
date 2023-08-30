import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>
        <button className="btn btn-link" onClick={() => {
            props.deleteRecord(props.record._id);
        }}>Delete</button>
    </tr>
);

export default function RecordList(){
    const [records, setRecords] = useState([]);

    //this method fetches the records from the database
    useEffect(() => {
        async response = await fetch(`https://fluffy-yodel-7x9vx9764q52wx77-5050.app.github.dev/record/`);
        if(!response.ok){
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }
    })
}