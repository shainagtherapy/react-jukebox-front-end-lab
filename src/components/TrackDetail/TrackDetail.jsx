const TrackDetail = (props) => {
    if (!props.selected) {
        return (
            <div>
                <h1>NO DETAILS</h1>
            </div>
        );
    };


    return (
        <div>
            <h2> "{props.selected.title}" </h2>
            <h2> {props.selected.artist} </h2>
        </div>
    );
};

export default TrackDetail;