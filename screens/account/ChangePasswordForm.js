
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button,Icon,  Input } from "react-native-elements";
import { isEmpty, result, size } from "lodash";

import { reauthenticate,  updatePassword } from "../../utils/actions";

export default function ChangePasswordForm({setShowModal,toastRef}){

    const [newPassword, setNewPassword] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [errorNewPassword, setErrorNewPassword] = useState(null);
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const onsubmit = async () => {
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      const resultReauthenticate = await reauthenticate(currentPassword);

      if (!resultReauthenticate.statusResponse) {
        setLoading(false);
        setErrorCurrentPassword(" Contraseña incorrecta.");
        return;
      }
      const resultUpdatePassword = await updatePassword(newPassword);
      setLoading(false);

      if (!resultUpdatePassword.statusResponse) {
        setErrorNewPassword(
          "Hubo un problema cambiando la contraseña, Por favor intente mas tarde."
        );
        return;
      }
     
      toastRef.current.show("Se ha actualizado la Contraseña.", 3000);
      setShowModal(false);
    };
  
    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid=true
       

        if(isEmpty(currentPassword)) {
            setErrorCurrentPassword("Debes ingresar tu contraseña actual.")
            isValid = false
        }

        if(size(newPassword) < 6) {
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(size(confirmPassword) < 6) {
            setErrorConfirmPassword("Debes ingresar una nueva confirmación de tu contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(newPassword !== confirmPassword) {
            setErrorNewPassword("La nueva contraseña y la confirmación no son iguales.")
            setErrorConfirmPassword("La nueva contraseña y la confirmación no son iguales.")
            isValid = false
        }

        if(newPassword === currentPassword) {
            setErrorCurrentPassword("Debes ingresar una contraseña diferentes al actual.")
            setErrorNewPassword("Debes ingresar una contraseña diferentes al actual.")
            setErrorConfirmPassword("Debes ingresar una contraseña diferentes al actual.")
            isValid = false
        }



      return isValid
  }
  
    return (
      <View style={styles.view}>

        <Input
          placeholder="Ingresa tu Contraseña actual..."
          containerStyle={styles.nput}
          defaultValue={currentPassword}
          onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
          errorMessage={errorCurrentPassword}
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

<Input
          placeholder="Ingresa tu Nueva Contraseña..."
          containerStyle={styles.nput}
          defaultValue={newPassword}
          onChange={(e) => setNewPassword(e.nativeEvent.text)}
          errorMessage={errorNewPassword}
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

<Input
          placeholder="Ingresa tu confirmacion de nueva Contraseña..."
          containerStyle={styles.nput}
          defaultValue={confirmPassword}
          onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
          errorMessage={errorConfirmPassword}
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
          title="Cambiar Contraseña "
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