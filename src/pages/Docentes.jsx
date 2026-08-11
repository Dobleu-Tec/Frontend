import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { getDocentes, createDocente, updateDocente, deleteDocente } from '../services/api';

function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    correo: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadDocentes();
  }, []);

  const loadDocentes = async () => {
    const data = await getDocentes();
    setDocentes(data);
  };

  const handleOpenForm = (docente = null) => {
    if (docente) {
      setFormData(docente);
      setEditingId(docente.id);
    } else {
      setFormData({ nombre: '', documento: '', correo: '' });
      setEditingId(null);
    }
    setErrors({});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.documento.trim()) newErrors.documento = 'El documento es obligatorio';
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingId) {
      await updateDocente(editingId, formData);
    } else {
      await createDocente(formData);
    }
    await loadDocentes();
    handleCloseForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este docente?')) {
      await deleteDocente(id);
      await loadDocentes();
    }
  };

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Gestión de Docentes</h1>
        {!isFormOpen && (
          <button className="btn btn-primary" onClick={() => handleOpenForm()}>
            <Plus size={18} /> Nuevo Docente
          </button>
        )}
      </header>

      {isFormOpen ? (
        <div className="card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2>{editingId ? 'Editar Docente' : 'Nuevo Docente'}</h2>
            <button className="btn-icon" onClick={handleCloseForm}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-input"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. Juan Pérez"
              />
              {errors.nombre && <span className="form-error">{errors.nombre}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Documento de Identidad</label>
              <input
                type="text"
                className="form-input"
                value={formData.documento}
                onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                placeholder="Ej. 123456789"
              />
              {errors.documento && <span className="form-error">{errors.documento}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-input"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                placeholder="ejemplo@cesde.edu.co"
              />
              {errors.correo && <span className="form-error">{errors.correo}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card table-container">
          {docentes.length === 0 ? (
            <div className="empty-state">
              <p>No hay docentes registrados aún.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Correo</th>
                  <th style={{ width: '120px', textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {docentes.map((docente) => (
                  <tr key={docente.id}>
                    <td><strong>{docente.nombre}</strong></td>
                    <td>{docente.documento}</td>
                    <td>{docente.correo}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn-icon" 
                        title="Editar"
                        onClick={() => handleOpenForm(docente)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="btn-icon danger" 
                        title="Eliminar"
                        onClick={() => handleDelete(docente.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Docentes;
