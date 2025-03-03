export const getCurrentDate = () => {
  const now = new Date(); 
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear(); 
  return `${year}-${month}-${day}`;
}