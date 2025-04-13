import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),
  initializeTheme: () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    set({ theme: savedTheme });
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
}));
