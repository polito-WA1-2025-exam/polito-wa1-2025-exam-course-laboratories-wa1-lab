import { useState } from 'react';
import { fetchData, postData } from './api';
import usePokeStore from '../store/usePokeStore';

export function usePokeService() {
    const {
        setOrders,
        setBases,
        setIngredients,
        setProteins,
        setPortions
    } = usePokeStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProteins = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/assets/proteins');
            setProteins(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchPortions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/assets/portions');
            setPortions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchBases = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/assets/bases');
            setBases(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchIngredients = async () => {
        setLoading(true);
        try {
            const data = await fetchData('/assets/ingredients');
            setIngredients(data);
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/orders');
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const createPoke = async (pokeData) => {
        setLoading(true);
        setError(null);
        try {
            const newPoke = await postData('/poke', pokeData);
            return newPoke;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    const createOrder = async (orderData) => {
        setLoading(true);
        setError(null);
        try {
            const newOrder = await postData('/order', orderData);
            return newOrder;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchProteins,
        fetchPortions,
        fetchBases,
        fetchOrders,
        fetchIngredients,
        createOrder,
        createPoke,
        loading,
        error,
    };
}
