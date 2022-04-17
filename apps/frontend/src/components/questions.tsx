import {
    Box,
    Text,
    Button,
    Input, 
    Modal, 
    ModalOverlay, 
    ModalBody,
    ModalHeader,
    ModalContent,  
    InputGroup,
    InputRightElement,
    Center,
    HStack,
    chakra
} from "@chakra-ui/react"

import { CheckIcon, Icon } from "@chakra-ui/icons"

import { RiEditLine } from "react-icons/ri"

import { useState } from "react"
import { Field, Formik } from "formik";

const InputGroupExt = chakra(InputGroup, {
    baseStyle: {
        margin: "auto",
        width: "80%",
        size: "lg",
        fontSize: "25",
        textAlign: "center",
        marginBottom: 1
    }
})

function AskQuestionModal({ question, answer, isOpen, questionOpen }: {question: string, answer: string, isOpen: boolean, questionOpen: any}) {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    function submit() {
        if (value === answer) {
            questionOpen(false);
        } else {
            questionOpen(false);
            setOpen(true);
        }
    }

    return (
        <>
            {/* <Button onClick={onOpen} position="fixed" bottom={0} left={0} bg={"black"}>Open Modal</Button> */}

            <Modal size={"xl"} closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen}  onClose={() => void(0)}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontSize={30}>{question}</ModalHeader>

                <ModalBody>
                    <Input 
                        placeholder='answer' 
                        size='lg' 
                        width={"80%"} 
                        fontSize="25"
                        textAlign="center"
                        id="ans"
                        value={value}
                        onKeyPress={(e) => e.key === "Enter" && submit()}
                        onChange={(e) => setValue(e.target.value)} 
                        autoComplete={"off"}
                    />
                    <Button onClick={submit} margin={2} colorScheme='blue' width="80%">
                        Submit
                    </Button>
                </ModalBody>

                </ModalContent>
            </Modal>
            <RewriteModal question={question} answer={answer} response={value} open={open} setOpen={setOpen} />
        </>
    )
}

function RewriteModal({ question, answer, response, open, setOpen }: { question: string, answer: string, response:string, open: boolean, setOpen: any }) {
    function isCorrect(inp: string) {
        return inp === answer;
    }

    function checkCorrect(values: {
        i1: string,
        i2: string,
        i3: string
    }, e: any) {
        if (Object.entries(values).reduce((prev, cur) => {
            if (!prev) return false;
            if (cur[0] === e.target.name) {
                return e.target.value === answer;
            } else if (cur[1] === answer) {
                return true;
            } else {
                return false;
            }
        }, true)) {
            setOpen(false);
        }
    }

    return (
      <>
        <Modal size={"xl"} closeOnEsc={false} closeOnOverlayClick={false} isOpen={open} onClose={() => void(0)} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={30}>{question}</ModalHeader>
            <ModalBody>
                <Box margin={5}>
                    <Center>
                        <HStack spacing={1}>
                            <Text>Correct answer: </Text>
                            <Text color="green.500">{answer}</Text>
                        </HStack>
                    </Center>
                    <Center>
                        <HStack spacing={1}>
                            <Text>You wrote: </Text>
                            <Text color="red.500">{response}</Text>
                        </HStack>
                    </Center>
                </Box>
                <Formik
                    initialValues={{
                        "i1": "",
                        "i2": "",
                        "i3": ""
                    }}
                    onSubmit={() => void(0)}
                >
                    {({ handleChange, values }) => (
                        <>
                            {
                                [["i1", values.i1], ["i2", values.i2], ["i3", values.i3]].map((i, ind) => (
                                    <InputGroupExt key={ind}>
                                        <Field as={Input} onChange={(e: any) => [handleChange(e), checkCorrect(values, e)]} value={i[1]} name={i[0]} placeholder='rewrite' fontSize="25" textAlign={"center"} autoComplete={"off"} />
                                        <InputRightElement>{<Icon as={isCorrect(i[1]) ? CheckIcon : RiEditLine} color={isCorrect(i[1]) ? "green.500" : "yellow.500" } />}</InputRightElement>
                                    </InputGroupExt>
                                ))
                            }
                        </>
                    )}
                </Formik>
                <Text margin={2}>rewrite three times to continue</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export default function Questions({ question, answer, open, isOpen }: { question: string, answer: string, open: boolean, isOpen: any }) {
    return (
        <AskQuestionModal question={question} answer={answer} isOpen={open} questionOpen={isOpen} />
    )
}