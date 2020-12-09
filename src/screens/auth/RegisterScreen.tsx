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
import * as Yup from 'yup'
import {styles} from './styles'
import {useNavigation} from '@react-navigation/native'
import {useFormik} from 'formik'
import 'react-native-get-random-values'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '../../App'
import {createUser, signUp} from '../../redux/actions/authActions'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Please enter valid email').required('Required'),

  password: Yup.string()
    .min(6, 'Too Short!')
    .max(14, 'Too Long!')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .required('Required'),
  confirmedPassword: Yup.string()

    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})

export const RegisterScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmedPassword: '',
      name: '',
    },
    onSubmit: async () => {
      //const token = await axios.post('http://localhost:3000/register', body)
      dispatch(signUp(formik.values.email, formik.values.password))
      dispatch(createUser(formik.values.email, formik.values.name))

      //await AsyncStorage.setItem('token', token.data.accessToken)
    },
    validationSchema: SignupSchema,
  })

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
            <Text style={styles.labelText}>Full name</Text>
            <TextInput
              placeholderTextColor="#cfcfcf"
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
              style={styles.input}
              placeholder="Enter your name"
            />
            {formik.errors.email && formik.touched.email && (
              <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                {formik.errors.email}
              </Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              placeholderTextColor="#cfcfcf"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
            />
            {formik.errors.email && formik.touched.email && (
              <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                {formik.errors.email}
              </Text>
            )}
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
              autoCorrect={false}
              textContentType={'oneTimeCode'}
            />
            {formik.errors.password && formik.touched.password && (
              <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                {formik.errors.password}
              </Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Confirm password</Text>
            <TextInput
              placeholderTextColor="#cfcfcf"
              onChangeText={formik.handleChange('confirmedPassword')}
              onBlur={formik.handleBlur('confirmedPassword')}
              value={formik.values.confirmedPassword}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm password"
              autoCorrect={false}
              textContentType={'oneTimeCode'}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={formik.handleSubmit as any}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.subTitleText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AuthScreen', {
                  screen: 'LoginScreen',
                })
              }>
              <Text style={styles.signText}> Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}
