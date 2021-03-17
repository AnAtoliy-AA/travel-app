import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselLists.scss';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 260,
    cursor: 'pointer',
  },
  desc: {
    height: '40px',
    overflowY: 'hidden',
    lineHeight: '20px',
    position: 'relative',
  },
  title: {
    height: '55px',
  },
});

type TProps = {
  attractions: any;
};

const CarouselLists: React.FC<TProps> = ({ attractions }) => {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderSlides = () =>
    attractions.map(
      (item: { name: string; image: string; description: string }) => (
        <Card className={classes.root} key={item.name}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={item.name}
              height="120"
              image={item.image}
              title={item.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="h2"
                className={classes.title}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.desc}
              >
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )
    );

  return (
    <div className="carousel-countainer">
      <Slider {...settings}>{renderSlides()}</Slider>
    </div>
  );
};

export default CarouselLists;
