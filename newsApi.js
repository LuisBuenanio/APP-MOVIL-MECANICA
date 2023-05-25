export const getNews = async () => {
    try {
      const datos = await fetch('http://100.25.182.199/api/noticias');
      const data = await datos.json();
      return datos;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  