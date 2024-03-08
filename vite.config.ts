import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({server :{
  watch:{
    usePolling: true,
    
  },
},
  plugins: [react()],
 
});
