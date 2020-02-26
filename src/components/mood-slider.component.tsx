import React from 'react';
import { StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Text, Layout, Card, CardHeader } from '@ui-kitten/components';

export class MoodSlider extends React.Component {

    constructor(props: Readonly<{}>) {
      super(props);
      this.state = {
        value: this.props.value !== 0 ? this.props.value : 0,
        label: this.props.value !== 0 ? this._getLabelByValue(this.props.value) : 'Not Specified'
      }
    }

    _getLabelByValue(value) {
        return this.props.values[value].label
    }

    header = () => (
        <CardHeader style={styles.subtitles} title={this.props.title}/>
    );

    render() {
        return (
            <Card style={styles.card, this.props.style} /*header={this.header}*/ status='success'>
                <Text category={'h6'} style={styles.subtitles}>Happiness</Text>
                <Slider
                    step={1}
                    minimumValue={0}
                    maximumValue={5}
                    //thumbImage={this.state.anxiety.icon}
                    onValueChange={
                        value => {
                            this.setState({ anxiety: value });
                        }
                    }
                    value={this.state.anxiety}
                    style={styles.slider}
                />
                <Layout style={styles.row} level='2'>
                    <Text style={this.state.anxiety === 0 ? styles.activeCol : styles.col}></Text>
                    <Text style={this.state.anxiety === 1 ? styles.activeCol : styles.col}>😭</Text>
                    <Text style={this.state.anxiety === 2 ? styles.activeCol : styles.col}>🙁</Text>
                    <Text style={this.state.anxiety === 3 ? styles.activeCol : styles.col}>😐</Text>
                    <Text style={this.state.anxiety === 4 ? styles.activeCol : styles.col}>🙂</Text>
                    <Text style={this.state.anxiety === 5 ? styles.activeCol : styles.col}>😁</Text>
                </Layout>
            </Card>
        )
    }

}

const styles = StyleSheet.create({
      subtitles: {
        marginTop: 12,
        marginBottom: 18,
        textAlign: 'center'
      },
      slider: {
        marginHorizontal: '5%',
        marginBottom: 15
      },
      row: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 30
      },
      col: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 20,
        opacity: 0.5,
        fontSize: 18
      },
      activeCol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 20,
        opacity: 1,
        fontSize: 18
      }
});
