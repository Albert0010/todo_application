// import {StatusBar} from 'expo-status-bar';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva'

// import {StyleSheet, Text, SafeAreaView, Button, Alert, View} from 'react-native';

export default function App() {
  // const handlePress = () => console.log('pressed')
  // console.log(useWindowDimensions())
  // console.log(useDeviceOrientation());

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
          <WelcomeScreen />
    </ApplicationProvider>
      // console.log(require('./assets/icon.png'))
      //     <SafeAreaView style={styles.container}>
      //         <Text numberOfLines={1} onPress={handlePress}> {t('Doors')}</Text>
      //         <TouchableNativeFeedback onPress={()=>console.log('tapped')}>
      //            <Image  blurRadius={10} source={{
      //           width:200,
      //        height:300,
      //         uri:"https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg%22*/}*/%7D"
      //          }}/>
      //         <View style={{width:200,height:70,backgroundColor:'black'}}></View>
      //         </TouchableNativeFeedback>
      //         <Button title="Change" onPress={()=>i18n.changeLanguage('hy')}/>
      //         <Button title='alert' onPress={() => Alert.alert('My Title',"Message",[{
      //             text:"Yes",
      //             onPress:()=>{console.log(15)}
      //         },{text:"No"}])} color="orange"/>
      //         <Button title={'prompt'} onPress={() => Alert.prompt('Yes',"No",(val)=>console.log(val))} color="orange"/>
      //         <StatusBar style="auto"/>
      //     </SafeAreaView>
  );
}

