const API_URL = 'http://localhost:3001';

// Docentes API
export const getDocentes = async () => {
  const response = await fetch(`${API_URL}/docentes`);
  return response.json();
};

export const createDocente = async (docente) => {
  const response = await fetch(`${API_URL}/docentes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(docente)
  });
  return response.json();
};

export const updateDocente = async (id, docente) => {
  const response = await fetch(`${API_URL}/docentes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(docente)
  });
  return response.json();
};

export const deleteDocente = async (id) => {
  await fetch(`${API_URL}/docentes/${id}`, {
    method: 'DELETE'
  });
};

// Cursos API
export const getCursos = async () => {
  const response = await fetch(`${API_URL}/cursos`);
  return response.json();
};

export const createCurso = async (curso) => {
  const response = await fetch(`${API_URL}/cursos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  return response.json();
};

export const updateCurso = async (id, curso) => {
  const response = await fetch(`${API_URL}/cursos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  return response.json();
};

export const deleteCurso = async (id) => {
  await fetch(`${API_URL}/cursos/${id}`, {
    method: 'DELETE'
  });
};
