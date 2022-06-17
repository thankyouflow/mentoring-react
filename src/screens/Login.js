import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoon,
} from "@fortawesome/free-regular-svg-icons";
import React from 'react';
import { useForm } from "react-hook-form";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { logUserIn } from "../apollo";


const MainContainer = styled.div`
  display: flex;
  height: 100vh; //vh 요소는 높이값의 100분의 1의 단위
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  background-color: #000;
  width: 100%;
  border-radius: 10px;

  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid white;
  margin-top: 5px;
  box-sizing: border-box;
  color: black;

  &::placeholder {
    font-size: 12px;
  }

  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: #9c9ea0;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;

  &:hover {
    opacity: 0.7;
  }
`;

const FormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange",
    });
    const onCompleted = (data) => {
        const {
            login: { ok, error, token },
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        if (token) {
            logUserIn(token);
        }
    };

    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });

    const onSubmitValid = () => {
        if (loading) {
            return;
        }
        const { username, password } = getValues();
        login({
            variables: { username, password },
        });
    };

    const clearLoginError = () => {
        clearErrors("result");
    };

    return (
        <MainContainer>
            <Wrapper>
                <Container>
                    <div style={{'color': 'white'}}>
                        <FontAwesomeIcon icon={faMoon} size="6x" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Input
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 5,
                                    message: "Username must be longer than 5 characters"
                                }
                            })}
                            onChange={clearLoginError}
                            name="username"
                            type="text"
                            placeholder="Username"
                        />
                        <FormError>{errors?.username?.message}</FormError>
                        <Input
                            {...register("password", {
                                required: "Password is required.",
                            })}
                            onChange={clearLoginError}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <FormError>{errors?.password?.message}</FormError>
                        <Button
                            type="submit"
                            value="Log in"
                        />
                        <FormError>{errors?.result?.message}</FormError>
                    </form>
                </Container>
            </Wrapper>
        </MainContainer>
    );
}

export default Login;
