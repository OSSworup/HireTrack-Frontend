import { toast, type ToastOptions, type Id } from "react-toastify";

const defaultOpts: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export function useToast() {
    const success = (msg: string, opts?: ToastOptions) => toast.success(msg, { ...defaultOpts, ...opts });
    const error = (msg: string, opts?: ToastOptions) => toast.error(msg, { ...defaultOpts, ...opts });
    const info = (msg: string, opts?: ToastOptions) => toast.info(msg, { ...defaultOpts, ...opts });
    const warn = (msg: string, opts?: ToastOptions) => toast.warn(msg, { ...defaultOpts, ...opts });

  // returns the toast id so it can be updated later
  const loading = (msg: React.ReactNode = "Processing..."): Id =>
    toast.loading(msg, { ...defaultOpts, autoClose: false });

  // update expects the id and partial ToastOptions (and supports `render`, `type`, `isLoading`)
  const update = (
    id: Id,
    options: Partial<ToastOptions & { render?: React.ReactNode; isLoading?: boolean; type?: "info" | "success" | "warning" | "error" }>
  ) => toast.update(id, options);

  const dismiss = (id?: Id) => toast.dismiss(id);

    return { success, error, info, warn, loading, update, dismiss };
}
