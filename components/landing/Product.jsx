import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import ProductImage from "../../public/product.png";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Product() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const res = axios
            .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/product`)
            .then((res) => {
                const response = res.data.data;
                response.slice(Math.max(response.length - 5, 0));
                setProducts(response);
            });

        console.log(products);
    }, []);
    return (
        <div>
            <Container maxW={"container.xl"} mt={10}>
                <Heading my={10}>Cari Apa yang kamu butuhkan !</Heading>
                <Grid
                    templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    gap={"4"}
                >
                    {products.map((product) => (
                        <GridItem key={product.id}>
                            <ProductItem
                                title={product.name}
                                image={product.image}
                                price={product.price}
                                storeName={product.store.name}
                                info={product.description}
                            >
                                {}
                            </ProductItem>
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
