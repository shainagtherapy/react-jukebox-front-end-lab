const TrackList = (props) => {

    return (
        <div>
        <h2>Track List</h2>
        <div>
            {!props.tracks.length ? (
                <h2>Empty Song Library!</h2>
            ) : (
                <ul>
                {props.tracks.map((track) => (
                    <li key={track._id} 
                    style={{ cursor: 'pointer', color: "white" }}
                    onClick={() => props.handleSelect(track)} >"{track.title}" by {track.artist}</li>
                ))}
                </ul>
            )}
        </div>
        <button onClick={props.handleFormView}>
            {props.isFormOpen ? 'Close Form' : 'Add Track'}
        </button>
        </div>
    );
};





export default TrackList;