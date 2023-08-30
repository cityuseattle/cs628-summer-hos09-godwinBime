import React, {useState} from "react";
import {useNavigate} from "react-router";

export default function Create(){
    const [form, setForm] = useState({
        name: "",
        positon: "",
        level: "",
    });
    const navigate = useNavigate();

    //This method will update the state properties
    function updateForm(value){
        return setForm((prev) => {
            return {...prev, ...value};
        });    

    //This function will handle form submission
    async function onSubmit(e){
        e.preventDefault();

        //When a post request is sent to the create url, we will add a new record ti the database
        const newPerson = {...form};

        await fetch("https://fluffy-yodel-7x9vx9764q52wx77-5050.app.github.dev/record", {
            method= "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        }).catch(error => {
            window.alert(error);
            return;
        });

        setForm({name: "", position: "", level: ""});
        navigate("/");
    }
}
//The following section will display the form that takes the input from the user
return(
    <div>
        <h3>Create New Record</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input type="text" className="form-control" id="name" value={form.name}
                onChange={(e) => updateForm({name: e.target.value})}/>
            </div>
            <div className="form-group">
                <label htmlFor="name">Position: </label>
                <input type="text" className="form-control" id="position" value={form.positon}
                onChange={(e) => updateForm({position: e.target.value})}/>
            </div>
                <div className="form-group">
                <div className="form-check form-check-inline">
                    <input className="form-chcek-input" type="radio" name="positionOptions"
                    id="positionIntern" value="Intern" checked={form.level === "Intern"}                
                    onChange={(e) => updateForm({level: e.target.value})}/>
                    <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-chcek-input" type="radio" name="positionOptions"
                    id="positionJunior" value="Junior" checked={form.level === "Junior"}                
                    onChange={(e) => updateForm({level: e.target.value})}/>
                    <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-chcek-input" type="radio" name="positionOptions"
                    id="positionSenior" value="Senior" checked={form.level === "Senior"}                
                    onChange={(e) => updateForm({level: e.target.value})}/>
                    <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                </div>
            </div>
            <div className="form-group">
                <input type="submit" value="Create person" className="btn btn-primary"/>
            </div>
        </form>
    </div>
);

}