import React, { useEffect, useState } from "react";
import { Text ,View ,StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PreviousScore({navigation})
{
    const [userData ,setUserData]=useState([]);

    useEffect(()=>
    {
        getData();
    })

    const getData = async()=>
    {
    try
    {
       const scoresData = await AsyncStorage.getItem('userScoreList');
       const scoresDataParsed = JSON.parse(scoresData);
       setUserData(scoresDataParsed);
       
    


    }
        catch(e){
                console.log('The Error is ',e);
        } 
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Previous Scores List</Text>

                <FlatList data={userData} renderItem={({item})=> 
                <View style={styles.scoreview}>
                <Text style={styles.scoretext}>{item.nameData}</Text>
                <Text style={styles.scoretext}>{item.scoreData}</Text>
                </View> }/>
        </View>
    )

    
}

export default PreviousScore

const styles = StyleSheet.create({
        title :
        {
            fontSize : 30,
            textAlign:'center',
            marginTop : 10,
            color : 'steelblue',
        },
        scoretext :
        {
            fontSize : 20,
            color :'slategray',
            margin : 10,

        },
        scoreview :
       {
        flexDirection :'row',
        justifyContent : 'center',
       }

})

