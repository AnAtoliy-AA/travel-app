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
    maxWidth: 345,
    cursor: 'pointer',
  },
  desc: {
    height: '60px',
    overflowY: 'hidden',
    lineHeight: '20px',
    position: 'relative',
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
    speed: 750,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const renderSlides = () =>
    attractions.map(
      (item: { name: string; image: string; description: string }) => (
        <Card className={classes.root} key={item.name}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={item.name}
              height="180"
              image={item.image}
              title={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
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
