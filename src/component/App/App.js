import React, { Component } from "react";
import fetchImage from "../../API/imageApi";
import Searchbar from "../Searchbar/Searchbar";
import ImageGalleryItem from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import { AppContainer, ErrorMessage } from "./App.styled";

class App extends Component {
  state = {
    images: [],
    searchWord: "",
    page: 1,
    isLoading: false,
    error: false,
    isVisibleModal: false,
    loadMoreButtonVisible: false,
    bigImage: "",
    maxImages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (
        prevState.searchWord !== this.state.searchWord ||
        prevState.page !== this.state.page
      ) {
        const data = await fetchImage(this.state.searchWord, this.state.page);

        if (data.hits.length === 0) {
          throw new Error("Не найдено");
        }
        this.setState({
          images: [...this.state.images, ...data.hits],
          error: false,
          isLoading: false,
          maxImages: data.totalHits,
          loadMoreButtonVisible: true,
        });
        if (this.state.maxImages === this.state.images.length) {
          this.setState({ loadMoreButtonVisible: false });
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        isLoading: false,
      });
    } finally {
    }
  }

  onSumbitSearchWord = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value.trim();

    if (!keyword) {
      return;
    }

    this.setState({
      searchWord: keyword,
      page: 1,
      images: [],
      isLoading: true,
    });
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1, isLoading: true });
  };

  toBigImage = (e) => {
    this.setState({
      bigImage: e.target.alt,
      isVisibleModal: true,
    });
  };

  onBackdropClick = (e) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    this.hideModal();
  };

  hideModal = () => {
    this.setState({ isVisibleModal: false });
  };

  render() {
    const {
      images,
      error,
      searchWord,
      isLoading,
      isVisibleModal,
      bigImage,
      loadMoreButtonVisible,
    } = this.state;
    const isVisibleButton = images.length > 0 && loadMoreButtonVisible;

    return (
      <AppContainer>
        <Searchbar onSumbit={this.onSumbitSearchWord} />
        <ImageGalleryItem images={images} onClick={this.toBigImage} />
        {this.state.isLoading && <Loader />}
        {isVisibleButton ? (
          <Button name="Load more" onClick={this.loadMore} />
        ) : null}
        {isLoading && <Loader />}
        {error && (
          <ErrorMessage>
            По вашему запросу {searchWord} ничего не найдено!
          </ErrorMessage>
        )}
        {isVisibleModal && (
          <Modal
            bigImage={bigImage}
            alt={searchWord}
            onBackdropClick={this.onBackdropClick}
            onEsc={this.hideModal}
          />
        )}
      </AppContainer>
    );
  }
}

export default App;
