/* eslint-disable react/prop-types */
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import "./index.css";
import { useMovieCard } from "../../context/CardContext/MovieCardContext";

const Header = ({ title }) => {
  const [searchBox, setSearchBox] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const { movieCard, setSearchResult } = useMovieCard();
  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    const filteredMoveCard = movieCard?.filter((movie) =>
      movie.name.includes(searchVal.toLowerCase())
    );
    console.log(filteredMoveCard);
    setSearchResult(filteredMoveCard);
  };
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div className="head">
        <span>
          <ArrowLeftOutlined />
        </span>
        {title}
      </div>
      <span>
        {searchBox ? (
          <Input
            prefix={<SearchOutlined />}
            name="search"
            value={searchVal}
            onBlur={() => setSearchBox(false)}
            onChange={handleSearch}
            size="small"
          />
        ) : (
          <Button
            type="link"
            onClick={() => setSearchBox(true)}
            icon={<SearchOutlined />}
          />
        )}
      </span>
    </div>
  );
};
export default Header;
