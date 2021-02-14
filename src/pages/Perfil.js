import { useState, useEffect, useContext } from "react"
import {
    Button, Text, Stack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    CircularProgress, CircularProgressLabel
  } from "@chakra-ui/react";
import { MdUpdate } from "react-icons/md";
  
export default function Perfil () {
    const [userData, setUserData] = useState({})
    const [expenses, setExpenses] = useState([])

    useEffect(function(){
        fetch("http://localhost:3000/comprador/1", {
            headers: {"Access-Control-Allow-Origin": "*"}                
        })
        .then(res => res.json())
        .then(res => {
            setUserData(res)
         })

         fetch("http://localhost:3000/gastos/1", {
            headers: {"Access-Control-Allow-Origin": "*"}                
        })
        .then(res => res.json())
        .then(res => {
            setExpenses(res)
         })
    },[])

    function handleSubmit(event){
    event.preventDefault()
    const { limite } = event.target
    const nuevoLimite = limite.value
    const body = {...userData, limite: nuevoLimite}
    fetch("http://localhost:3000/comprador/1", {
        headers: {"Access-Control-Allow-Origin": "*"},
        headers: {"Content-type": "application/json; charset=UTF-8"},
        method: "PUT",
        body: JSON.stringify(body)
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
}

    return (
        <>{ userData.hasOwnProperty("nombre") && expenses.length >0 ?
      <Stack width="100%" align="center" mt="8" spacing="8">
        <Text fontSize="xl" color="gray">
        {`Hey, ${userData.nombre}! Apegate a tu objetivo`}
        </Text>
        <CircularProgress size="150px" value={(expenses.map(gasto => gasto.precio).reduce(function(a, b){ return a + b; })/userData.limite)*100} color="teal.300">
          <CircularProgressLabel fontSize="sm">{expenses.map(gasto => gasto.precio).reduce(function(a, b){ return a + b;})}/{userData.limite}</CircularProgressLabel>
        </CircularProgress>
        <form onSubmit={handleSubmit}>
        <Stack>
        <NumberInput name="limite" step={100} min={0}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>    
        <Button type="submit" leftIcon={<MdUpdate />} colorScheme="teal" variant="outline">
          Actualizar
        </Button>
        </Stack>
        </form>
      </Stack>
      : null}
    </>
    )
}