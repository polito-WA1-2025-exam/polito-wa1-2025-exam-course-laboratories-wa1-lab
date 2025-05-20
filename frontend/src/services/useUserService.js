import { useState, useEffect } from 'react';
import { fetchData } from './api';
import useUserStore from '../store/useUserStore';

export function useUserService() {
    const { setUser, setUserOrders } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/user/profile');
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/user/orders');
            setUserOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchUserProfile,
        fetchUserOrders,
        loading,
        error,
    };
}