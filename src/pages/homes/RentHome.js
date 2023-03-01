import { useParams } from "react-router"

export default function RentHome() {
    const {id} = useParams();
    return (
        <>
            <h1>Rent Home {id}</h1>
        </>
    )
}