import { useAuthCtx } from "../context/AuthProvider";

export default function useAuth() {
  return useAuthCtx();
}
