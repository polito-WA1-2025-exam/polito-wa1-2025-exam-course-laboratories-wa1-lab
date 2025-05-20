import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const state = (set) => ({
    bases: [],
    ingredients: [],
    proteins: [],
    portions: [],

    orders: [],
    draftOrder: [],
    draftPoke: {
        base: '',
        portion: {},
        proteins: [],
        ingredients: [],
    },
    isCreateModalOpen: false,

    setOrders: (orders) => set({ orders }),
    setDraftOrder: (order) => set({ draftOrder: order }),
    updatedraftPoke: (field, value) => set((state) => ({
        draftPoke: { ...state.draftPoke, [field]: value }
    })),
    resetdraftPoke: () => set({
        draftPoke: {
            base: '',
            portion: {},
            proteins: [],
            ingredients: [],
        }
    }),
    setCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),
    setBases: (bases) => set({ bases: bases }),
    setIngredients: (ingredients) => set({ ingredients: ingredients }),
    setProteins: (proteins) => set({ proteins: proteins }),
    setPortions: (portions) => set({ portions: portions }),

});

export const usePokeStore = create()(
    persist(
        state,
        {
            name: 'poke-store', // name of the item in the storage (must be unique)
        },
    ),
)
export default usePokeStore;