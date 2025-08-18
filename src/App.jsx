import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';

import TrackList from './components/TrackList/TrackList';
import TrackForm from './components/TrackForm/TrackForm';


const App = () => {
  const [tracks, setTracks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getTracks = async () => {
      try{
        const gotTracks = await trackService.index();

        if (gotTracks.err) {
          throw new Error(gotTracks.err)
        }
        setTracks(gotTracks);

      } catch (err) {
        console.log(err)
      }
    }
    getTracks()
  }, []);

  const handleCreate = async (trackData) => {
    try {
      const created = await trackService.create(trackData);
      setTracks([newTrack, ...tracks])

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <h1>JukeBox Hero</h1>
    <TrackList tracks={tracks} />
    </>
  )
};

export default App;