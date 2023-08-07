export const formatDate = (date) => {
  const newDate = new Date(date);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return newDate.toLocaleDateString("es-ES", opciones);
};
