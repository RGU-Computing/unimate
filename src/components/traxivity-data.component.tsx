import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Icon} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faWalking,
  faShoePrints,
  faBullseye,
  faBurn,
} from '@fortawesome/free-solid-svg-icons';

export default class TraxivityDataTab extends Component {
  numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) {
      x = x.replace(pattern, '$1,$2');
    }
    return x;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.container}>
            {/* <Icon style={styles.icon} fill="#712177" name="shield-outline" /> */}
            <FontAwesomeIcon size={30} color={'#712177'} icon={faBullseye} />
            <Text style={styles.littleText}>{this.props.data.textBox1}</Text>
            <Text style={styles.bigtext}>
              {this.numberWithCommas(Math.round(this.props.data.numBox1))}
            </Text>
          </View>
          <View style={styles.container}>
            <FontAwesomeIcon size={30} color={'#712177'} icon={faShoePrints} />
            <Text style={styles.littleText}>{this.props.data.textBox2}</Text>
            <Text style={styles.bigtext}>
              {this.numberWithCommas(Math.round(this.props.data.numBox2))}
            </Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.container}>
            <FontAwesomeIcon size={30} color={'#712177'} icon={faBurn} />
            <Text style={styles.littleText}>{this.props.data.textBox3}</Text>
            <Text style={styles.bigtext}>
              {this.numberWithCommas(Math.round(this.props.data.numBox3))}
            </Text>
          </View>
          <View style={styles.container}>
            <FontAwesomeIcon size={30} color={'#712177'} icon={faWalking} />
            <Text style={styles.littleText}>{this.props.data.textBox4}</Text>
            <Text style={styles.bigtext}>
              {this.numberWithCommas(Math.round(this.props.data.numBox4))}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    // borderColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#712177',
  },
  bigtext: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#712177',
  },
  littleText: {
    fontSize: 15,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
