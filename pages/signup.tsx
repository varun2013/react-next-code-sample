import React, { useState, ChangeEvent, MouseEvent, FocusEvent } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    FormErrorMessage,
    useToast,
    Text,
    Box,
    Grid,
    Link as ChakraLink,
    Checkbox
} from "@chakra-ui/react";
import { responseMessage, validateEmail, validateField } from "../lib/app/utils/index";
import Link from "next/link";
import router from "next/router";
import { useMutation } from "@tanstack/react-query";
import { INDEX_PAGE, LOGIN, TERMS_AND_CONDITIONS } from "../lib/app/common/routeConstants";
import { setSignupUserDetails } from "../lib/storage/user";

interface ISignUpState {
    firstName: string;
    firstNameError: string;
    lastName: string;
    lastNameError: string;
    email: string;
    emailError: string;
    companyName: string;
    companyNameError: string;
    companyRegistrationId: string;
    companyRegistrationIdError: string;
    address: string;
    addressError: string;
    signatoryName: string;
    signatoryNameError: string;
}

const Register = () => {
    // declare initial state
    const initialState = {
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        email: "",
        emailError: "",
        companyName: "",
        companyNameError: "",
        companyRegistrationId: "",
        companyRegistrationIdError: "",
        address: "",
        addressError: "",
        signatoryName: "",
        signatoryNameError: ""
    };
    // assign chakra ui toast fn
    const toast = useToast();
    //checkbox state for terms and conditions
    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
    const [state, setState] = useState<ISignUpState>(initialState);

    const {
        firstName,
        firstNameError,
        lastName,
        lastNameError,
        email,
        emailError,
        companyName,
        companyNameError,
        companyRegistrationId,
        companyRegistrationIdError,
        address,
        addressError,
        signatoryName,
        signatoryNameError,
    } = state;

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.replace(/\s\s+/g, ' ');
        setState({ ...state, [name]: trimValue });
    };

    // check form field validations
    const checkValidation = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const trimValue = value.trim();
        if (trimValue.length === 0) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.required`),
            }));
        } else if (name === "email" && !validateEmail(trimValue)) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if ((name === "companyName" || name === "firstName" || name === "lastName" || name === "signatoryName") && !validateField("alphabetics", trimValue)) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if ((name === "companyRegistrationId") && !validateField("Alphanumeric", trimValue)) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        } else if ((name === "address") && !validateField("string", trimValue)) {
            setState((prevState) => ({
                ...prevState,
                [`${name}Error`]: responseMessage(`${name}.invalid`),
            }));
        }
    };
    // reset error messages from form fields
    const resetErrorMessage = (event: FocusEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setState((prevState) => ({ ...prevState, [`${name}Error`]: "" }));
    };
    // check if form is valid or not
    const isFormValid = () => {
        return (
            !firstNameError &&
            !lastNameError &&
            !emailError &&
            !companyNameError &&
            !companyRegistrationIdError &&
            !addressError &&
            !signatoryNameError &&
            [firstName, lastName, email, companyName, companyRegistrationId, address, signatoryName, termsAndConditions].every(
                Boolean
            )
        );
    };
    // function for handle terms and conditions on checked
    const handleTermsOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setTermsAndConditions(checked);
    }

    // function handle on form submit
    const handleOnSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // const userData = { firstName, lastName, email, companyName, companyRegistrationId, address, signatoryName };
        // if (isFormValid()) {
            // mutate({ userData, hasAcceptedTerms: termsAndConditions });
        // }s
    };

    return (
        <Flex flex={1} flexDirection={{ base: "column", md: "row" }}>
            <Flex className="form_left" flex={1}>
                <Box className="inner_left" w="100%" p={{ base: "100px", md: "30px 70px" }} color="white" >
                    <Link href={INDEX_PAGE}><Image alt={"Login Image"} cursor="pointer" objectFit={"cover"} src={"logo.svg"} /></Link>
                    <Text mt={{ base: "20px", md: "50px" }} textShadow="0px 4px 3px rgb(0 0 0 / 15%)" fontSize="28px" fontWeight="700" lineHeight="40px">
                        What is stopping your company from reaching its full potential?{" "}
                        <br />
                        <br />
                        Harness the power of sustainable and cost-effective plant-only
                        solutions with our proprietary,
                        <br />
                        <br />
                        machine-learning platform, Charaka<sup>TM</sup>.
                    </Text>
                </Box>
            </Flex>

            <Flex className="form_right" flex={1} align={"center"} justify={"center"}>
                <Stack className="Form_Outer" spacing={4} w={{ base: "100%", md: "80%" }} background="#fff" p="24px" borderRadius="8px" boxShadow="10px 4px 50px 0px rgb(0 0 0 / 15%)">
                    <Heading color={"rgba(15, 43, 22)"} fontSize={{ base: "35px", md: "45px" }} mb={{ base: "5px", md: "10px" }}>Create an Account</Heading>
                    <Grid
                        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                        gap={4}
                        justifyContent={{ base: "start", md: "space-between" }}
                    >
                        <FormControl id="firstName" isInvalid={!firstNameError ? false : true}>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={handleOnChange}
                                onFocus={resetErrorMessage}
                                onBlur={checkValidation}
                            />
                            {firstNameError && <FormErrorMessage>{firstNameError}</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="lastName" isInvalid={!lastNameError ? false : true}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={handleOnChange}
                                onFocus={resetErrorMessage}
                                onBlur={checkValidation}
                            />
                            {lastNameError && <FormErrorMessage>{lastNameError}</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="email" isInvalid={!emailError ? false : true}>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                onFocus={resetErrorMessage}
                                onBlur={checkValidation}
                            />
                            {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
                        </FormControl>
                        <FormControl
                            id="companyName"
                            isInvalid={!companyNameError ? false : true}
                        >
                            <FormLabel>Company Name</FormLabel>
                            <Input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={companyName}
                                onChange={handleOnChange}
                                onFocus={resetErrorMessage}
                                onBlur={checkValidation}
                            />
                            {companyNameError && (
                                <FormErrorMessage>{companyNameError}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            id="companyRegistrationId"
                            isInvalid={!companyRegistrationIdError ? false : true}
                        >
                            <FormLabel>Company Registration Id</FormLabel>
                            <Input
                                type="text"
                                id="companyRegistrationId"
                                name="companyRegistrationId"
                                value={companyRegistrationId}
                                onChange={handleOnChange}
                                onFocus={resetErrorMessage}
                                onBlur={checkValidation}
                            />
                            {companyRegistrationIdError && (
                                <FormErrorMessage>{companyRegistrationIdError}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            id="password"
                            isInvalid={!signatoryNameError ? false : true}
                        >
                            <FormLabel>Signatory Name</FormLabel>
                            <Input
                                type="text"
                                id="signatoryName"
                                name="signatoryName"
                                value={signatoryName}
                                onChange={handleOnChange}
                                onFocus={resetErrorMessage}
                                onBlur={checkValidation}
                            />
                            {signatoryNameError && (
                                <FormErrorMessage>{signatoryNameError}</FormErrorMessage>
                            )}
                        </FormControl>
                    </Grid>
                    <FormControl id="address" isInvalid={!addressError ? false : true}>
                        <FormLabel>Address</FormLabel>
                        <Input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={handleOnChange}
                            onFocus={resetErrorMessage}
                            onBlur={checkValidation}
                        />
                        {addressError && (
                            <FormErrorMessage>{addressError}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl>
                        <Checkbox name="termsAndConditions" checked={termsAndConditions} onChange={handleTermsOnChange}>I agree to <ChakraLink href={TERMS_AND_CONDITIONS} color="black" target={"_blank"} fontWeight={600}> terms and conditions</ChakraLink></Checkbox>
                    </FormControl>
                    <Button
                        w={"full"}
                        colorScheme={"green"}
                        bg={"rgb(84 122 26)"}
                        _hover={{ bg: "rgb(84 122 26)" }}
                        _active={{ bg: "rgb(84 122 26)" }}
                        variant={"solid"}
                        onClick={handleOnSubmit}
                        isLoading={false}
                        loadingText="Registering"
                        disabled={!isFormValid()}
                    >
                        Register
                    </Button>
                    <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"center"}
                        justify={"center"}
                    >
                        <Text className="for_acnt">
                            Have an account? {" "}
                            <Link href={LOGIN}>Login</Link>
                        </Text>
                    </Stack>
                </Stack>
            </Flex>
        </Flex>
    );
}

export default Register;