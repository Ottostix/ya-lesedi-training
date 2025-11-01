import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Stores from "./pages/Stores";
import Menus from "./pages/Menus";
import Quizzes from "./pages/Quizzes";
import TrainingModules from "./pages/TrainingModules";
import Home from "./pages/Home";
import AIQuizGeneration from "./pages/AIQuizGeneration";
import RoleManagement from "./pages/RoleManagement";
import NotFound from "./pages/NotFound";
import { RBACProvider } from "./contexts/RBACContext";
import { useState, useEffect } from "react";

const API_BASE_URL = 'https://ya-lesedi-backend.onrender.com/api';

function Router({ isAuthenticated, currentUser, onLogout }: any) {
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/login"} component={Login} />
        <Route component={Home} />
      </Switch>
    );
  }

  return (
    <RBACProvider>
      <Switch>
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/"} component={Dashboard} />
      <Route path={"/users"} component={Users} />
      <Route path={"/stores"} component={Stores} />
      <Route path={"/menus"} component={Menus} />
      <Route path={"/quizzes"} component={Quizzes} />
      <Route path={"/training-modules"} component={TrainingModules} />
      <Route path={"/ai-quiz-generator"} component={AIQuizGeneration} />
      <Route path={"/role-management"} component={RoleManagement} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </RBACProvider>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      // Check if token exists (local authentication)
      if (token) {
        const user = localStorage.getItem('user');
        if (user) {
          setCurrentUser(JSON.parse(user));
          setIsAuthenticated(true);
        } else {
          handleLogout();
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router 
            isAuthenticated={isAuthenticated} 
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

