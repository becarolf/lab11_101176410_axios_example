import { Component } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

class PersonList extends Component {
  state = {
    persons: [],
    loading: true,
    error: '',
  };

  componentDidMount() {
    this.loadPersons();
  }

  loadPersons = () => {
    this.setState({ loading: true, error: '' });

    axios.get('https://randomuser.me/api/?results=10')
      .then((response) => {
        this.setState({ persons: response.data.results, loading: false });
      })
      .catch(() => {
        this.setState({ error: 'Unable to load people. Please try again.', loading: false });
      });
  };

  render() {
    const { persons, loading, error } = this.state;

    if (loading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
          <p className="mt-3">Loading people...</p>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger">{error}</Alert>
      );
    }

    return (
      <section className="user-list">
        <div className="user-list-title">
          <h1>User List - Lab Week 11</h1>
        </div>
        <div className="user-list-content">
          {persons.map((person) => (
            <article className="person-card" key={person.login.uuid}>
              <h2>
                {person.name.title} {person.name.first} {person.name.last} - {person.login.uuid}
              </h2>
              <div className="person-details">
                <img
                  className="person-photo"
                  src={person.picture.large}
                  alt={`${person.name.first} ${person.name.last}`}
                />
                <div className="person-info">
                  <p><strong>User Name:</strong> {person.login.username}</p>
                  <p><strong>Gender:</strong> {person.gender}</p>
                  <p><strong>Time Zone:</strong> {person.location.timezone.description}</p>
                  <p><strong>Address:</strong> {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} - {person.location.postcode}</p>
                  <p><strong>Email:</strong> {person.email}</p>
                  <p><strong>Birth Date:</strong> {new Date(person.dob.date).toLocaleDateString()} ({person.dob.age} years)</p>
                  <p><strong>Registered Date:</strong> {new Date(person.registered.date).toLocaleDateString()}</p>
                  <p><strong>Phone:</strong> {person.phone}</p>
                  <p><strong>Cell:</strong> {person.cell}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

export default PersonList;
