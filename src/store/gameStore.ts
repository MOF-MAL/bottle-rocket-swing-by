import { create } from 'zustand';
import { Rocket } from '@/types/Rocket';
import { Planet } from '@/types/Planet';

interface GameState {
    launched: boolean;
    LaunchRocket: () => void;
    rocket: Rocket | null;
    CreateRocket: (rocket: Rocket) => void;
    setRocketState: (rocketState: Rocket['rocketState']) => void;

    planets: Planet[];
    CreatePlanet: (planets: Planet[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
    launched: true,
    LaunchRocket: () => set((state) => ({ launched: true })),
    // --- 使用できるようになってから、ロケットを作る関数を呼び出す ---
    rocket: null,
    CreateRocket: (rocket) => {
        set((state) => ({ rocket: rocket }));
    },
    setRocketState: (rocketState) => set((state) => ({
        rocket: state.rocket ? { ...state.rocket, rocketState } : null
    })),
    planets: [],
    CreatePlanet: (planets) => set((state) => ({ planets: [...state.planets, ...planets] }))
}));