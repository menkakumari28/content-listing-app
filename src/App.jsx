import { Layout, theme } from "antd";
import "./App.css";
import Header from "./components/Header";
import CardComponent from "./components/Card";
import { useMovieCard } from "./context/CardContext/MovieCardContext";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const pageNumber = useRef(1);
  const errorMessage = useRef("");
  const [headerTitle, setHeaderTitle] = useState("");
  const { Header: LayoutHeader, Content } = Layout;
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const { movieCard, setMovieCard } = useMovieCard();
  const getContentList = () => {
    fetch(
      `${import.meta.env.VITE_BASE_API_URL}data/page${pageNumber.current}.json`
    )
      .then((res) => res.json())
      .then((resp) => {
        setMovieCard((prevState) =>
          prevState.concat(resp.page["content-items"].content)
        );
        setHeaderTitle(resp.page.title);
        pageNumber.current = pageNumber.current + 1;
      })
      .catch((err) => {
        console.log(err);
        errorMessage.current = err;
      });
  };

  const handleScroll = useCallback(() => {
    let userScrollHeight = window.innerHeight + window.scrollY + 100;
    let windowBottomHeight = document.documentElement.offsetHeight;
    console.log(`${userScrollHeight} - ${windowBottomHeight}`);
    if (userScrollHeight >= windowBottomHeight) {
      getContentList();
    }
  }, []);

  useEffect(() => {
    getContentList();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Layout>
      <LayoutHeader
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Header title={headerTitle} />
      </LayoutHeader>
      <Content style={{ padding: "0" }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: "#000",
            borderRadius: borderRadiusLG,
            display: "grid",
            gridTemplateColumns: "30% 30% 30%",
            gap: "1rem",
          }}
        >
          {movieCard?.map((card, index) => {
            return (
              <CardComponent
                key={index}
                title={card.name}
                posterImage={card["poster-image"]}
              />
            );
          })}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
