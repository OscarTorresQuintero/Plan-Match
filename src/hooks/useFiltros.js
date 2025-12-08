import { useState } from "react";

export function useFiltros() {
  const [filtros, setFiltros] = useState({
    tipoActividad: "",
    categoria: "",
    clima: "",
    presupuesto: "",
    tiempoVisita: "",
    accesibilidad: "",
    mejorEpoca: "",
  });

  const actualizarFiltro = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  return { filtros, actualizarFiltro };
}
