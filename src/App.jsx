import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';

import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';
import TrackForm from './components/TrackForm/TrackForm';


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

  const handleFormView = () => {
    if (!tracks._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  }

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
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
    handleSelect={handleSelect} handleFormView={handleFormView} isFormOpen={isFormOpen} />
    {isFormOpen ? (
    <TrackForm handleAddTrack={handleAddTrack} selected={selected}/> ) : (
    <TrackDetail selected={selected} handleFormView={handleFormView} /> )}
    </>
  )
};

export default App;