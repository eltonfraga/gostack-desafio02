import React, { useState, useEffect } from "react";
import api from './services/api';
//import Repository from './components/Repository';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio ${Date.now()}`,
      url: "https://github.com/eltonfraga/repo",
      techs: ["ReactJS", 'JavaScript']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    if (id != 1) {
      const response = await api.delete(`repositories/${id}`);
      if (response.status === 204) {
        const repoIndex = repositories.findIndex(repo => repo.id === id);

        const updateRepositories = repositories.splice(repoIndex, 1);
        setRepositories(updateRepositories);
      }
      const repoIndex = repositories.findIndex(repo => repo.id === id);
      const updateRepositories = repositories.splice(repoIndex, 1);
      setRepositories(updateRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
