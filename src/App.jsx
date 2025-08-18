import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';

import TrackList from './components/TrackList/TrackList';
import TrackForm from './components/TrackForm/TrackForm';
import TrackDetail from './components/TrackDetail/TrackDetail';


const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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


  const handleSelect = (track) => {
    console.log('track clicked:', track)
    setSelected(track);
    setIsFormOpen(false);
  }

  const handleFormView = (track) => {
    if (!track._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  }

  const handleCreate = async (trackData) => {
    try {
      const newTrack = await trackService.create(trackData);
      setTracks([newTrack, ...tracks])
      setIsFormOpen(false);

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
    <h1>JukeBox Hero</h1>
    <TrackList tracks={tracks} 
    handleSelect={handleSelect} />
    <TrackForm />
    <TrackDetail selected={selected} />
    
    </>
  )
};

export default App;