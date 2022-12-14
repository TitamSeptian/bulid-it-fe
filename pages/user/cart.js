import {
    VStack,
    HStack,
    Heading,
    Badge,
    Image,
    Box,
    Text,
    Button,
    IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CartItem from "../../components/user/CartItem";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
export default function Pesanan() {
    const token = Cookies.get("access_token");
    const [data, setData] = useState([]);
    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState([]);
    useEffect(() => {
        const res = axios
            .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setData(res.data.data);
                setCarts(res.data.data.carts);
                setProducts(res.data.data.carts[0].products);
                setStore(res.data.data.carts[0].store);
            });

        console.log(data);
        console.log(carts);
        console.log(products);
        console.log(store);
    }, []);
    // setCarts(data?.carts);
    // console.log(carts);
    return (
        <div>
            <VStack
                key={data.id}
                bg={"white"}
                borderRadius={"lg"}
                py={"4"}
                mt={2}
                px={"4"}
                alignItems={"start"}
                rowGap={"6"}
                columnGap={"10"}
            >
                {products.map((cx) => (
                    <div key={cx.id}>
                        <Heading size={"xs"}>{store.name}</Heading>
                        <CartItem
                            key={cx.id}
                            title={cx.brand}
                            img={cx.images[0].image_url}
                            price={cx.price}
                            qty={1}
                        />
                    </div>
                ))}

                <HStack alignSelf={"end"}>
                    <IconButton
                        variant={"outline"}
                        colorScheme="red"
                        size={"sm"}
                        icon={<FaTrash />}
                    />
                    <Link href={"/user/checkout/" + data.id}>
                        <Button size={"sm"} colorScheme="mywood">
                            <Text fontWeight={"bold"}>Chekcout</Text>
                        </Button>
                    </Link>
                </HStack>
            </VStack>
        </div>
    );
}
