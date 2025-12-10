import React, { useState } from "react";
import BookingPage from "../booking/BookingPage";
import "./InfoSection.css";

const InfoSection = ({ name, price, rating, description, place }) => {
  const [showBooking, setShowBooking] = useState(false);

  const formatPrice = (priceValue) => {
    if (!priceValue || priceValue === 0) return "Gratis";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(priceValue);
  };

  const renderStars = (ratingValue) => {
    if (!ratingValue) return "Sin calificación";
    return (
      <div className="stars-container">
        <span className="stars">
          {"★".repeat(ratingValue)}{"☆".repeat(5 - ratingValue)}
        </span>
        <span className="rating-text">({ratingValue}/5)</span>
      </div>
    );
  };

  return (
    <>
      {showBooking && <BookingPage place={place} onClose={() => setShowBooking(false)} />}
      
      <div className="info-section">
        <div className="info-header">
          <h2 className="info-title">{name}</h2>
          <div className="info-divider"></div>
        </div>
        
        <div className="info-content">
          {/* Precio */}
          <div className="info-item price-item">
            <span className="info-label">💰 Precio</span>
            <span className="info-value price-value">{formatPrice(price)}</span>
          </div>

          {/* Rating */}
          <div className="info-item rating-item">
            <span className="info-label">⭐ Calificación</span>
            <div className="info-value rating-value">{renderStars(rating)}</div>
          </div>

          {/* Descripción */}
          <div className="info-item description-item">
            <span className="info-label">📝 Descripción</span>
            <p className="info-description">
              {description || "Sin descripción disponible"}
            </p>
          </div>

          {/* Botón de acción */}
          <button 
            className="action-button"
            onClick={() => setShowBooking(true)}
          >
            ✨ Descubre Este Lugar
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
