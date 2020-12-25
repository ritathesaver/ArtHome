/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {styles} from './styles'
import {useNavigation} from '@react-navigation/native'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {signIn} from '../../redux/actions/authActions'
import {RootState} from '../../redux/rootReducer'

export const LoginScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async () => {
      console.log('signIn')
      dispatch(signIn(formik.values.email, formik.values.password))
    },
  })

  const error = useSelector((state: RootState) => state.auth.error)

  return (
    <ImageBackground
      blurRadius={15}
      source={{
        uri:
          'https://images.pexels.com/photos/2776892/pexels-photo-2776892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      }}
      style={{
        flex: 1,
        width: '100%',
      }}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Username</Text>
            <TextInput
              placeholderTextColor="#cfcfcf"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              style={styles.input}
              placeholder="Enter email"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              placeholderTextColor="#cfcfcf"
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password"
            />
            {error && (
              <Text
                style={{
                  fontSize: 15,
                  color: 'red',
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                Incorrect email or password
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={formik.handleSubmit as any}>
            <Text style={styles.submitButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.subTitleText}>New user?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.signText}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}
