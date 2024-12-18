import { toast } from "react-toastify";
interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
}
export default function customToastify({ message, type }: ToastProps) {
    const theme = localStorage.getItem('theme') || 'light';
    return toast(message, { autoClose: 1200, closeOnClick: true, type: type, theme: theme === 'dark' ? 'dark' : 'light' })
}