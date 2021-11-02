import React from 'react';
import { StyleSheet, Linking, Dimensions } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
  TabView,
  Tab,
  Text,
  Layout,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon, InfoIcon } from '../../components/icons';
import Articles from '../../components/articles.component';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height
console.disableYellowBox = true;

export class HealthScreen extends React.Component {

  constructor(props) {
    super(props);
    this.setSelectedIndex = this.setSelectedIndex.bind(this)
    this.state = {
      selectedIndex: 0,
    }
  }

  renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={this.props.navigation.toggleDrawer}
    />
  );

  renderSOS = (): React.ReactElement => (
    <TopNavigationAction
      icon={InfoIcon}
      onPress={() => this.props.navigation.navigate('Health')}
    />
  );

  setSelectedIndex(index) {
    this.setState({selectedIndex: index})
  }

  render() {
    return (
      <SafeAreaLayout
        style={styles.safeArea}
        insets='top'>
        <TopNavigation
          title='Information'
          leftControl={this.renderDrawerAction()}
          rightControls={[this.renderSOS()]}
          titleStyle={{color:'white'}}
          style={{backgroundColor:'#712177'}}
        />
        {/* <Divider/> */}
        <TabView
            style={styles.tabView}
            tabBarStyle={styles.bar}
            indicatorStyle={styles.tabViewIndicator}
            selectedIndex={this.state.selectedIndex}
            onSelect={this.setSelectedIndex}>
              <Tab style={styles.tabContacts} titleStyle={this.state.selectedIndex === 0 ? styles.active_title : styles.inactive_title} title='Contacts'>
              <ScrollView style={{backgroundColor: 'white'}}>
              <Layout style={styles.container}>
                <Text style={{fontSize: 18, marginBottom: 14, fontWeight: 'bold', textAlign: 'left'}}>
                  Additional Help and Contact Points
                </Text>
                <Text>
                  <Text>We have identified some services that you can contact if you need help regarding your mental health. Feel free to contact them because they are more than happy to help you in everyway they can!</Text>
                </Text>
                <Layout style={[styles.item, {backgroundColor:'#712177'}]}>
                  <Text style={styles.title}>The Semicolon Effect</Text>
                  <Text style={styles.desc}>The Semicolon Effect is a mental health support group for those struggling with any mental health issues. A confidential and safe space to vent without been judged and aims at creating collaborative healthy coping mechanisms.</Text>
                  <Text style={{color:'#FFFFFF'}}>☎️ <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('tel:+94766745006')}>
                       +94 76 674 5006
                    </Text>
                  </Text>
                  <Text style={{color:'#FFFFFF'}}>✉️ <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('mailto:thesemicoloneffect@outlook.com')}>
                      thesemicoloneffect@outlook.com
                    </Text>
                  </Text>
                  <Text style={{color:'#FFFFFF'}}>🌐 <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('https://www.facebook.com/thesemicoloneffect/')}>
                      https://www.facebook.com/thesemicoloneffect/
                    </Text>
                  </Text>
                </Layout>
                <Layout style={[styles.item, {backgroundColor:'#1c8eef'}]}>
                  <Text style={styles.title}>Sumithrayo</Text>
                  <Text style={styles.desc}>Sumithrayo, a Government approved charity was founded by the Late Mrs. Joan De Mel in 1974. From its humble beginnings at Deans Road, Colombo 10, on premises loaned by the Ceylon Social Services League, Sumithrayo is now housed at no 60B Horton Place, Colombo 07, which was gifted by it’s beloved founder – Joan de Mel. The organization was incorporated by an Act of Parliament No.10 of 1986.</Text>
                  <Text style={{color:'#FFFFFF'}}>☎️ <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('tel:+94112692909')}>
                       +94 11 269 2909
                    </Text>, <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('tel:+94112696666')}>
                       +94 11 269 6666
                    </Text>, <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('tel:+94112683555')}>
                       +94 11 268 3555
                    </Text>
                  </Text>
                  <Text style={{color:'#FFFFFF'}}>✉️ <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('mailto:sumithra@sumithrayo.org')}>
                      sumithra@sumithrayo.org
                    </Text>
                  </Text>
                  <Text style={{color:'#FFFFFF'}}>🌐 <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('http://sumithrayo.org/')}>
                      http://sumithrayo.org/
                    </Text>
                  </Text>
                </Layout>
                <Layout style={[styles.item, {backgroundColor:'#17202A'}]}>
                  <Text style={styles.title}>Shanthi Maargam</Text>
                  <Text style={styles.desc}>Shanthi Maargam aims to provide safe spaces to enhance young people’s emotional well being and create opportunities for learning and growth.</Text>
                  <Text style={{color:'#FFFFFF'}}>☎️ <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('tel:+94717639898')}>
                       +94 71 763 9898
                    </Text>
                  </Text>
                  <Text style={{color:'#FFFFFF'}}>✉️ <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('mailto:shanthimaargam@gmail.com')}>
                      shanthimaargam@gmail.com
                    </Text>
                  </Text>
                  <Text style={{color:'#FFFFFF'}}>🌐 <Text style={{color: '#FFFFFF', textDecorationLine: 'underline'}}
                      onPress={() => Linking.openURL('https://www.facebook.com/pg/ShanthiMaargamSL/')}>
                      https://www.facebook.com/pg/ShanthiMaargamSL/
                    </Text>
                  </Text>
                </Layout>
              </Layout>
              </ScrollView>
            </Tab>
            <Tab style={styles.tabArticles} titleStyle={this.state.selectedIndex === 1 ? styles.active_title : styles.inactive_title} title='Articles'>
              <ScrollView>
                <Layout style={[styles.container, {paddingHorizontal: 0, paddingTop: 0}]}>
                  <Articles navigation={this.props.navigation}/>
                </Layout>
              </ScrollView>
            </Tab>
            
          </TabView>
      </SafeAreaLayout>
    );
  }

};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: '100%',
  },
  active_title: {
    color: '#712177',
    fontWeight: 'bold'
  },
  inactive_title: {
    fontWeight: 'bold'
  },
  bar: {
    height: 50,
    backgroundColor:'#712177',
    paddingBottom:0,
    paddingTop:0
  },
  tabView: {
    
  },
  tabViewIndicator: {
    backgroundColor: '#712177',
    borderRadius: 0
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 18,
    //flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
    marginBottom: screenHeight/3.8
  },
  item: {
    marginTop: 15,
    padding:'5%',
    borderRadius:10,
  },
  title: {
    fontWeight: 'bold',
    color:'#FFFFFF',
    fontSize:18,
  },
  desc: {
    marginBottom: 10,
    color:'#FFFFFF'
  },
  tabContacts: {
    backgroundColor:'#FFFFFF',
    borderTopLeftRadius:30,
},
tabArticles: {
    backgroundColor:'#FFFFFF',
    borderTopRightRadius:30,
}
});