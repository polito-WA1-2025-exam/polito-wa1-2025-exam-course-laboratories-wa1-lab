
import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: null,
    userOrders: [],

    setUser: (user) => set({ user }),
    setUserOrders: (orders) => set({ userOrders: orders }),
}));

export default useUserStore;