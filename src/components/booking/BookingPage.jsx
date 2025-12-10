import React, { useState } from "react";
import "./BookingPage.css";

const BookingPage = ({ place, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaViaje: "",
    numPersonas: 1,
    notas: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="booking-modal">
        <div className="booking-container success-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>¡Reserva Confirmada!</h2>
            <p>Tu reserva para {place.nombre} ha sido registrada exitosamente.</p>
            <p className="success-details">Te enviaremos la confirmación a {formData.email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-modal" onClick={onClose}>
      <div className="booking-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>

        <div className="booking-header">
          <h1>Reservar: {place.nombre}</h1>
          <p className="booking-country">📍 {place.pais}</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+57 300 000 0000"
              required
            />
          </div>

          {/* Fecha de Viaje */}
          <div className="form-group">
            <label htmlFor="fechaViaje">Fecha de Viaje *</label>
            <input
              type="date"
              id="fechaViaje"
              name="fechaViaje"
              value={formData.fechaViaje}
              onChange={handleChange}
              required
            />
          </div>

          {/* Número de Personas */}
          <div className="form-group">
            <label htmlFor="numPersonas">Número de Personas *</label>
            <select
              id="numPersonas"
              name="numPersonas"
              value={formData.numPersonas}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "persona" : "personas"}
                </option>
              ))}
            </select>
          </div>

          {/* Notas */}
          <div className="form-group">
            <label htmlFor="notas">Notas Adicionales</label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Cuéntanos si tienes necesidades especiales o preguntas..."
              rows="4"
            />
          </div>

          {/* Precio Total */}
          <div className="price-summary">
            <div className="price-row">
              <span>Precio por persona:</span>
              <span>${place.precioCOP.toLocaleString("es-CO")}</span>
            </div>
            <div className="price-row">
              <span>Número de personas:</span>
              <span>{formData.numPersonas}</span>
            </div>
            <div className="price-row total">
              <span>Total:</span>
              <span>${(place.precioCOP * formData.numPersonas).toLocaleString("es-CO")}</span>
            </div>
          </div>

          {/* Botón Submit */}
          <button type="submit" className="submit-button">
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
