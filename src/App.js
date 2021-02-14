import './App.css';
import { Flex, Button } from "@chakra-ui/react";
import { Route, Link, Switch } from "wouter";
import Perfil from "./pages/Perfil";
import Gastos from "./pages/Gastos";
import Oportunidades from "./pages/Oportunidades"

function App() {

  return (
    <>
      <Flex justify="center" mt="4">
        <Link to="/">
          <Button colorScheme="teal" mr="4">
            Perfil
          </Button>
        </Link>
        <Link to="/gastos">
          <Button colorScheme="teal" mr="4">
            Gastos
          </Button>
        </Link>
        <Link to="/oportunidades">
          <Button colorScheme="teal">Oportunidades</Button>
        </Link>
      </Flex>
      <Switch>
        <Route path="/" component={Perfil} />
        <Route path="/gastos" component={Gastos} />
        <Route path="/oportunidades" component={Oportunidades} />
      </Switch>
    </>
  );
}

export default App;
