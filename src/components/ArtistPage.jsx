import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavouriteAction, removeFromFavouriteAction } from "../redux/actions";


const ArtistPage = () => {
  const [artist, setArtist] = useState({});
  const [tracks, setTracks] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.list);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`, {
          method: 'GET',
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNTY5YzE4N2U1YzAwMTgxNGM2YjQiLCJpYXQiOjE3MDU2NjIxMDgsImV4cCI6MTcwNjg3MTcwOH0.aBztB7t0GA8QRopl6rgganyDdrzE7DVzdja5mvqIXmE"
          },
        });

        if (response.ok) {
          const result = await response.json();
          setArtist(result);
          setTracks(result.top_tracks.data);
        } else {
          console.error('Errore nella richiesta:', response.status);
        }
      } catch (error) {
        console.error('Errore generico:', error);
      }
    };
    
    fetchArtist();
  }, [id]);
  
  const handleToggleSelected = (index) => {
    setTracks((prevTracks) => {
      const updatedTracks = [...prevTracks];
      updatedTracks[index] = { ...updatedTracks[index], selected: !updatedTracks[index].selected };
      return updatedTracks;
    });
  };

  const handleFavouriteToggle = (song) => {
    if (favourites.some(fav => fav.id === song.id)) {
      dispatch(removeFromFavouriteAction(song.id));
    } else {
      dispatch(addToFavouriteAction(song));
    }
  };

  return (
    <div className="col-12 col-md-9 offset-md-3 mainPage">
      <Row>
        <Col md={3} className="pt-5 text-center mt-5 me-5">
        <p className="bg-success baky">Fan: {artist.nb_fan} </p>
        <p className="bg-success baky">Album: {artist.nb_album} </p>
        </Col>
        <Col md={3} className="pt-5 text-center" id="img-container">
          {artist && (
            <>
                <img src={artist.picture_medium} alt={artist.name} />
                <p className="text-white mt-3 fw-bold">{artist.name} </p>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ArtistPage;
