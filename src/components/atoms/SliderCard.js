import React from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '~/style/sliderEntry';
import imageSrc from '~/static/images';

const SliderCard = (props) => {
  const { data: { title, subtitle, illustration, imageNumber = 0, index }, even, parallax, parallaxProps, random } = props;

  const uppercaseTitle = title ? (
    <Text
      style={[styles.title, even ? styles.titleEven : {}]}
      numberOfLines={2}
    >
      { title.toUpperCase() }
      {/* Job List ID: xxxxxxxxx */}
    </Text>
  ) : false;

  const image = !parallax ? (
    <ParallaxImage
      source={{ uri: illustration }}
      containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
      style={[styles.image, { opacity: 0.2 }]}
      parallaxFactor={0.35}
      showSpinner
      spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
      {...parallaxProps}
    />
  ) : (
    <Image
      source={{ uri: illustration }}
      style={[styles.image, { opacity: 0.2 }]}
    />
  );

  const defaultBackground = imageSrc.background[`background${imageNumber}`];

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={() => { alert(`You've clicked '${title}'`); }}
    >
      {/* <View style={styles.shadow} /> */}
      <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
        {/* { image } */}
        <ImageBackground
          source={defaultBackground}
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
          imageStyle={[styles.image, { opacity: 0.2 }]}
        >
          <Text style={[styles.context, even ? styles.contextEven : {}]}> {index + 1} {`random: ${random}`} </Text>
        </ImageBackground>
        <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
      </View>
      <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
        { uppercaseTitle }
        <Text
          style={[styles.subtitle, even ? styles.subtitleEven : {}]}
          numberOfLines={2}
        >
          { subtitle }
          {/* {`Job List index: ${index + 1}`} */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

SliderCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    illustration: PropTypes.string,
    imageNumber: PropTypes.number,
    index: PropTypes.number,
  }),
  even: PropTypes.bool,
  parallax: PropTypes.bool,
  parallaxProps: PropTypes.object,
};

SliderCard.defaultProps = {
  data: {
    title: '',
    subtitle: '',
    illustration: '',
    imageNumber: 0,
    index: 0,
  },
  even: false,
  parallax: false,
  parallaxProps: {},
};

export default SliderCard;
