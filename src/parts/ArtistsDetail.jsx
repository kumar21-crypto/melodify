import React, { useContext, useEffect, useState } from 'react';
import { AudioContext } from '../player/AudioContext';
import { useParams, useLocation } from 'react-router';

const ArtistsDetail = () => {
    
    const location = useLocation();
    const { data: artistId } = location.state || {};
    const { playlist, setCurrentSong, isPlaying, setIsPlaying } = useContext(AudioContext);
    const [songs, setSongs] = useState([]);
    const [artistData, setartistData] = useState();

    useEffect(  () => {
        const fetchArtistDetails = async () => {
            const artistData = await fetch(`https://saavn.dev/api/artists/${artistId}`);
            const data = await artistData.json();

            if(data.success){
                console.log("success",data?.data)
                setartistData(data)
            }
        
           
        };

        fetchArtistDetails();
    }, []);

    // if (!artist) return <div>Loading...</div>;

    return (
        <div className="w-full h-auto text-white">
           {
           
           }
        </div>
    );
};

export default ArtistsDetail;