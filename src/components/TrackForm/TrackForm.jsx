import { useState } from 'react';

const TrackForm = (props) => {
    const [formData, setFormData] = useState({
        title:'',
        artist:'', 
    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.title]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.selected) {
            props.handleUpdateTrack(formData, props.selected._id)
        } else {
            props.handleAddTrack(formData);
        }
    }
    
    return (
        <div>
            <form>
                <label htmlFor="title">Title:</label>
                <input id="title" name="title" value={formData.title} onChange={handleChange} required />
            
                <label htmlFor="artist">Artist:</label>
                <input id="artist" name="artist" value={formData.artist} onChange={handleChange} required />
            <button type="submit">Add New Track</button>
            </form>
        </div>
    );
};

export default TrackForm;