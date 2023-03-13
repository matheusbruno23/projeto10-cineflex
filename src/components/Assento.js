import { useEffect, useState } from "react"
import styled from "styled-components"
import { color } from "./colors"

export default function Assento({seat , reservarAssento , selecionado}) {

    const [status, setStatus] = useState("available")

    useEffect(()=> {
        if (selecionado) {
            setStatus("selected")
        }

        else if (seat.isAvailable) {
            setStatus("available")
        } else {
            setStatus("unavailable")
        }

    }, [selecionado])

    return (
        <>
                <SeatItem 
                status={status} 
                onClick={() => reservarAssento(seat)}
                >
                    {seat.name}
                </SeatItem>
        </>

    )


}




const SeatItem = styled.div`
    border: 1px solid ${props => color[props.status].border};         // Essa cor deve mudar
    background-color: ${props => color[props.status].background};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`