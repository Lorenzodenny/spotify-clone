import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { removeFromFavouriteAction, updateTrackAction } from "../redux/actions";

const MyLibrary = () => {
  const favourites = useSelector((state) => state.favourite.list);
  const dispatch = useDispatch();

  const handlePlaySong = (song) => {
    dispatch(updateTrackAction(song)); // Aggiorna la traccia da riprodurre
    // Qui dovresti implementare la logica di riproduzione della canzone
    console.log(`Riproduzione della canzone: ${song.title}`);
  };

  return (
    <>
      <div className="mainPage mt-3 ms-5">
        <Row>
          <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
            {/* ... */}
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="rock">
              <h2>My Library</h2>
              <div id="rockSection">
                <Row xs={1} md={2} lg={3} xl={4} className="g-2">
                  {favourites.map((song) => (
                    <Col key={song.id}>
                      <img
                        src={song.album.cover_medium}
                        alt={song.album.title}
                        onClick={() => handlePlaySong(song)}
                      />
                      <div className="d-flex justify-content-around align-items-center me-3">
                        <p
                          className="custom-font-size-p mt-3"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Titolo: {song.title.length ? song.title : `${song.title}...`}
                        </p>
                        <div className="me-5">
                          <AiFillHeart
                            className="text-white ms-2"
                            onClick={() => {
                              dispatch(removeFromFavouriteAction(song.id));
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MyLibrary;
