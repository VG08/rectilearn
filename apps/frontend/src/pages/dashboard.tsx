import { Heading, useColorMode, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Cards from "../components/Cards";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";

const Dashboard: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Sidebar />
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Heading as="h1" textAlign={"center"}>
        Welcome to the dashboard!
      </Heading>
      <Cards>
        <Card title={"study set title"}></Card>
      </Cards>
    </>
  );
}

export default Dashboard;