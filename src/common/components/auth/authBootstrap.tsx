import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../api/userService";
import { useAppDispatch } from "../../../store/hooks";
import { login, logout } from "../../../store/slices/userSlice";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        dispatch(login(response.data));
      } catch {
        localStorage.removeItem("accessToken");
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
}