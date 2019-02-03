import React from 'react';
import {
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import { FontIcons } from '../../assets/icons';
import { Avatar } from 'react-native-elements';


import {
  RkButton, RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten';
import { MainRoutes } from '../../config/navigation/routes';
import NavigationType from '../../config/navigation/propTypes';
import { Consumer } from '../../context/context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import SliderEntry from './SliderEntry';

import Gradient from 'react-native-css-gradient';

const { width, height } = Dimensions.get('window');
const gradient = 'linear-gradient(225deg, #63e2ff 0%, #4CC3FF 48%, #087CA7 100%)';
const SLIDER_1_FIRST_ITEM = 1;
export const ENTRIES1 = [
  {
    title: 'Chat',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
    icon: { name: 'comment', type: 'font-awesome' },
  },
  {
    title: 'Noticias',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    icon: { name: 'comment', type: 'font-awesome' },
  },
  {
    title: 'Archivos',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    icon: { name: 'comment', type: 'font-awesome' },
  },
];

const paddingValue = 8;

export class GridV1 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Bienvenido'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get('window').width;
    this.itemSize = {
      width: (screenWidth - (paddingValue * 6)) / 2,
      height: (screenWidth - (paddingValue * 6)) / 2,
    };
  }

  onItemPressed = (item) => {
    this.props.navigation.navigate(item.id);
  };

  renderItems = () => MainRoutes.map(route => (
    <View>
      <RkButton
        rkType='square shadow'
        style={{ ...this.itemSize }}
        key={route.id}
        onPress={() => this.onItemPressed(route)}>
        <RkText style={styles.icon} rkType='primary moon menuIcon'>
          {route.icon}
        </RkText>
        <RkText>{route.title}</RkText>
      </RkButton>
    </View>
  ));
  _renderItemWithParallax = ({ item, index }, parallaxProps) => (<SliderEntry
    onItemPressed={() => this.props.navigation.navigate(item.id)}
    data={item}
    even={(index + 1) % 2 === 0}
    parallax
    parallaxProps={parallaxProps}
                                                                 />)

  renderView = () => (
    <Carousel
      ref={c => this._slider1Ref = c}
      data={MainRoutes}
      renderItem={this._renderItemWithParallax}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages
      firstItem={SLIDER_1_FIRST_ITEM}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
      containerCustomStyle={styles.slider}
      contentContainerCustomStyle={styles.sliderContentContainer}
      loop
      loopClonesPerSide={2}
      onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
    />
  );

  renderHead = () => (
    <View style={{ flex: 1, paddingLeft: 45, paddingTop: 30 }}>
      <View style={{ flex: 2 }}>
        <Avatar
          size="medium"

          rounded
          source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
        />
      </View>
      <View style={{ flex: 2 }}>
        <RkText rkType='header1' style={{ color: '#fff' }}>Hola, Amaru</RkText>
        <RkText rkType='primary4' style={{ color: '#fff', paddingTop: 20 }}>Perteneces a</RkText>
        <RkText rkType='primary4' style={{ color: '#fff' }}>CESFAM La pincoya</RkText>
      </View>
    </View>
  );

  render = () => (

    // <Consumer>
    //   {value => {
    //   console.log('value', value);
    // }}
    // </Consumer>
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Gradient
        gradient={gradient}
        style={{
                  width,
                  height,
                  // alignItems: 'flex-start',
                  // justifyContent: 'flex-end',
                  // padding: 20,
                  marginBottom: 4,
                }}>
        <View style={{ flex: 2 }}>
          {this.renderHead()}
        </View>
        <View style={{ flex: 4 }} >
          {this.renderView()}
        </View>
      </Gradient>
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  root: {
    backgroundColor: theme.colors.screen.scroll,
    // backgroundColor: '#05B2DC',
    padding: paddingValue,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    marginBottom: 16,
  },
}));
