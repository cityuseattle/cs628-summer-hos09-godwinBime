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
        async function getRecords(){
            const response = await fetch(`https://fluffy-yodel-7x9vx9764q52wx77-5050.app.github.dev/record/`);
            if(!response.ok){
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
        return;
    }, [records.length]);

    //This method will delete the records
    async function deleteRecord(id){
        await fetch(`https://fluffy-yodel-7x9vx9764q52wx77-5050.app.github.dev/record/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    //This function will map out the records on the table
    function recordList(){
        return records.map((record) => {
            return(
                <Record record={record} deleteRecord={() => deleteRecord(record._id)}
                key={record._id}/>
            );
        });
    }

    //The following section will display the table with the records
    return(
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}