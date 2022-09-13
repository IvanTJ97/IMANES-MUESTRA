import {Text,FlatList,TouchableOpacity,TextInput,StatusBar,ActivityIndicator} from "react-native";
import {useState,useContext,useEffect} from 'react';
import {AppContext} from '../application/provider';
import {getUsers,updateUser,getUserBySesion} from "../services/users";
import {FinderContainer,FinderLoadingContainer} from "../styles/finder-style";
const Adder=({navigation,route})=>{
    const {user}=useContext(AppContext);
    const [userState,setUserState]=user;
    const [users,setUsers]=useState(null);
    const [search,setSearch]=useState("");
    useEffect(()=>{
        getUserBySesion(userState.sesion).then(res=>{getUsers().then(res2=>setUsers(res2.filter(obj=>obj.id!==res.id)))});
    },[]);
    const add=async(input)=>{
        const data=await getUserBySesion(userState.sesion);
        if(data.friends===undefined)data.friends=[input];
        else{
            const P=data.friends.map(obj=>obj.id);
            if(P.indexOf(input.id)===-1)data.friends.push(input);
            else alert("Ya está añadido");
        };
        updateUser(data.id,{friends:data.friends});
    };
    const filter=()=>{
        if(search==="")return [];
        return users.filter(obj=>obj.name.substr(0,search.length).toLowerCase()===search.toLowerCase())
    };
    if(users===null) return <FinderLoadingContainer>
        <ActivityIndicator size="large" color="#fd9b4b" />
        <Text>LOADING</Text>
    </FinderLoadingContainer>;
    return <FinderContainer>
        <StatusBar animated={true}
            backgroundColor="#fff"
            barStyle="light-content"
            translucent={false} />
        <TextInput onChangeText={search=>setSearch(search)} placeholder="Username"/>
        <FlatList
            data={filter()}
            renderItem={({item})=><Text>{item.name}
                <TouchableOpacity onPress={()=>{add({id:item.id,name:item.name})}}>
                    <Text>+</Text>
                </TouchableOpacity>
            </Text>}
            keyExtractor={item =>item.id}
        />
    </FinderContainer>
};
export default Adder;