import ErrorMessage from '../Error';

interface UserData {
    id: number;
    email: string;
    name: string;
    role: string;
  }

interface AdminRouteProps {
    children: React.ReactNode;
  }
  
export function AdminRoute({ children }: AdminRouteProps) {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedUserData = localStorage.getItem("userData");
    const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;

    if (userData?.role === 'admin' && loggedIn) {
        return <>{children}</>;
    } else {
        return <><ErrorMessage message="Apparently you don't have permission to access this page." /></>;
    }; 
};
