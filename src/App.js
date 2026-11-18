import Container from 'react-bootstrap/Container';
import PersonList from './components/PersonList';

function App() {
  return (
    <Container className="app-container py-5">
      <PersonList />
    </Container>
  );
}

export default App;
