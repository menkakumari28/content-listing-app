/* eslint-disable react/prop-types */
import { Card, Spin } from "antd";
import { Suspense } from "react";

const CardComponent = ({ title, posterImage }) => {
  const { Meta } = Card;
  return (
    <Card
      style={{
        width: '100%',
        height:'100%',
        borderRadius:0,
        background:'#000',
        border:'none',
      }}
      cover={
        <Suspense fallback={<Spin size="default" />}>
          <img
            alt={posterImage}
            src={`${import.meta.env.VITE_BASE_API_URL}/images/${
              !posterImage?.includes("posterthatismissing")
                ? posterImage
                : "placeholder_for_missing_posters.png"
            }`}
          />
        </Suspense>
      }
    >
      <Meta title={title} />
    </Card>
  );
};

export default CardComponent;
