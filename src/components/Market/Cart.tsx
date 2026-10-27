import { StyleSheet, Text, View } from "react-native";

interface CartProps {
    productCount: number;
    totalPrice: number;
}

export default function Cart({ productCount, totalPrice }: CartProps) {


    return (
        <View style={styles.container}>
            <Text style={styles.lable}>
                Cart: {productCount} product  {totalPrice} AZN
            </Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    lable: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "green",
        borderRadius: 10,
        borderColor: "red",
        backgroundColor: "#c8b4e6"
    }
})