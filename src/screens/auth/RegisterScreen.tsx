import React, { FunctionComponent, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';


const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required('Required'),
  
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(14, 'Too Long!')
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .required('Required'),
  confirmedPassword: Yup.string()
    
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export const RegisterScreen: FunctionComponent = () => {

  const [token, setToken] = useState('')
  
  const navigation = useNavigation()

  const storeData = async (token: string) => {
    setToken('rrrr')
  try {
    await AsyncStorage.setItem('@storage_Key', token)
  } catch (e) {
    console.log(e)
  }
}

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
    onSubmit:
      () => { storeData(token) },
    validationSchema: SignupSchema
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logos/logo.png')} />
      
          <View style={styles.formContainer}>
            <Text style={styles.labelText}>Username</Text>
            <TextInput
            
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
    
            />
              {(formik.errors.email && formik.touched.email) &&
              <Text style={{ fontSize: 10, color: 'red' }}>{formik.errors.email}</Text>
            }
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password"
        
              />
              {(formik.errors.password && formik.touched.password) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{formik.errors.password}</Text>
              }
            <Text style={styles.labelText}>Confirm password</Text>
            <TextInput
              onChangeText={formik.handleChange('confirmedPassword')}
              onBlur={formik.handleBlur('confirmedPassword')}
              value={formik.values.confirmedPassword}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm password"
 
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={formik.handleSubmit}
            >
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.subTitleText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AuthScreen', {
                screen: 'LoginScreen'
              })}>
                <Text> Sign in</Text>
              </TouchableOpacity>
            </View>

          </View>
        
    </View>
  )
}
