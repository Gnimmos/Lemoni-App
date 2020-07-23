/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local 
 */

import React ,{Component} from 'react';
import {
  StyleSheet,
  Image, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LivePlayer} from "react-native-live-stream";
import soundImg from './assets/Lemoni-logo-for-app.gif';
import muteImg from './assets/Lemoni-logo-for-app-steady.png';

class App extends Component {
constructor(props){
  super(props);


  this.state = {
      pause:true,
      play:false,
      showSoundImg: false,
      color1: '#000000',
      color2: '#000000'

  };

  //binding the functions to the class
  this.pausedit = this.pausedit.bind(this);
  this.change1 = this.change1.bind(this);
  this.change2 = this.change2.bind(this); 
  this.renderImage = this.renderImage.bind(this);
}
  //toogle between gif if playing and image if not
  renderImage() {
   this.setState({ showSoundImg: this.state.showSoundImg ? false : true});
  }
  pausedit(){
    // change the components state props
    if (this.state.pause) {
      this.setState({ 
        pause: false, play: true 
      });
    } else {
      this.setState({ 
        pause: true, play: false 
      });
    }
  }
  //changing backrounds
  change1 (){
    var hours = new Date().getHours(); //Current Hours
    var hour = hours.toString();
    //Setting colors dipenting on time
    if (0 <= hour && hour < 6)
    { 
      this.setState({ 
      color2: '#0e2539'
    });
    }
    else if (6 <= hour && hour < 12)
    {
      this.setState({ 
        color2: '#5eb546'

      });
       
    }
    else if (12 <= hour && hour < 18)
    {
      this.setState({ 
        color2: '#d47097'
      });
    }
    else 
    {
      this.setState({ 
        color2: '#ec7323'
      });
    }
  }
  change2 (){
    var hours = new Date().getHours(); //Current Hours
    var hour = hours.toString();
    //Setting colors dipenting on time
    if (0 <= hour && hour < 6)
    { 
      this.setState({ 
        color1: '#7f4098'
      });
    }
    else if (6 <= hour && hour < 12)
    {
      this.setState({ 
        
        color1: '#fde146'
      });
    }
    else if (12 <= hour && hour < 18)
    {
      this.setState({ 
        color1: '#76cdd9'
      });
    }
    else 
    {
      this.setState({ 
        color1: '#be1e2d'
      });
    }
  }
  //refresing the clock
  componentDidMount() {
    this.timerID = setInterval(
      () => this.change1(),
      1000
    );
    this.timerID = setInterval(
      () => this.change2(),
      1000
    );
  }

  render() {
    return( 
      <SafeAreaView style = {styles.container}>
        <LinearGradient 
        start = {{x: 0, y: 0}} 
        end = {{x: 1, y: 0}} 
        colors = {[this.state.color1, this.state.color2]} 
        style = {styles.linearGradient}>
        <TouchableOpacity 
          style = {styles.logo} 
          activeOpacity = {0.5} 
          onPress={() => {this.pausedit();  this.renderImage();}}>
         <Image style={styles.imageTickStyle} source={this.state.showSoundImg ? soundImg : muteImg} />
        </TouchableOpacity>
        <LivePlayer 
          source={{uri:"https://stream.radiojar.com/mw1xsf0dpnruv"}}
          ref = {(ref) => {
          this.player = ref
          }}
          paused={this.state.pause}
          style={styles.video}       
        />
        </LinearGradient>          
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container  : {
  flex :1 ,
  },
  logo: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : '50%',

  },
  linearGradient : {
    flex:1,
  },
  background:{
    overflow: 'hidden',
    backgroundColor:'transparent',
    width: 200,
    height: 200 ,
    flex: 0,
  }
  
});


export default App;
