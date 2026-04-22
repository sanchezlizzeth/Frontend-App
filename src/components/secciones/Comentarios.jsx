import { useState } from "react";
import { FaShieldAlt, FaSkull, FaPaperPlane } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const BG =
  "https://static.vecteezy.com/system/resources/thumbnails/023/999/187/small/weights-next-to-barbell-in-a-gym-generative-ai-photo.jpg";

const BACKEND_URL = "http://localhost:5000";

export default function Comentarios() {
  const [texto, setTexto] = useState("");
  const [comentario, setComentario] = useState("");
  const [modoInseguro, setModoInseguro] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);

  const enviarComentario = async () => {
    setError("");
    if (!texto.trim()) {
      setError("Escribe un comentario antes de enviar.");
      return;
    }
    setCargando(true);
    try {
      const res = await fetch(`${BACKEND_URL}/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error del servidor.");
        return;
      }
      setComentario(data.comentario);
      setTexto("");
      setExito(true);
      setTimeout(() => setExito(false), 2500);
    } catch {
      setError(
        " No se pudo conectar al servidor. ¿Está corriendo el backend en el puerto 5000?"
      );
    } finally {
      setCargando(false);
    }
  };

  const container = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, duration: 0.45 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  };

  return (
    <section
      style={{
        backgroundImage: `url("${BG}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[calc(100vh-80px)]"
    >
      <div className="min-h-[calc(100vh-80px)] pt-28 pb-16 bg-black/65">
        <div className="container mx-auto px-6">

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <motion.span
              variants={item}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold mb-4"
              style={{
                background: "rgba(249,115,22,.15)",
                border: "1px solid rgba(249,115,22,.35)",
                color: "#fdba74",
              }}
            >
              Seguridad Web 
            </motion.span>

            <motion.h1
              variants={item}
              className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow mb-3"
            >
              Sistema de Comentarios{" "}
              <motion.span
                style={{ color: "#f97316" }}
                animate={{
                  textShadow: [
                    "0 0 10px rgba(249,115,22,.20)",
                    "0 0 22px rgba(249,115,22,.50)",
                    "0 0 10px rgba(249,115,22,.20)",
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                Seguro
              </motion.span>
            </motion.h1>

            <motion.p variants={item} className="text-gray-200 text-sm md:text-base leading-relaxed">
              Código malicioso como{" "}
              <code className="px-1.5 py-0.5 rounded text-xs font-mono"
                style={{ background: "rgba(249,115,22,.18)", color: "#fdba74" }}>
                {`<img src=x onerror="alert('XSS')">`}
              </code>{" "}
              y observa la diferencia entre renderizado seguro y{" "}
              <code className="px-1.5 py-0.5 rounded text-xs font-mono"
                style={{ background: "rgba(249,115,22,.18)", color: "#fdba74" }}>
                dangerouslySetInnerHTML
              </code>
              .
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
          
            <motion.div
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl p-7 bg-white/10 backdrop-blur-md border border-white/15 shadow-xl flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <FaPaperPlane className="text-orange-400 text-xl" />
                <h3 className="text-white font-extrabold text-xl">Escribe tu comentario</h3>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                El texto se envía al backend 
              </p>

              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                rows={5}
                placeholder="Escribe aquí tu comentario..."
                className="w-full rounded-xl p-3 text-sm resize-y outline-none font-sans"
                style={{
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.18)",
                  color: "#fff",
                }}
              />

              
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={enviarComentario}
                  disabled={cargando}
                  whileHover={{ scale: 1.06, y: -2, boxShadow: "0 0 24px rgba(249,115,22,.40)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="px-5 py-2.5 rounded-full font-extrabold text-sm cursor-pointer border-0"
                  style={{ background: "#f97316", color: "#111" }}
                >
                  {cargando ? "Enviando…" : exito ? " Enviado" : "Enviar comentario"}
                </motion.button>

                <motion.button
                  onClick={() => setModoInseguro((p) => !p)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="px-5 py-2.5 rounded-full font-extrabold text-sm cursor-pointer"
                  style={
                    modoInseguro
                      ? {
                          background: "rgba(239,68,68,.20)",
                          border: "1px solid rgba(239,68,68,.50)",
                          color: "#fca5a5",
                        }
                      : {
                          background: "rgba(0,0,0,.20)",
                          border: "1px solid rgba(255,255,255,.25)",
                          color: "#fff",
                        }
                  }
                >
                  {modoInseguro ? "Modo SEGURO" : " Activar XSS"}
                </motion.button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl p-7 backdrop-blur-md shadow-xl flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,.10)",
                border: modoInseguro
                  ? "1px solid rgba(239,68,68,.40)"
                  : "1px solid rgba(34,197,94,.30)",
              }}
            >
              <div className="flex items-center gap-2">
                {modoInseguro
                  ? <FaSkull className="text-red-400 text-xl" />
                  : <FaShieldAlt className="text-green-400 text-xl" />
                }
                <h3 className="text-white font-extrabold text-xl">
                  {modoInseguro ? "Modo Inseguro (XSS)" : "Modo Seguro"}
                </h3>
              </div>

              <span
                className="inline-block self-start px-3 py-1 rounded text-xs font-bold"
                style={
                  modoInseguro
                    ? { background: "rgba(239,68,68,.20)", border: "1px solid rgba(239,68,68,.40)", color: "#fca5a5" }
                    : { background: "rgba(34,197,94,.20)", border: "1px solid rgba(34,197,94,.40)", color: "#86efac" }
                }
              >
                {modoInseguro ? "dangerouslySetInnerHTML ACTIVO" : " Escape automático de HTML"}
              </span>

              <div
                className="flex-1 rounded-xl p-4 text-sm leading-relaxed min-h-[120px]"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.10)",
                  color: "rgba(255,255,255,.85)",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {comentario ? (
                  modoInseguro ? (
                    
                    <div dangerouslySetInnerHTML={{ __html: comentario }} />
                  ) : (
                   
                    <div>{comentario}</div>
                  )
                ) : (
                  <span style={{ opacity: 0.4 }}>
                    El comentario recibido del servidor aparecerá aquí...
                  </span>
                )}
              </div>

              <p className="text-gray-400 text-xs leading-relaxed">
                {modoInseguro
                  ? "El HTML se inyecta directo en el DOM. Un atacante puede ejecutar JS y robar sesiones o cookies."
                  : "React convierte <script> y cualquier etiqueta en texto plano. Ningún código se ejecuta."}
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                
                title: "Renderizado Seguro",
                color: "#4ade80",
                text: (
                  <>
                    Usar <code style={{ color: "#fdba74" }}>{"{comentario}"}</code> en JSX hace que React escape
                    automáticamente cualquier HTML. Un{" "}
                    <code style={{ color: "#fdba74" }}>&lt;script&gt;</code> se muestra como texto, nunca se ejecuta.
                  </>
                ),
              },
              {
              
                title: "XSS con dangerouslySetInnerHTML",
                color: "#f87171",
                text: (
                  <>
                    <code style={{ color: "#fdba74" }}>dangerouslySetInnerHTML</code>
                    Un atacante puede robar cookies, redirigir al usuario o ejecutar código arbitrario.
                  </>
                ),
              },
              {
               
                title: "Backend: Helmet + CORS",
                color: "#fb923c",
                text: (
                  <>
                    <strong style={{ color: "#fff" }}>Helmet</strong> agrega cabeceras como{" "}
                    <code style={{ color: "#fdba74" }}>Content-Security-Policy</code>. <strong style={{ color: "#fff" }}>CORS</strong> restringe
                    el acceso solo a <code style={{ color: "#fdba74" }}>localhost:5173</code>.
                  </>
                ),
              },
            ].map(({ icon, title, color, text }) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-2xl p-7 bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-extrabold text-base" style={{ color }}>
                    {title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="h-10" />
        </div>
      </div>
    </section>
  );
}