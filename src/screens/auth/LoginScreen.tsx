import React, { FunctionComponent } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';

export const LoginScreen: FunctionComponent = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')} />
      <Formik
        initialValues={{ email: '', password: ''}}
        onSubmit={values => console.log(values)}>

        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <Text style={styles.labelText}>Username</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
              placeholder="Enter email"
            />
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.subTitleText}>New user?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text> Sign up</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      </Formik>
    </View>
  )
}

