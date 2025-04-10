import { create } from 'zustand';

interface JokeState {
  joke: any | null;
  isLoading: boolean;
  error: string | null;
  isLaughing: boolean;
  fadingIn: boolean;
  currentImage: string;
  fetchJoke: () => Promise<void>;
  resetLaughState: () => void;
  setFadingIn: (value: boolean) => void;
  setCurrentImage: (value: string) => void;
}

export const useJokeStore = create<JokeState>((set) => {
  // Create a simple timer function
  const startLaughTimer = () => {
    const timer = window.setTimeout(() => {
      set({ isLaughing: false });
    }, 5000);
    return timer;
  };

  return {
    joke: null,
    isLoading: false,
    error: null,
    isLaughing: false,
    fadingIn: false,
    currentImage: "/comedian_bear.png",
    
    resetLaughState: () => {
      set({ isLaughing: false });
    },
    
    setFadingIn: (value: boolean) => set({ fadingIn: value }),
    setCurrentImage: (value: string) => set({ currentImage: value }),
    
    fetchJoke: async () => {
      set({ isLoading: true, error: null, isLaughing: false });
      
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        
        if (!response.ok) {
          throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        set({ joke: data, isLoading: false, isLaughing: true });
        startLaughTimer();
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : 'An unknown error occurred', 
          isLoading: false,
          isLaughing: false
        });
      }
    }
  };
});