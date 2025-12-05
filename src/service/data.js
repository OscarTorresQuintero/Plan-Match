const lugares = [
  { id: 1, nombre: "Machu Picchu", pais: "Perú", descripcion: "Ciudadela inca ubicada en las montañas de los Andes, una de las maravillas del mundo.", imagen: "https://source.unsplash.com/800x600/?machu-picchu", rating: 5, precioCOP: 480000 },
  { id: 2, nombre: "Torre Eiffel", pais: "Francia", descripcion: "Símbolo icónico de París, famoso por sus vistas panorámicas.", imagen: "https://source.unsplash.com/800x600/?eiffel-tower", rating: 5, precioCOP: 120000 },
  { id: 3, nombre: "Gran Muralla China", pais: "China", descripcion: "Muralla milenaria que recorre miles de kilómetros.", imagen: "https://source.unsplash.com/800x600/?great-wall-china", rating: 5, precioCOP: 180000 },
  { id: 4, nombre: "Times Square", pais: "Estados Unidos", descripcion: "El corazón luminoso de Nueva York, famoso por sus pantallas gigantes.", imagen: "https://source.unsplash.com/800x600/?times-square", rating: 4, precioCOP: 0 },
  { id: 5, nombre: "Cataratas del Niágara", pais: "Canadá / USA", descripcion: "Tres cataratas gigantes que forman una maravilla natural inolvidable.", imagen: "https://source.unsplash.com/800x600/?niagara-falls", rating: 5, precioCOP: 100000 },
  { id: 6, nombre: "Pirámides de Giza", pais: "Egipto", descripcion: "Tumbas monumentales construidas para los faraones.", imagen: "https://source.unsplash.com/800x600/?pyramids", rating: 5, precioCOP: 60000 },
  { id: 7, nombre: "Islas Maldivas", pais: "Maldivas", descripcion: "Playas paradisíacas con aguas cristalinas y resorts de lujo.", imagen: "https://source.unsplash.com/800x600/?maldives", rating: 5, precioCOP: 1200000 },
  { id: 8, nombre: "Santorini", pais: "Grecia", descripcion: "Isla famosa por sus casas blancas, domos azules y atardeceres únicos.", imagen: "https://source.unsplash.com/800x600/?santorini", rating: 5, precioCOP: 200000 },
  { id: 9, nombre: "La Sagrada Familia", pais: "España", descripcion: "Basílica icónica diseñada por Antoni Gaudí.", imagen: "https://source.unsplash.com/800x600/?sagrada-familia", rating: 4, precioCOP: 140000 },
  { id: 10, nombre: "Chichén Itzá", pais: "México", descripcion: "Pirámide maya considerada una de las nuevas maravillas del mundo.", imagen: "https://source.unsplash.com/800x600/?chichen-itza", rating: 5, precioCOP: 80000 },

  { id: 11, nombre: "Cascada Esmeralda", pais: "Colombia", descripcion: "Una cascada rodeada de verdes intensos y aguas cristalinas.", imagen: "https://source.unsplash.com/800x600/?waterfall,forest", rating: 4, precioCOP: 40000 },
  { id: 12, nombre: "Playa Dorada", pais: "Colombia", descripcion: "Arena dorada y mar cálido, ideal para relajarse.", imagen: "https://source.unsplash.com/800x600/?beach,golden", rating: 5, precioCOP: 60000 },
  { id: 13, nombre: "Bosque Encantado", pais: "Colombia", descripcion: "Un bosque misterioso lleno de senderos naturales.", imagen: "https://source.unsplash.com/800x600/?forest,mystic", rating: 4, precioCOP: 32000 },
  { id: 14, nombre: "Isla del Sol", pais: "Colombia", descripcion: "Isla tropical famosa por sus aguas turquesas.", imagen: "https://source.unsplash.com/800x600/?island,tropical", rating: 5, precioCOP: 240000 },
  { id: 15, nombre: "Mirador del Cielo", pais: "Colombia", descripcion: "Mirador con vistas panorámicas impresionantes.", imagen: "https://source.unsplash.com/800x600/?mountains,view", rating: 4, precioCOP: 20000 },
  { id: 16, nombre: "Laguna Cristal", pais: "Colombia", descripcion: "Laguna de agua clara ideal para nadar y relajarse.", imagen: "https://source.unsplash.com/800x600/?lake,clear", rating: 5, precioCOP: 48000 },
  { id: 17, nombre: "Valle Sagrado", pais: "Colombia", descripcion: "Un valle rodeado de montañas y naturaleza.", imagen: "https://source.unsplash.com/800x600/?valley", rating: 4, precioCOP: 72000 },
  { id: 18, nombre: "Montaña Roja", pais: "Colombia", descripcion: "Montaña con tonos rojizos y paisajes únicos.", imagen: "https://source.unsplash.com/800x600/?mountain,red", rating: 4, precioCOP: 56000 },
  { id: 19, nombre: "Desierto Dorado", pais: "Colombia", descripcion: "Dunas doradas que se extienden hasta el horizonte.", imagen: "https://source.unsplash.com/800x600/?desert", rating: 4, precioCOP: 80000 },
  { id: 20, nombre: "Pueblo Antiguo", pais: "Colombia", descripcion: "Arquitectura colonial y calles empedradas.", imagen: "https://source.unsplash.com/800x600/?village,old", rating: 5, precioCOP: 28000 },
  { id: 21, nombre: "Cueva Azul", pais: "Colombia", descripcion: "Cueva iluminada naturalmente por un tono azul intenso.", imagen: "https://source.unsplash.com/800x600/?cave,blue", rating: 4, precioCOP: 36000 },
  { id: 22, nombre: "Parque Celestial", pais: "Colombia", descripcion: "Parque natural perfecto para caminatas y fotografía.", imagen: "https://source.unsplash.com/800x600/?park,nature", rating: 5, precioCOP: 24000 },
  { id: 23, nombre: "Bahía Serenidad", pais: "Colombia", descripcion: "Una bahía de aguas tranquilas y paisajes relajantes.", imagen: "https://source.unsplash.com/800x600/?bay,sea", rating: 5, precioCOP: 88000 },
  { id: 24, nombre: "Costa Diamante", pais: "Colombia", descripcion: "Costa brillante con arena fina y clara.", imagen: "https://source.unsplash.com/800x600/?coast,beach", rating: 4, precioCOP: 64000 },
  { id: 25, nombre: "Colina Mística", pais: "Colombia", descripcion: "Colina cubierta de niebla y vistas mágicas.", imagen: "https://source.unsplash.com/800x600/?hill,mist", rating: 4, precioCOP: 16000 },
  { id: 26, nombre: "Río de Plata", pais: "Colombia", descripcion: "Río famoso por su agua brillante y cristalina.", imagen: "https://source.unsplash.com/800x600/?river", rating: 5, precioCOP: 40000 },
  { id: 27, nombre: "Fortaleza del Viento", pais: "Colombia", descripcion: "Antigua fortaleza construida en lo alto de una montaña.", imagen: "https://source.unsplash.com/800x600/?fortress,castle", rating: 4, precioCOP: 32000 },
  { id: 28, nombre: "Santuario de la Luna", pais: "Colombia", descripcion: "Templo sagrado utilizado para observaciones lunares.", imagen: "https://source.unsplash.com/800x600/?temple,moon", rating: 4, precioCOP: 24000 },
  { id: 29, nombre: "Laguna del Alba", pais: "Colombia", descripcion: "Laguna donde los amaneceres son inolvidables.", imagen: "https://source.unsplash.com/800x600/?lake,sunrise", rating: 5, precioCOP: 44000 },
  { id: 30, nombre: "Selva Dorada", pais: "Colombia", descripcion: "Selva llena de fauna exótica y vegetación vibrante.", imagen: "https://source.unsplash.com/800x600/?jungle", rating: 4, precioCOP: 52000 },
  { id: 31, nombre: "Isla Oculta", pais: "Colombia", descripcion: "Isla secreta perfecta para aventureros.", imagen: "https://source.unsplash.com/800x600/?hidden-island", rating: 5, precioCOP: 360000 },
  { id: 32, nombre: "Catarata del Trueno", pais: "Colombia", descripcion: "Cascada que ruge como un trueno.", imagen: "https://source.unsplash.com/800x600/?waterfall,strong", rating: 5, precioCOP: 56000 },
  { id: 33, nombre: "Playa Cielo", pais: "Colombia", descripcion: "Playa con agua azul brillante y arena suave.", imagen: "https://source.unsplash.com/800x600/?beach,sky", rating: 4, precioCOP: 72000 },
  { id: 34, nombre: "Reserva Estelar", pais: "Colombia", descripcion: "Lugar ideal para ver estrellas y acampar.", imagen: "https://source.unsplash.com/800x600/?night-sky,stars", rating: 5, precioCOP: 28000 },
  { id: 35, nombre: "Puente del Dragón", pais: "Colombia", descripcion: "Un puente monumental con forma de dragón.", imagen: "https://source.unsplash.com/800x600/?bridge", rating: 4, precioCOP: 20000 },
  { id: 36, nombre: "Isla Coral", pais: "Colombia", descripcion: "Isla rodeada de corales para hacer snorkel.", imagen: "https://source.unsplash.com/800x600/?coral,island", rating: 5, precioCOP: 220000 },
  { id: 37, nombre: "Parque del Horizonte", pais: "Colombia", descripcion: "Miradores y senderos para ver amaneceres.", imagen: "https://source.unsplash.com/800x600/?sunrise,park", rating: 4, precioCOP: 24000 },
  { id: 38, nombre: "Mirador del Sol", pais: "Colombia", descripcion: "Mirador especial para observar el atardecer.", imagen: "https://source.unsplash.com/800x600/?sunset,view", rating: 5, precioCOP: 20000 },
  { id: 39, nombre: "Bosque Solar", pais: "Colombia", descripcion: "Bosque iluminado naturalmente por reflejos dorados.", imagen: "https://source.unsplash.com/800x600/?forest,sun", rating: 4, precioCOP: 36000 },
  { id: 40, nombre: "Río Eterno", pais: "Colombia", descripcion: "Río que fluye entre montañas y praderas.", imagen: "https://source.unsplash.com/800x600/?river,nature", rating: 4, precioCOP: 40000 },
  { id: 41, nombre: "Cueva del Viajero", pais: "Colombia", descripcion: "Cueva explorada por viajeros desde hace siglos.", imagen: "https://source.unsplash.com/800x600/?cave,travel", rating: 4, precioCOP: 32000 },
  { id: 42, nombre: "Valle de las Rocas", pais: "Colombia", descripcion: "Valle lleno de formaciones rocosas impresionantes.", imagen: "https://source.unsplash.com/800x600/?rocks,valley", rating: 5, precioCOP: 48000 },
  { id: 43, nombre: "Ciudad Antigua", pais: "Colombia", descripcion: "Calles históricas con arquitectura tradicional.", imagen: "https://source.unsplash.com/800x600/?old-city", rating: 4, precioCOP: 24000 },
  { id: 44, nombre: "Templo del Sol", pais: "Colombia", descripcion: "Templo sagrado dedicado al dios del sol.", imagen: "https://source.unsplash.com/800x600/?temple,sun", rating: 5, precioCOP: 36000 },
  { id: 45, nombre: "Montaña Nevado", pais: "Colombia", descripcion: "Nevado perfecto para expediciones y fotos.", imagen: "https://source.unsplash.com/800x600/?snowy-mountain", rating: 5, precioCOP: 100000 },
  { id: 46, nombre: "Playa Encanto", pais: "Colombia", descripcion: "Playa tranquila rodeada de palmeras.", imagen: "https://source.unsplash.com/800x600/?beach,palms", rating: 4, precioCOP: 52000 },
  { id: 47, nombre: "Cascada del Arcoíris", pais: "Colombia", descripcion: "Cascada que refleja arcoíris en días soleados.", imagen: "https://source.unsplash.com/800x600/?rainbow-waterfall", rating: 5, precioCOP: 44000 },
  { id: 48, nombre: "Isla Fantasía", pais: "Colombia", descripcion: "Isla exótica llena de colores vibrantes.", imagen: "https://source.unsplash.com/800x600/?fantasy,island", rating: 4, precioCOP: 160000 },
  { id: 49, nombre: "Laguna Escondida", pais: "Colombia", descripcion: "Laguna alejada perfecta para desconectar.", imagen: "https://source.unsplash.com/800x600/?hidden-lake", rating: 5, precioCOP: 40000 },
  { id: 50, nombre: "Mirador de Cristal", pais: "Colombia", descripcion: "Mirador con plataforma transparente.", imagen: "https://source.unsplash.com/800x600/?glass-bridge", rating: 4, precioCOP: 28000 },
  { id: 51, nombre: "Monte del Alba", pais: "Colombia", descripcion: "Montaña donde amanece de forma espectacular.", imagen: "https://source.unsplash.com/800x600/?mountain,sunrise", rating: 4, precioCOP: 36000 },
  { id: 52, nombre: "Cañón del Viento", pais: "Colombia", descripcion: "Cañón profundo donde soplan fuertes vientos.", imagen: "https://source.unsplash.com/800x600/?canyon", rating: 4, precioCOP: 48000 },
  { id: 53, nombre: "Selva Púrpura", pais: "Colombia", descripcion: "Selva con flores y árboles de tonos morados.", imagen: "https://source.unsplash.com/800x600/?purple-forest", rating: 5, precioCOP: 56000 },
  { id: 54, nombre: "Río Dorado", pais: "Colombia", descripcion: "Río que brilla intensamente durante el atardecer.", imagen: "https://source.unsplash.com/800x600/?golden-river", rating: 5, precioCOP: 44000 },
  { id: 55, nombre: "Costa Mágica", pais: "Colombia", descripcion: "Costa que mezcla acantilados y playas hermosas.", imagen: "https://source.unsplash.com/800x600/?coast,magic", rating: 4, precioCOP: 80000 },
  { id: 56, nombre: "Oasis del Desierto", pais: "Colombia", descripcion: "Oasis rodeado de palmeras en medio del desierto.", imagen: "https://source.unsplash.com/800x600/?oasis", rating: 5, precioCOP: 68000 },
  { id: 57, nombre: "Lago Celeste", pais: "Colombia", descripcion: "Lago de color azul intenso rodeado de montañas.", imagen: "https://source.unsplash.com/800x600/?blue-lake", rating: 5, precioCOP: 52000 },
  { id: 58, nombre: "Isla Turquesa", pais: "Colombia", descripcion: "Isla pequeña con aguas turquesas y arena blanca.", imagen: "https://source.unsplash.com/800x600/?turquoise-island", rating: 5, precioCOP: 260000 },
  { id: 59, nombre: "Fortaleza Real", pais: "Colombia", descripcion: "Fortaleza antigua construida en piedra.", imagen: "https://source.unsplash.com/800x600/?castle,stone", rating: 4, precioCOP: 36000 },
  { id: 60, nombre: "Ciudad del Horizonte", pais: "Colombia", descripcion: "Ciudad moderna con enormes rascacielos.", imagen: "https://source.unsplash.com/800x600/?city,skyline", rating: 5, precioCOP: 0 }
  






];


export default lugares;