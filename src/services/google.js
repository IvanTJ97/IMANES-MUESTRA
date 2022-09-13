import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import {useEffect} from 'react';
import { Button } from "react-native";
//web:984603348869-vr719vmv708q2391gup19o3a3j4uk761.apps.googleusercontent.com
//ios:984603348869-823ktvnou2g5iee9flvpig9t5iu835ij.apps.googleusercontent.com
//android:
export default function App() {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: '984603348869-vr719vmv708q2391gup19o3a3j4uk761.apps.googleusercontent.com',
        },
    );
    useEffect(() => {
        if (response?.type === 'success') {
            const {id_token}=response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth,credential);
        }
    }, [response]);

    return <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
        />
};