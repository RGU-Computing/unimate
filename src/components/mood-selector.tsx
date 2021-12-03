import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Card, Text, Divider} from '@ui-kitten/components';
import icons from './helpers/icons';
import MoodSelectorEmoji from './mood-selector-emoji';

export class MoodSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: this.props.value ? this.props.value : 0,
      label: this.props.value
        ? this._getLabelByValue(this.props.value)
        : 'Please Select!',
    };
  }

  _getLabelByValue(value) {
    if (value === 0) {
      return 'Please Select!';
    } else {
      return this.props.reactions[value - 1];
    }
  }

  handleChange(index) {
    this.props.onChange(index);
    this.setState({value: index, label: this._getLabelByValue(index)});
  }

  render() {
    return (
      <Card style={this.props.style}>
        <Layout style={styles.container}>
          <Text category={'h6'} style={styles.title}>
            {this.props.title}
          </Text>
          <Text category={'h6'}> : </Text>
          <Text category={'h6'} style={styles.label}>
            {this.state.label}
          </Text>
          <Layout style={styles.statusContainer}>
            <Text category={'h6'} appearance={'hint'} style={styles.status}>
              Status
            </Text>
          </Layout>
        </Layout>
        <Divider style={styles.divider} />
        <Layout style={styles.wrapper}>
          {this.props.reactions.map((item, index) => {
            return (
              <Layout style={styles.icon} key={index}>
                <MoodSelectorEmoji
                  id={index + 1}
                  icon={icons.find(this.props.group, item)}
                  label={item}
                  isActive={this.state.value === index + 1}
                  onChange={this.handleChange}
                />
              </Layout>
            );
          })}
        </Layout>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    marginTop: 10,
    width: '20%',
    backgroundColor: 'transparent',
  },
  title: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  status: {
    fontSize: 14,
  },
  label: {
    backgroundColor: 'rgba(113, 33, 119, 1)',
    borderRadius: 7,
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 7,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  divider: {
    marginTop: 10,
  },
});
