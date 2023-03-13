import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [ids, setIds] = useState("")



    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
        <Routes>
            <Route  path="/" element={<HomePage />} />
            <Route  path="/sessoes/:idFilme" element={<SessionsPage/>} />
            <Route  path="/assentos/:idSessao" element={<SeatsPage name={name} setName={setName} cpf={cpf} setCpf={setCpf} ids={ids} setIds={setIds} />} />
            <Route  path="/sucesso" element={<SuccessPage name={name} cpf={cpf} ids={ids} />} />

        </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
