import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import { RkText } from 'react-native-ui-kitten';
import { Avatar } from 'react-native-elements';

export default class SliderEntry extends Component {
    static propTypes = {
      data: PropTypes.object.isRequired,
      even: PropTypes.bool,
      parallax: PropTypes.bool,
      parallaxProps: PropTypes.object,
      onItemPressed: PropTypes.func,
    };


    render() {
      const { data: { title, subtitle, icon }, even } = this.props;
      console.log(this.props);

      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slideInnerContainer}
          onPress={() => { this.props.onItemPressed(this.props.data); }}>
          <View style={styles.shadow} >
            <View style={[styles.container]}>
              <View style={{ flex: 4 }}>
                {/* <Avatar badge={{ icon }} rkType='big' /> */}
                <Avatar
                  size="small"
                  overlayContainerStyle={{ backgroundColor: '#4CC3FF' }}
                  rounded
                  icon={{ name: 'comment', type: 'font-awesome' }}
                />
                <RkText rkType='primary moon menuIcon'>
                  {/* {icon} */}
                </RkText>
              </View>
              <View style={{ flex: 2 }}>
                <RkText rkType='header1'>{title}</RkText>
                <RkText rkType='secondary5' style={{ marginTop: 10 }}>{subtitle}</RkText>
              </View>
              sdasd
            </View>
          </View>
        </TouchableOpacity>
      );
    }
}
