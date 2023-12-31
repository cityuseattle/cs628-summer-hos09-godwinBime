import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router";

export default function Edit(){
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: [],
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            const id = params.id.toString();
            const response = await fetch(`https://fluffy-yodel-7x9vx9764q52wx77-5050.app.github.dev/record/${params.id.toString()}`);

            if(!response.ok){
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const record = await response.json();
            if(!record){
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    //This method will update the state properties
    function updateForm(value){
        return setForm((prev) => {
            return{...prev, ...value};
        });
    }

    //This method will handle form submission
    async function onSubmit(e){
        e.preventDefault();
        const editPerson ={
            name: form.name,
            position: form.position,
            level: form.level,
        };

        //This will send a post request to update the data in the database
        await fetch(`https://fluffy-yodel-7x9vx9764q52wx77-5050.app.github.dev/record/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        navigate("/");
    }
    //This section will display the form that takes the input from the user to update the database
    return(
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" className="form-control" id="name" value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position: </label>
                    <input type="text" className="form-control" id="position" value={form.position}
                    onChange={(e) => updateForm({position: e.target.value})}/>
                </div>
                    <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="positionOptions"
                        id="positionIntern" value="Intern" checked={form.level === "Intern"}                
                        onChange={(e) => updateForm({level: e.target.value})}/>
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="positionOptions"
                        id="positionJunior" value="Junior" checked={form.level === "Junior"}                
                        onChange={(e) => updateForm({level: e.target.value})}/>
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="positionOptions"
                        id="positionSenior" value="Senior" checked={form.level === "Senior"}                
                        onChange={(e) => updateForm({level: e.target.value})}/>
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Update Record" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}