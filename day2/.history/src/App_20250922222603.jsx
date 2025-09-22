import Container from "./components/Container";
import Tombol from "./components/Tombol";

export default function App() {
  return (
    <main className="py-10 bg-blue-400">
      <Container><h1>Contact</h1></Container>
      <Container><h1>Ninno</h1></Container>
      <Tombol link="wa.me/62895396004952"></Tombol>
    </main>
  )
}