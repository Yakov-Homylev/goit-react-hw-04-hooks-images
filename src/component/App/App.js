import React, { useState, useEffect, useRef } from "react";
import fetchImage from "../../API/imageApi";
import Searchbar from "../Searchbar/Searchbar";
import ImageGalleryItem from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import { AppContainer, ErrorMessage } from "./App.styled";

const Status = {
  PENDING: "pending",
  LOADING: "loading",
  ERROR: "error",
  MODAL: "modal",
};

const FETCHIMAGESLENGTH = 12;

function App() {
  const [images, setImages] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.PENDING);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [bigImage, setBigImage] = useState("");
  const isNeedFetch = useRef(false);

  useEffect(() => {
    if (!isNeedFetch.current) {
      return;
    }
    isNeedFetch.current = false;

    if (!searchWord) {
      return;
    }
    fetchImage(searchWord, page)
      .then((data) => {
        if (data.hits.length === 0) {
          setLoadMoreButton(false);
          throw new Error();
        }
        setImages([...images, ...data.hits]);
        setStatus(Status.PENDING);

        if (data.hits.length < FETCHIMAGESLENGTH) {
          setLoadMoreButton(false);
          return;
        }
        setLoadMoreButton(true);
      })
      .catch((error) => {
        setStatus(Status.ERROR);
        setLoadMoreButton(false);
      });
  }, [images, page, searchWord]);

  const onSumbitSearchWord = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value.trim();

    if (!keyword) {
      return;
    }
    setSearchWord(keyword);
    setPage(1);
    setImages([]);
    setStatus(Status.LOADING);
    isNeedFetch.current = true;
  };

  const loadMore = () => {
    setPage(page + 1);
    setStatus(Status.LOADING);
    isNeedFetch.current = true;
  };

  const toBigImage = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setBigImage(e.target.alt);
    setStatus(Status.MODAL);
  };

  const hideModalOnEsc = (e) => {
    setStatus(Status.PENDING);
  };

  const hideModalOnClick = (e) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    hideModalOnEsc();
  };

  return (
    <AppContainer>
      <Searchbar onSumbit={onSumbitSearchWord} />
      <ImageGalleryItem images={images} onClick={toBigImage} />
      {loadMoreButton && <Button name="Load more" onClick={loadMore} />}
      {Status.LOADING === status && <Loader />}
      {Status.ERROR === status && (
        <ErrorMessage>
          По вашему запросу {searchWord} ничего не найдено!
        </ErrorMessage>
      )}
      {Status.MODAL === status && (
        <Modal
          bigImage={bigImage}
          alt={searchWord}
          onEsc={hideModalOnEsc}
          onBackdropClick={hideModalOnClick}
        />
      )}
    </AppContainer>
  );
}

export default App;
