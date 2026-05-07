export const formatDate = (val: Date): string => {

  const result = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(val)
  .replace(' a. m.', ' am')
  .replace(' p. m.', ' pm');


  console.log(result);
  return result;
}