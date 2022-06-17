import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import routes from "./routes";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, isLoggedInVar } from "./apollo";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    {isLoggedIn ? (
                        <Route exact path={routes.home} element={<Home/>}/>
                    ) : (
                        <Route exact path={routes.home} element={<Login/>}/>
                    )}
                    {!isLoggedIn ? (
                        <Route exact path={routes.signUp} element={<SignUp/>}/>
                    ) : <Route exact path={routes.signUp} element={null}/>}
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
