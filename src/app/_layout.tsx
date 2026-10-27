import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Cart from "../components/Market/Cart";

//#region  interface
interface Product {
  id: number;
  name: string;
  price: number;
  icon: string;
}

interface Category {
  id: number;
  categoryName: string;
  icon: string;
  products: Product[];
}
//#endregion

//#region  default data
const categoriesItem: Category[] = [
  {
    id: 1,
    categoryName: "Fruits",
    icon: "nutrition-outline",
    products: [
      {
        id: 1,
        name: "Apple",
        price: 2.50,
        icon: "food-apple"
      },
      {
        id: 2,
        name: "Banana",
        price: 3.99,
        icon: "fruit-watermelon"
      },
      {
        id: 3,
        name: "Pineapple",
        price: 5.55,
        icon: "fruit-pineapple"
      }
    ]
  },
  {
    id: 2,
    categoryName: "Meatproducts",
    icon: "restaurant-outline",
    products: [
      {
        id: 1,
        name: "Beef",
        price: 19.99,
        icon: "food-steak"
      },
      {
        id: 2,
        name: "Chicken meat",
        price: 9,
        icon: "food-drumstick"
      },
      {
        id: 3,
        name: "Sturgeon",
        price: 25.89,
        icon: "fish"
      }
    ]
  },
  {
    id: 3,
    categoryName: "Sweets",
    icon: "ice-cream-outline",
    products: [
      {
        id: 1,
        name: "Napoleon cake",
        price: 48.20,
        icon: "cake-variant"
      },
      {
        id: 2,
        name: "Khorasan",
        price: 1,
        icon: "bread-slice"
      },
      {
        id: 3,
        name: "Strawberry cupcake",
        price: 0.50,
        icon: "cupcake"
      }
    ]
  },
  {
    id: 4,
    categoryName: "Drinks",
    icon: "water-outline",
    products: [
      {
        id: 1,
        name: "Coca-Cola",
        price: 2.50,
        icon: "bottle-soda"
      },
      {
        id: 2,
        name: "Fanta",
        price: 2.45,
        icon: "bottle-soda"
      },
      {
        id: 3,
        name: "Sprite",
        price: 1.90,
        icon: "bottle-soda"
      }
    ]
  }
]
//#endregion


//#region  components
export default function TabLayout() {

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [porductName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');

  const [cart, setCart] = useState<Product[]>([]);


  const handleAddProduct = () => {
    if (!selectedCategory || !porductName.trim() || !productPrice.trim()) {
      Alert.alert("Katekoriya secilmeli, ad ve qiymet daxil edilmelidir")
      return;
    }

    const currentProduct = selectedCategory.products;
    const nextId = currentProduct.length > 0 ? Math.max(...currentProduct.map(p => p.id)) + 1 : 1;

    const newProduct: Product = {
      id: nextId,
      name: porductName.trim(),
      price: Number(productPrice),
      icon: ""
    }

    const updatedCategory: Category = {
      ...selectedCategory,
      products: [
        ...selectedCategory.products,
        newProduct,
      ],
    };
    setSelectedCategory(updatedCategory);
    setProductName("");
    setProductPrice("");
  }

  const handleDeleteProduct = (id: number) => {
    if (!selectedCategory) {
      Alert.alert("Silmek ucun catgoriyadan mehsul secin");
      return;
    }
    const updatedCategory: Category = {
      ...selectedCategory,
      products: selectedCategory.products.filter(
        (product) => product.id !== id
      ),
    };

    setSelectedCategory(updatedCategory);
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price, 0
  );

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);

    Alert.alert(
      "Cart", `${product.name} add to cart`
    );
  };

  return (
    <View style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
      <Cart
        productCount={cart.length}
        totalPrice={totalPrice}
      />

      <FlatList
        data={categoriesItem}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(category) => category.id.toString()}
        renderItem={({ item: category }) => (
          <View
            style={[
              styles.categoryCard,
              selectedCategory?.id === category.id &&
              styles.selectedCategory,
            ]}
          >
            <Ionicons
              size={34}
              color="red"
              name={category.icon as any}
              onPress={() =>
                setSelectedCategory(category)
              }
            />

            <Text
              style={styles.categoryName}
              onPress={() =>
                setSelectedCategory(category)
              }
            >
              {category.categoryName}
            </Text>
          </View>
        )}
      />

      <FlatList
        data={selectedCategory?.products ?? []}
        contentContainerStyle={styles.productList}
        keyExtractor={(product) => product.id.toString()}

        renderItem={({ item: product }) => (
          <View style={styles.productCard}>
            <MaterialCommunityIcons
              name={product.icon as any}
              size={35}
              color="green"
            />

            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {product.name}
              </Text>

              <Text style={styles.productPrice}>
                {product.price} AZN
              </Text>
            </View>

            <Text onPress={() => handleDeleteProduct(product.id)}>
              <MaterialCommunityIcons size={24} color="red" name="delete" />
            </Text>

            <TouchableOpacity
              onPress={() => handleAddToCart(product)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add to cart</Text>
            </TouchableOpacity>

          </View>
        )}
      />
      <View style={styles.inputContainer}>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Product Name
          </Text>

          <TextInput
            value={porductName}
            placeholder="product name"
            onChangeText={setProductName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Product Price
          </Text>

          <TextInput
            value={productPrice}
            placeholder="product price"
            onChangeText={setProductPrice}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddProduct}
          />
        </View>
      </View>

    </View>

  );
}
//#endregion

//#region StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f4f6f8",
  },

  categoryList: {
    paddingTop: 16,
    paddingBottom: 12,
  },

  categoryCard: {
    width: "100%",
    minHeight: 75,
    marginBottom: 12,
    paddingHorizontal: 18,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  selectedCategory: {
    backgroundColor: "#d9f7e5",
    borderWidth: 2,
    borderColor: "#20a05a",
  },

  productList: {
    paddingTop: 20,
    paddingBottom: 30,
  },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 3,
  },

  productInfo: {
    flex: 1,
    width: "100%",
    marginTop: 8,
  },

  productName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222222",
  },

  productPrice: {
    marginTop: 5,
    fontSize: 15,
    color: "green",
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 12,
  },

  inputLabel: {
    marginBottom: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },

  input: {
    height: 45,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },

  addButton: {
    height: 45,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20a05a",
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartButton: {
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: "#20a05a",
  },
  cartButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
//#endregion