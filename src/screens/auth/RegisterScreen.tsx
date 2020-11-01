import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';


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

export const RegisterScreen: FunctionComponent= () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')} />
      <Formik
        initialValues={{ email: '', password: '', confirmedPassword: ' ' }}
        validationSchema={SignupSchema}
        onSubmit={values => console.log(values)}>

        {({ handleChange, handleBlur, handleSubmit, values, errors,
          touched }) => (
          <View style={styles.formContainer}>
            <Text style={styles.labelText}>Username</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
            />
              {(errors.email && touched.email) &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password"
              />
              {(errors.password && touched.password) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }
            <Text style={styles.labelText}>Confirm password</Text>
            <TextInput
              onChangeText={handleChange('confirmedPassword')}
              onBlur={handleBlur('confirmedPassword')}
              value={values.password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm password"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
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
        )}
      </Formik>
    </View>
  )
}
