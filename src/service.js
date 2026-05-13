import axios from 'axios';

// הגדרת כתובת ה-API הבסיסית לשרת שלנו
axios.defaults.baseURL = "http://localhost:5022"; 

// הוספת Interceptor לתפיסת שגיאות ורישום ללוג
axios.interceptors.response.use(
  response => response, // אם הכל תקין, פשוט מחזירים את התשובה
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  // שליפת כל המשימות
  getTasks: async () => {
    const result = await axios.get(`/items`);    
    return result.data;
  },

  // הוספת משימה חדשה
  addTask: async (name) => {
    const result = await axios.post(`/items`, { name, isComplete: false });
    return result.data;
  },

  // עדכון משימה (סימון כבוצע/לא בוצע)
  setCompleted: async (id, isComplete) => {
    await axios.put(`/items/${id}`, { isComplete });
    return {};
  },

  // מחיקת משימה
  deleteTask: async (id) => {
    await axios.delete(`/items/${id}`);
    return {};
  }
};
