import { Box, Text, Badge, Stack, Divider } from "@chakra-ui/react";
import { Select, Input, Button } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import {useState, useEffect} from "react";

export default function Gastos () {
    const [expenses, setExpenses] = useState([])
    const [products, setProducts]  = useState([])

    useEffect(function(){
        fetch("http://localhost:3000/gastos/1", {
            headers: {"Access-Control-Allow-Origin": "*"}                
        })
        .then(res => res.json())
        .then(res => {
            setExpenses(res)
         })

        fetch("http://localhost:3000/productos", {
            headers: {"Access-Control-Allow-Origin": "*"}                
        })
        .then(res => res.json())
        .then(res => {
            setProducts(res)
         })
    },[])
    
    function handleSubmit(event) {
        event.preventDefault()
        const {date, productList} = event.target
        const fecha = date.value
        const productoId = productList.options.selectedIndex
        const precio = products.find(p => p.id == productoId).precioActual
        const body = {
            fecha: fecha,
            compradorId: 1,
            productoId: productoId,
            precio: precio
        }
        fetch("http://localhost:3000/gasto", {
            headers: {"Access-Control-Allow-Origin": "*"},
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json))
    }

    return (
            <>{expenses.length >0 && products.length >0 ? 
              <Stack mt="8" align="center" spacing="6">
                <Text fontSize="2xl" fontWeight="bold">
                  Últimos Gastos
                </Text>
                {expenses.map(gasto => {
                return (
                    <Box key={gasto.id} ml="3" flex>
                    <Text fontWeight="bold" color="gray">
                        {gasto.producto.nombre}
                        <Badge ml="4" colorScheme="teal">
                        {products.map(function(p){
                            if(p.id === gasto.productoId){
                                return p.categoria.nombre
                            }
                        })}
                        </Badge>
                    </Text>
                    <Text>{gasto.precio}</Text>
                    <Divider mt="2" colorScheme="teal" />
                    </Box>
                )}
            )}
                <Text fontSize="2xl" fontWeight="bold">
                  Nuevo Gasto
                </Text>
                <form onSubmit={handleSubmit}>
                <Stack minWidth="300px">
                    <Stack>
                    <Select name="productList" variant="outline" placeholder="Producto" color="teal">
                        {products.map(producto => {
                            return (
                                <option key={producto.id} value={producto.nombre}>{producto.nombre}</option>
                            )
                        })}
                    </Select>
                    </Stack>
                    <Input name="date" color="teal" type="date" placeholder="phone number" />
                <Button
                  type="submit"
                  leftIcon={<MdShoppingCart />}
                  colorScheme="teal"
                  variant="outline"
                >
                  Registrar
                </Button>
                </Stack>
                </form>
              </Stack>
              : null}
            </>
          );
}