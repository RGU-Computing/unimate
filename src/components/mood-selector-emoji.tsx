import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

export class MoodSelectorEmoji extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive ? this.props.isActive : false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onChange(this.props.id);
  }

  render() {
    return (
      <Layout style={styles.wrap}>
        <TouchableOpacity onPress={this.handleChange}>
          <Image style={styles.icon} source={{uri: this.props.icon}} />
          <Text
            style={[
              styles.label,
              this.props.isActive ? styles.active : styles.inactive,
            ]}
            numberOfLines={2}
            ellipsizeMode="head">
            {this.props.label}
          </Text>
        </TouchableOpacity>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    padding: 5,
    backgroundColor: 'transparent',
  },
  icon: {
    paddingBottom: '100%',
    resizeMode: 'cover',
  },
  label: {
    borderRadius: 8,
    color: '#fff',
    fontSize: 10,
    paddingTop: 4,
    paddingBottom: 4,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    opacity: 1,
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    marginTop: 5,
  },
  active: {
    backgroundColor: 'rgba(113, 33, 119, 0.8)',
  },
  inactive: {
    backgroundColor: 'rgba(0,0,0,.8)',
  },
});

export default MoodSelectorEmoji;
