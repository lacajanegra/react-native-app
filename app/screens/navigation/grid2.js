import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { MainRoutes } from '../../config/navigation/routes';
import NavigationType from '../../config/navigation/propTypes';


import { Consumer } from '../../context/context';

export class GridV2 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Bienvenido'.toUpperCase(),
  };

  state = {
    dimensions: undefined,
  };

  onContainerLayout = (event) => {
    if (this.state.height) {
      return;
    }
    const dimensions = event.nativeEvent.layout;
    this.setState({ dimensions });
  };

  renderItems = () => MainRoutes.map(this.renderItem);


  renderItem = (item) => (
    <RkButton
      rkType='tile'
      style={{ height: this.state.dimensions.width / 3, width: this.state.dimensions.width / 3 }}
      key={item.id}
      onPress={() => this.onItemPressed(item)}>
      <RkText style={styles.icon} rkType='primary moon xxlarge'>
        {item.icon}
      </RkText>
      <RkText rkType='small'>{item.title}</RkText>
    </RkButton>
  );

  onItemPressed = (item) => {
    console.log('item', item);
    this.props.navigation.navigate(item.id);
  };

  render() {
    console.log(this.renderItems());
    const items = this.state.dimensions === undefined ? <View /> : this.renderItems();
    return (
      <Consumer>
        {value => {
          console.log('value', value);
        }}
      </Consumer>
      // <ScrollView
      //   style={styles.root}
      //   onLayout={this.onContainerLayout}
      //   contentContainerStyle={styles.rootContainer}>
      //   {items}
      // </ScrollView>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  icon: {
    marginBottom: 16,
  },
}));
