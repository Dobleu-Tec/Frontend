import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Filter } from 'lucide-react';
import { getCursos, createCurso, updateCurso, deleteCurso, getDocentes } from '../services/api';

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Filters
  const [filterNombre, setFilterNombre] = useState('');
  const [filterDocente, setFilterDocente] = useState('');
  const [filterPrecioMax, setFilterPrecioMax] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    duracion: '',
    precio: '',
    fechaInicio: '',
    docenteId: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [cursosData, docentesData] = await Promise.all([
      getCursos(),
      getDocentes()
    ]);
    setCursos(cursosData);
    setDocentes(docentesData);
  };

  const handleOpenForm = (curso = null) => {
    if (curso) {
      setFormData(curso);
      setEditingId(curso.id);
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        duracion: '',
        precio: '',
        fechaInicio: '',
        docenteId: ''
      });
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
    if (!formData.nombre.trim()) newErrors.nombre = 'Obligatorio';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'Obligatorio';
    if (!formData.duracion || formData.duracion <= 0) newErrors.duracion = 'Debe ser mayor a 0';
    if (!formData.precio || formData.precio < 0) newErrors.precio = 'Debe ser mayor o igual a 0';
    if (!formData.fechaInicio) newErrors.fechaInicio = 'Obligatorio';
    if (!formData.docenteId) newErrors.docenteId = 'Obligatorio';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Convert values to proper types
    const submitData = {
      ...formData,
      duracion: parseInt(formData.duracion),
      precio: parseFloat(formData.precio)
    };

    if (editingId) {
      await updateCurso(editingId, submitData);
    } else {
      await createCurso(submitData);
    }
    await loadData();
    handleCloseForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este curso?')) {
      await deleteCurso(id);
      await loadData();
    }
  };

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper to get docente name
  const getDocenteName = (id) => {
    const doc = docentes.find(d => d.id === id);
    return doc ? doc.nombre : 'No asignado';
  };

  // Apply filters
  const filteredCursos = cursos.filter(curso => {
    const matchNombre = curso.nombre.toLowerCase().includes(filterNombre.toLowerCase());
    const matchDocente = filterDocente ? curso.docenteId === filterDocente : true;
    const matchPrecio = filterPrecioMax ? curso.precio <= parseFloat(filterPrecioMax) : true;
    return matchNombre && matchDocente && matchPrecio;
  });

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Cursos Disponibles</h1>
        {!isFormOpen && (
          <button className="btn btn-primary" onClick={() => handleOpenForm()}>
            <Plus size={18} /> Nuevo Curso
          </button>
        )}
      </header>

      {!isFormOpen && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Filter size={18} /> Filtros de Búsqueda
          </h3>
          <div className="filters-bar">
            <div>
              <label className="form-label">Buscar por nombre</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Ej. Desarrollo Web..."
                  value={filterNombre}
                  onChange={(e) => setFilterNombre(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Filtrar por Docente</label>
              <select 
                className="form-select"
                value={filterDocente}
                onChange={(e) => setFilterDocente(e.target.value)}
              >
                <option value="">Todos los docentes</option>
                {docentes.map(d => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Precio Máximo (COP)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Ej. 1000000"
                value={filterPrecioMax}
                onChange={(e) => setFilterPrecioMax(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {isFormOpen ? (
        <div className="card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2>{editingId ? 'Editar Curso' : 'Nuevo Curso'}</h2>
            <button className="btn-icon" onClick={handleCloseForm}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Nombre del Curso</label>
              <input
                type="text"
                className="form-input"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
              {errors.nombre && <span className="form-error">{errors.nombre}</span>}
            </div>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Descripción</label>
              <textarea
                className="form-textarea"
                rows="3"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
              {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Duración (Semanas)</label>
              <input
                type="number"
                className="form-input"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
              />
              {errors.duracion && <span className="form-error">{errors.duracion}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-input"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              />
              {errors.precio && <span className="form-error">{errors.precio}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Fecha de Inicio</label>
              <input
                type="datetime-local"
                className="form-input"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
              />
              {errors.fechaInicio && <span className="form-error">{errors.fechaInicio}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Docente</label>
              <select
                className="form-select"
                value={formData.docenteId}
                onChange={(e) => setFormData({ ...formData, docenteId: e.target.value })}
              >
                <option value="">Seleccione un docente...</option>
                {docentes.map(d => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </select>
              {errors.docenteId && <span className="form-error">{errors.docenteId}</span>}
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Actualizar Curso' : 'Guardar Curso'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card table-container">
          {filteredCursos.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron cursos con los filtros actuales.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Duración</th>
                  <th>Precio</th>
                  <th>Fecha Inicio</th>
                  <th>Docente</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCursos.map((curso) => (
                  <tr key={curso.id}>
                    <td>
                      <strong>{curso.nombre}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        {curso.descripcion.substring(0, 50)}...
                      </div>
                    </td>
                    <td>{curso.duracion} sem.</td>
                    <td>{formatPrice(curso.precio)}</td>
                    <td>{formatDate(curso.fechaInicio)}</td>
                    <td>{getDocenteName(curso.docenteId)}</td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button 
                        className="btn-icon" 
                        title="Editar"
                        onClick={() => handleOpenForm(curso)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="btn-icon danger" 
                        title="Eliminar"
                        onClick={() => handleDelete(curso.id)}
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

export default Cursos;
