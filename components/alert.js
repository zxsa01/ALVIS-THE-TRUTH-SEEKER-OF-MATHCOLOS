import React, { useState } from "react";
import { Modal, Text, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

const Alert = (props) => {

    const [Show, setShow] = useState(true);

    return (
        <View>
            <Modal transparent = { true } visible = { Show }>
                <View style = {{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <View style = {{ backgroundColor: "#000000AA", padding: 10, width: Dimensions.get("screen").width - 200, height: 325,  justifyContent: "center", alignItems: "center", borderRadius: 50}}>
                        <TouchableOpacity style = { styles.button } onPress = { () => { setShow(!Show) } }>
                            <Text style = { styles.text }>Exit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create ({
    button: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4CBC55",
      width: 70,
      height: 70,
      borderRadius: 100,
      position: "absolute",
      right: 5,
      top: 5
    },
    text: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#000000",
    }
  })

export default Alert;