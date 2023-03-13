import { useEffect, useState} from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Assento from "../../components/Assento"
import { color } from "../../components/colors"

export default function SeatsPage({name, setName, cpf , setCpf , ids, setIds}) {

    // estados compra do ingresso

    const [seats, setSeats] = useState([])
    const [imagem, setImagem] = useState([])
    const [hour, setHour] = useState([])
    const [date, setDate] = useState([])
    const {idSessao} = useParams()
    const navigate = useNavigate()
    //seleção dos assentos

    const [selectSeats, setSelectSeats] = useState([])


    function enviaDadosComprador(e){
        e.preventDefault()
        const urlPost ="https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const ids = selectSeats.map(s => s.id)
        const body = {ids: ids, name: name, cpf: cpf}

        const promise = axios.post(urlPost , body)
        promise.then((res)=> navigate("/sucesso"))
        promise.catch((err) => console.log(err.response.data))


    }

    function reservarAssento(seat){
        if(!seat.isAvailable){
            alert("Este assento não está disponível")
        }
        else{
            const selecionado = selectSeats.find((s) => s.id === seat.id)
            if(selecionado){
                const lista = selectSeats.filter((s)=> s.id !== seat.id)
                setSelectSeats(lista)
            }
            else{
                setSelectSeats([...selectSeats , seat])
            }
        }

    }


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(url)
        promise.then((res)=> {
            setSeats(res.data.seats)
            setImagem(res.data.movie)
            setHour(res.data.name)
            setDate(res.data.day)
        })
        promise.catch((err)=> {
            console.log(err.response.data)
        })

    }, [])


    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((seat)=> (
                    <Assento 
                    reservarAssento={reservarAssento} 
                    key={seat.id} 
                    seat={seat}
                    selecionado={selectSeats.find((s) => s.id === seat.id)}
                    />
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status="selected"/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status="available"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status="unavailable"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={enviaDadosComprador}>
                <label htmlFor="nome">Nome do Comprador:</label>
                <input id="nome" placeholder="Digite seu nome..." required value={name} onChange={e => setName(e.target.value)}/>
                <label htmlFor="cpf">CPF do Comprador:</label>
                <input id="cpf" placeholder="Digite seu CPF..." required value={cpf} onChange={e => setCpf(e.target.value)}/>
                <button type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={imagem.posterURL} alt={imagem.title}/>
                </div>
                <div>
                    <p>{imagem.title}</p>
                    <p>{date.weekday} - {hour}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}



const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => color[props.status].border};
    background-color: ${props => color[props.status].background};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`