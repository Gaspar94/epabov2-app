import { Box, Text, Badge, Stack, Divider } from "@chakra-ui/react";
import {useState, useEffect} from "react";

export default function Oportunidades () {
    const [oportunities, setOportunities] = useState([])

    useEffect(function(){
        fetch("http://localhost:3000/productos/oportunidades", {
            headers: {"Access-Control-Allow-Origin": "*"}                
        })
        .then(res => res.json())
        .then(res => {
            setOportunities(res)
         })
        })

    return (
            <>{oportunities.length > 0 ?
              <Stack mt="8" align="center" spacing="6">
                <Text fontSize="2xl" fontWeight="bold">
                  Oportunidades
                </Text>
                {oportunities.map(oportunidad => {
                return (
                    <Box key={oportunidad.id} ml="3" flex>
                    <Text fontWeight="bold" color="gray">
                        {oportunidad.nombre}
                        <Badge ml="4" colorScheme="teal">
                        {oportunidad.categoria.nombre}
                        </Badge>
                    </Text>
                    <Text>{oportunidad.precioActual}</Text>
                    <Divider mt="2" colorScheme="teal" />
                    </Box>
                )}
            )}
              </Stack>
              : null }
            </>
          );
}