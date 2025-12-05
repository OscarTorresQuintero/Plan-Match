function InfoSection({ descripcion, rating, precio, horario, plan }) {
  return (
    <div className="mt-4">
      <p className="mb-2"><strong>Descripción:</strong> {descripcion}</p>
      <p className="mb-2"><strong>Rating:</strong> ⭐ {rating}/5</p>
      <p className="mb-2"><strong>Precio:</strong> {precio} COP</p>
      <p className="mb-2"><strong>Horario:</strong> {horario}</p>
      <p className="mb-2"><strong>Tipo de plan:</strong> {plan}</p>
    </div>
  );
}

export default InfoSection;

