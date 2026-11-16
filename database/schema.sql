CREATE TABLE IF NOT EXISTS veterinaria (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  historia TEXT NOT NULL,
  mision TEXT NOT NULL,
  vision TEXT NOT NULL,
  valores TEXT NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  whatsapp VARCHAR(30),
  horario_atencion TEXT NOT NULL,
  mapa_url TEXT
);

CREATE TABLE IF NOT EXISTS servicios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  descripcion TEXT NOT NULL,
  imagen_url TEXT,
  icono VARCHAR(100),
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS especialidades (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  descripcion TEXT NOT NULL,
  imagen_url TEXT,
  estado BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS precios (
  id SERIAL PRIMARY KEY,
  servicio_id INTEGER NOT NULL REFERENCES servicios(id),
  precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
  moneda VARCHAR(10) NOT NULL DEFAULT 'BOB',
  descripcion_adicional TEXT,
  vigente BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS galeria (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  imagen_url TEXT NOT NULL,
  categoria VARCHAR(100),
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  telefono VARCHAR(30),
  asunto VARCHAR(200) NOT NULL,
  mensaje TEXT NOT NULL,
  estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_precios_unico_vigente_por_servicio
  ON precios (servicio_id) WHERE vigente = TRUE;
CREATE INDEX IF NOT EXISTS idx_servicios_estado ON servicios (estado);
CREATE INDEX IF NOT EXISTS idx_especialidades_estado ON especialidades (estado);
CREATE INDEX IF NOT EXISTS idx_galeria_estado ON galeria (estado);
CREATE INDEX IF NOT EXISTS idx_contactos_fecha_creacion ON contactos (fecha_creacion DESC);

INSERT INTO veterinaria (
  nombre, descripcion, historia, mision, vision, valores, direccion, telefono,
  correo, whatsapp, horario_atencion, mapa_url
)
SELECT
  'Centro Veterinario de Demostración',
  'Información ficticia de demostración para una clínica veterinaria.',
  'Historia ficticia de demostración, editable por el administrador.',
  'Brindar atención responsable y cercana a las mascotas.',
  'Ser un ejemplo de cuidado y bienestar animal.',
  'Respeto, empatía, responsabilidad y bienestar animal.',
  'Dirección demostrativa; reemplazar antes de publicar.',
  '+591 70000000',
  'contacto@ejemplo.invalid',
  NULL,
  'Horario demostrativo: lunes a sábado, 08:00 a 18:00.',
  'https://maps.google.com/'
WHERE NOT EXISTS (SELECT 1 FROM veterinaria);

INSERT INTO servicios (nombre, descripcion, imagen_url, icono)
VALUES
  ('Consulta veterinaria', 'Evaluación general y orientación para el cuidado de la mascota.', 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg', 'stethoscope'),
  ('Vacunación', 'Planificación y aplicación de vacunas según evaluación veterinaria.', 'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg', 'syringe'),
  ('Desparasitación', 'Orientación veterinaria para el control de parásitos.', 'https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg', 'shield'),
  ('Cirugía', 'Procedimientos quirúrgicos con evaluación y seguimiento profesional.', 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg', 'activity'),
  ('Esterilización', 'Atención veterinaria para procedimientos de esterilización.', 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg', 'heart'),
  ('Baño y peluquería', 'Higiene y cuidado estético para mascotas.', 'https://images.pexels.com/photos/6568942/pexels-photo-6568942.jpeg', 'scissors'),
  ('Laboratorio clínico', 'Análisis clínicos de apoyo al diagnóstico veterinario.', 'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg', 'flask'),
  ('Emergencias', 'Orientación para atención veterinaria urgente.', 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg', 'cross'),
  ('Odontología veterinaria', 'Evaluación y cuidado de la salud oral de las mascotas.', 'https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg', 'smile'),
  ('Hospitalización', 'Acompañamiento y cuidado clínico bajo supervisión veterinaria.', 'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg', 'home')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO especialidades (nombre, descripcion, imagen_url)
VALUES
  ('Medicina general', 'Atención integral y preventiva para mascotas.', 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg'),
  ('Dermatología veterinaria', 'Evaluación de la piel, pelaje y afecciones dermatológicas.', 'https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg'),
  ('Cardiología veterinaria', 'Evaluación y seguimiento de la salud cardiovascular.', 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg'),
  ('Traumatología', 'Valoración veterinaria de lesiones y movilidad.', 'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg'),
  ('Oftalmología', 'Evaluación y cuidado de la salud ocular.', 'https://images.pexels.com/photos/6568942/pexels-photo-6568942.jpeg'),
  ('Medicina preventiva', 'Orientación para promover el bienestar y prevenir enfermedades.', 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg'),
  ('Diagnóstico por imagen', 'Estudios por imagen como apoyo a la evaluación clínica.', 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO precios (servicio_id, precio, moneda, descripcion_adicional)
SELECT s.id, demo.precio, 'BOB', 'Precio demostrativo, no definitivo. Confirmar con la veterinaria.'
FROM (VALUES
  ('Consulta veterinaria', 80.00),
  ('Vacunación', 60.00),
  ('Desparasitación', 40.00),
  ('Baño y peluquería', 70.00)
) AS demo(nombre, precio)
JOIN servicios s ON s.nombre = demo.nombre
WHERE NOT EXISTS (
  SELECT 1 FROM precios p WHERE p.servicio_id = s.id AND p.vigente = TRUE
);

INSERT INTO galeria (titulo, descripcion, imagen_url, categoria)
SELECT demo.titulo, 'Imagen de demostración; sustituir por fotografías autorizadas de la clínica.', demo.imagen_url, demo.categoria
FROM (VALUES
  ('Atención veterinaria', 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg', 'Equipo'),
  ('Cuidado de mascotas', 'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg', 'Atención'),
  ('Bienestar animal', 'https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg', 'Mascotas')
) AS demo(titulo, imagen_url, categoria)
WHERE NOT EXISTS (SELECT 1 FROM galeria g WHERE g.titulo = demo.titulo);
