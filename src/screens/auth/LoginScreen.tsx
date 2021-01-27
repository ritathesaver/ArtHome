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
import {useDispatch} from 'react-redux'
import {AppDispatch} from '../../App'
import {signIn} from '../../redux/actions/authActions'
import * as Yup from 'yup'

const SigninSchema = Yup.object().shape({
  email: Yup.string().required('Required'),

  password: Yup.string().required('Required'),
})

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
      console.log(formik.values.email, formik.values.password)
      dispatch(signIn(formik.values.email, formik.values.password))
    },
    validationSchema: SigninSchema,
  })

  return (
    <ImageBackground
      blurRadius={25}
      source={{
        uri:
          'https://images.pexels.com/photos/1711323/pexels-photo-1711323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      }}
      style={{
        flex: 1,
        width: '100%',
      }}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            color: 'white',
            paddingVertical: 30,
            fontStyle: 'italic',
          }}>
          ART<Text style={{fontWeight: 'bold', fontStyle: 'normal'}}>HOME</Text>
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="#cfcfcf"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              style={[styles.input, !formik.errors.email && {marginBottom: 14}]}
              placeholder="Enter email"
            />
            {formik.errors.email && formik.touched.email ? (
              <Text
                style={{
                  paddingTop: 2,
                  fontSize: 12,
                  color: 'red',
                }}>
                {formik.errors.email}
              </Text>
            ) : null}
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              placeholderTextColor="#cfcfcf"
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              style={[
                styles.input,
                !formik.errors.password && {marginBottom: 14},
              ]}
              secureTextEntry={true}
              placeholder="Enter password"
            />
            {formik.errors.password && formik.touched.password ? (
              <Text
                style={{
                  paddingTop: 2,
                  fontSize: 12,
                  color: 'red',
                }}>
                {formik.errors.password}
              </Text>
            ) : null}
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
