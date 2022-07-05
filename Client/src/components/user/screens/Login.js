import { StyleSheet, Text, View, TextInput, Pressable, ToastAndroid, ScrollView, Image } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";


export const Login = (props) => {
    const { navigation } = props;
    const { onLogin } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        if (!email || !password || email.trim().length == 0 || password.trim().length == 0) {
            ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
            return;
        }

        const res = onLogin(email, password);
        if (res == false) {
            ToastAndroid.show('Đăng nhập không thành công', ToastAndroid.CENTER);
            return;
        }
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={require('../../../assets/images/Logo.png')} />
                </View>
                <View style={styles.textLoginContainer}>
                    <Text style={styles.textLogin}>Log in to your Account</Text>
                </View>
                <View style={styles.textWelcomeContainer}>
                    <Text style={styles.textWelcome}>Welcome back, please enter your details.</Text>
                </View>
                <Pressable style={styles.signGoogleButton}>
                    <Image style={styles.image}
                        source={require('../../../assets/images/Google.png')} />
                    <Text style={styles.signGoogleText}>Continue with Google</Text>
                </Pressable>
                <View style={styles.orContainer}>
                    <Image style={styles.image}
                        source={require('../../../assets/images/or.png')} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.textFrom}>Email Address</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.textFrom}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry
                    />
                    {/* <Image style={styles.imageEye}
                        source={require('../../../assets/images/Eye.png')} /> */}
                </View>
                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </View>
                <Pressable style={styles.button}
                    onPress={login}>
                    <Text style={styles.labelText}>Log in</Text>
                </Pressable>
                <View style={styles.registerForm}>
                    <Text style={styles.textAsk}>Don’t have an account?</Text>
                    <Text style={styles.register} onPress={() => navigation.navigate('Register')}> Sign Up</Text>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 57,
        backgroundColor: '#1676F3',
        borderRadius: 4,
        marginTop: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 28,
    },

    imageContainer: {
        alignItems: 'center',
        marginTop: 68
    },

    textLoginContainer: {
        alignItems: 'center',
        marginTop: 14,
    },

    textLogin: {
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 27.5,
        color: 'black',
        letterSpacing: 0.5,
    },

    textWelcomeContainer: {
        alignItems: 'center',
    },

    textWelcome: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.7,
        color: 'black',
        letterSpacing: 0.5,
    },

    signGoogleButton: {
        width: '100%',
        height: 56,
        backgroundColor: 'white',
        borderRadius: 4,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.4,
        marginTop: 28
    },

    signGoogleText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
        color: 'black',
        letterSpacing: 0.5,
        marginLeft: 12
    },

    orContainer: {
        marginTop: 16,
    },

    formContainer: {
        marginTop: 16,
    },

    textFrom: {
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 15,
        color: '#1B2B41',
        letterSpacing: 0.2,
    },

    textInput: {
        width: '100%',
        height: 57,
        backgroundColor: 'white',
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 0.3,
        marginTop: 5,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 22,
        color: '#18273A',
        paddingLeft: 15
    },

    labelText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        letterSpacing: 0.5,
    },

    imageEye: {
        marginTop: 16,
    },

    forgotPasswordContainer: {
        marginTop: 16,
        alignItems: 'flex-end'
    },

    forgotPasswordText: {
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 16,
        color: '#333333',
        letterSpacing: 0.5,
    },

    registerForm: {
        marginTop: 33,
        flexDirection: 'row',
        justifyContent:'center',
    },

    textAsk: {
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 16,
        color: 'black',
        letterSpacing: 0.5,
    },

    register: {
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 16,
        color: '#1676F3',
        letterSpacing: 0.5,
        borderBottomColor: '#1676F3',
        borderBottomWidth: 1,
    },
})