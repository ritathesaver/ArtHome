import React, { FunctionComponent } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

export const LoginScreen: FunctionComponent = () => {

  const navigation = useNavigation()

   const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit:
      values => console.log(values),
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
            />
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={formik.handleSubmit}
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
       
    </View>
  )
}

