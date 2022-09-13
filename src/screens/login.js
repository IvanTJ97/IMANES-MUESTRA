import {View,Text,TextInput,TouchableOpacity,StyleSheet,StatusBar} from "react-native";
import {useState,useContext,useEffect} from 'react';
import {AppContext} from '../application/provider';
import {signIn} from '../services/users';
import Boton from '../services/google';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login=({navigation,route})=>{
    const {user}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [name, setName] = useState(null);
    const [pass, setPass] = useState(null);
    useEffect(()=>{
        getCredentials();
    },[]);
    const getCredentials=async()=>{
        try{
            const sesion = await AsyncStorage.getItem('@storage_Key');
            if(sesion!==null)setUserState({sesion});
        }catch(e){
            return e;
        };
    };
    const login=async()=>{
        const sesion=await signIn(name,pass);
        if(typeof(sesion)==="object")alert("Error");
        else {
            await AsyncStorage.setItem('@storage_Key', sesion);
            setUserState({sesion});
        };
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    return <View style={styles.container}>
            <StatusBar animated={true}
                backgroundColor="#fff"
                barStyle="light-content" 
                translucent={false}/>
            <TextInput onChangeText={name=>setName(name)} placeholder="Username"/>
            <TextInput onChangeText={pass => setPass(pass)} placeholder="Password" secureTextEntry={true} />
            <TouchableOpacity onPress={login}><Text>Enter</Text></TouchableOpacity>
            <Boton/>
    </View>;
};
export default Login;