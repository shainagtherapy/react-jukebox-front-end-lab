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
                    <li key={track._id}>"{track.title}" by {track.artist}</li>
                ))}
                </ul>
            )}
        </div>
        </div>
    )
}





export default TrackList;