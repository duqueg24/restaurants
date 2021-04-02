import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button,Icon,  Input } from "react-native-elements";
import { isEmpty, result } from "lodash";

import { reauthenticate, updateEmail, updateProfile } from "../../utils/actions";
import { validateEmail } from "../../utils/helpers";

export default function ChangeEmailForm({email,setShowModal,toastRef,setRelodUser}){

    const [newEmail, setNewEmail] = useState(email);
    const [password, setPassword] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const onsubmit = async () => {
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      const resultReauthenticate = await reauthenticate(password);

      if (!resultReauthenticate.statusResponse) {
        setLoading(false);
        setErrorPassword(" Contraseña incorrecta.");
        return;
      }
      const resultUpdateEmail = await updateEmail(newEmail);
      setLoading(false);

      if (!resultUpdateEmail.statusResponse) {
        setErrorEmail(
          "No puedes cambiar este correo, ya esta en uso por otro Usuario."
        );
        return;
      }
      setRelodUser(true);
      toastRef.current.show("Se ha actualizado el Email.", 3000);
      setShowModal(false);
    };
  
    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid=true
       
      if( !validateEmail(newEmail)) {         
          setErrorEmail("Debes ingresar debes ingresar un email valido.")
          isValid=false
      }
  
      if(newEmail === email) {
          setErrorEmail("Debes ingresar un email diferentes al actual.")
          isValid=false
      }

      if(isEmpty(password)) {
        setErrorPassword("Debes ingresar tu Contraseña.")
        isValid=false
    }

      return isValid
  }
  
    return (
      <View style={styles.view}>
        <Input
          placeholder="Ingresa el nuevo Correo..."
          containerStyle={styles.nput}
          defaultValue={email}
          keyboardType="email-address"
          onChange={(e) => setNewEmail(e.nativeEvent.text)}
          errorMessage={errorEmail}
          rightIcon={{
            type: "material-community",
            name: "at",
            color: "#c2c2c2",
          }}
        />

        <Input
          placeholder="Ingresa tu Contraseña..."
          containerStyle={styles.nput}
          defaultValue={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          errorMessage={errorPassword}
          password={true}
          secureTextEntry={!showPassword}
          rightIcon={
            <Icon
                type="material-community"
                name={ showPassword ? "eye-off-outline" : "eye-outline" }
                iconStyle={{ color: "#c2c2c2" }}
                onPress={() => setShowPassword(!showPassword)}
            />
        }
        />

        <Button
          title="Cambiar Email "
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={onsubmit}
          loading={loading}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    view: {
      alignItems: "center",
      paddingVertical: 10,
    },
    nput: {
      marginBottom: 10,
    },
    btnContainer: {
      width: "95%",
    },
    btn: {
      backgroundColor: "#442484",
    },
  });
  