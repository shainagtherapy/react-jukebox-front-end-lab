import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';

import TrackList from './components/TrackList/TrackList';
import NowPlaying from './components/NowPlaying/NowPlaying';
import TrackForm from './components/TrackForm/TrackForm';
import { set } from 'mongoose';


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

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId)
      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }
      const updatedTrackList = tracks.map((track) => (
        track._id !== updatedTrack._id ? track : updatedTrack
      ));
      console.log(updatedTrackList)
      setTracks(updatedTrackList)
      setSelected(updatedTrack);
      setIsFormOpen(false);

      } catch (err) {
        console.log(err);
      }
    };

    const handleSumbit = (event) => {
      event.preventDefault();
      if(props.selected) {
        props.handleUpdateTrack(formData, props.selected._id);
      } else {
        props.handleAddTrack(formData);
      }
    };

  return (
    <>
    <h1>JukeBox Hero</h1>
    <TrackList tracks={tracks} 
    handleSelect={handleSelect} handleFormView={handleFormView} isFormOpen={isFormOpen} />
    {isFormOpen ? (
    <TrackForm handleAddTrack={handleAddTrack} selected={selected} handleUpdateTrack={handleUpdateTrack}/> ) : (
    <NowPlaying selected={selected} handleFormView={handleFormView} /> )}
    </>
  );
};

export default App;