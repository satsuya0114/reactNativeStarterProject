import React, { useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Container, Content } from 'native-base';
import { Divider } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { commonStyle } from '~style/';
import sliderStyle, { colors } from '~/style/slider';
import { ENTRIES1 } from '~/static/entries';
import { sliderWidth, itemWidth } from '~/style/sliderEntry';
import { SliderCard } from '~atoms/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  qrCodeField: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

const jobListDemo = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
];

const imageArray = () => Array.from({ length: 30 }, () => Math.floor(Math.random() * 30));

const newJoblist = jobListDemo.map((obj, index) => ({
  ...obj,
  index,
  imageNumber: imageArray()[index % 30],
}));

const renderItemWithParallax = ({ item, index }, parallaxProps) => (
  <SliderCard
    data={item}
    even={(index + 1) % 2 === 0}
    parallax
    parallaxProps={parallaxProps}
    random={item.random}
  />
);

const JobListScreen = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef(null);
  const SLIDER_1_FIRST_ITEM = 1;
  const [joblist, setJoblist] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect');
    }, []),
  );

  const updateJoblist = () => {
    setJoblist(jobListDemo.map((obj, index) => ({
      ...obj,
      index,
      imageNumber: imageArray()[index % 30],
      random: Math.floor(Math.random() * 1000),
    })));
    setFirstIndex(firstIndex + 1);
    setSliderIndex(0);
    // setFirstIndex(0);
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <View style={styles.qrCodeField}>
          <Text>Output ss</Text>
        </View>
        <View style={styles.fullWidth}>
          <Divider style={[commonStyle.divider]} />
        </View>
        <View style={sliderStyle.exampleContainer}>
          <Text style={sliderStyle.title}>JobList</Text>
          <Text style={sliderStyle.subtitle}>demo</Text>
          <Button title="update joblist" onPress={updateJoblist} />
          <Button title="clear joblist" onPress={() => setJoblist([])} />
          <Carousel
            key={firstIndex}
            // key is to re-render flatList https://stackoverflow.com/questions/50621316/why-flatlist-is-not-updating-dynamically-in-react-native
            // extraData={joblist}
            ref={sliderRef}
            data={joblist}
            renderItem={renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            // hasParallaxImages
            firstItem={0}
            inactiveSlideScale={0.97}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={sliderStyle.slider}
            contentContainerCustomStyle={sliderStyle.sliderContentContainer}
            loop
            loopClonesPerSide={2}
            // autoplay
            // autoplayDelay={500}
            // autoplayInterval={3000}
            onSnapToItem={index => setSliderIndex(index)}
          />
          <Pagination
            dotsLength={joblist.length}
            activeDotIndex={sliderIndex}
            containerStyle={sliderStyle.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={sliderStyle.paginationDot}
            inactiveDotColor={colors.black}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={sliderRef}
            tappableDots={!!sliderRef}
          />
        </View>
      </Content>
    </Container>
  );
};

export default JobListScreen;
