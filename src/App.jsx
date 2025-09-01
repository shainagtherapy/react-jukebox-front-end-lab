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
    setSelected(null);
    setIsFormOpen(!isFormOpen);
  }

  const handleOpenAddForm = () => {
  setSelected(null);
  setIsFormOpen(true);
  };

  const handleOpenEditForm = (track) => {
    setSelected(track);
    setIsFormOpen(true);
  };

  const handleEdit = (track) => {
    setSelected(track);
    setIsFormOpen(true);
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
        throw new Error(updatedTrack.err)
      }
      const updatedTrackList = tracks.map((track) => (
        track._id !== updatedTrack._id ? track : updatedTrack
      ));

      setTracks(updatedTrackList)
      setSelected(updatedTrack);
      setIsFormOpen(false);

      } catch (err) {
        console.log(err);
      }
    };

    const handleDeleteTrack = async (trackId) => {
      try {
        const deletedTrack = await trackService.deleteTrack(trackId)

        if (deletedTrack?.err) {
          throw new Error(deletedTrack.err);
        }
        console.log(deletedTrack)

        setTracks(prev => prev.filter(track => track._id !== trackId));
        setSelected(null);
        setIsFormOpen(false);
      } catch (err) {
        console.log(err);
      }
    };


  return (
    <>
    <h1>JukeBox Hero</h1>
    <TrackList tracks={tracks} 
    handleSelect={handleSelect} handleFormView={handleFormView} isFormOpen={isFormOpen} handleEdit={handleEdit}/>
    {isFormOpen ? (
    <TrackForm handleAddTrack={handleAddTrack} selected={selected} handleUpdateTrack={handleUpdateTrack}/> ) : (
    <NowPlaying selected={selected} handleOpenEditForm={handleOpenEditForm} handleDeleteTrack={handleDeleteTrack} /> )}
    </>
  );
};

export default App;