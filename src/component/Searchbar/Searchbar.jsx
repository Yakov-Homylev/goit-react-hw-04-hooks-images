import { BsSearch } from "react-icons/bs";
import React from "react";
import {
  HeaderSearchbar,
  Searchform,
  SumbitButton,
  ButtonLabel,
  SeacrhInput,
} from "./Searchbar.styled";
import PropTypes from "prop-types";

function Searchbar({ onSumbit }) {
  return (
    <HeaderSearchbar>
      <Searchform onSubmit={onSumbit}>
        <SumbitButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
          <BsSearch />
        </SumbitButton>

        <SeacrhInput
          name="keyword"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Searchform>
    </HeaderSearchbar>
  );
}

Searchbar.propTypes = {
  onSumbit: PropTypes.func,
};

export default Searchbar;
