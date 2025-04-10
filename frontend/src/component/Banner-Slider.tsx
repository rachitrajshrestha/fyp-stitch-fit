import React from "react";

function BannerSlider() {
  return (
    <>
      <div className="swiper-container main-slider loading">
        <div className="swiper-wrapper">
          {[
            {
              name: "Shaun Matthews",
              image:
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
            },
            {
              name: "Alexis Berry",
              image:
                "https://images.unsplash.com/photo-1500643752441-4dc90cda350a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
            },
            {
              name: "Billie Pierce",
              image:
                "https://images.unsplash.com/photo-1465408953385-7c4627c29435?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
            },
            {
              name: "Trevor Copeland",
              image:
                "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTkzNg&ixlib=rb-1.2.1&q=85",
            },
            {
              name: "Bernadette Newman",
              image:
                "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTk1OQ&ixlib=rb-1.2.1&q=85",
            },
          ].map((slide, index) => (
            <div className="swiper-slide" key={index}>
              <figure
                className="slide-bgimg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <img
                  src={slide.image}
                  className="entity-img"
                  alt={slide.name}
                />
              </figure>
              <div className="content">
                <p className="title">{slide.name}</p>
                <span className="caption">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* If we need navigation buttons */}
        <div className="swiper-button-prev swiper-button-white"></div>
        <div className="swiper-button-next swiper-button-white"></div>
      </div>

      {/* Thumbnail navigation */}
      <div className="swiper-container nav-slider loading">
        <div className="swiper-wrapper" role="navigation">
          {[
            "Shaun Matthews",
            "Alexis Berry",
            "Billie Pierce",
            "Trevor Copeland",
            "Bernadette Newman",
          ].map((name, index) => {
            const image = [
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
              "https://images.unsplash.com/photo-1500643752441-4dc90cda350a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
              "https://images.unsplash.com/photo-1465408953385-7c4627c29435?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
              "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTkzNg&ixlib=rb-1.2.1&q=85",
              "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTk1OQ&ixlib=rb-1.2.1&q=85",
            ][index];
            return (
              <div className="swiper-slide" key={index}>
                <figure
                  className="slide-bgimg"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <img src={image} className="entity-img" alt={name} />
                </figure>
                <div className="content">
                  <p className="title">{name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BannerSlider;
