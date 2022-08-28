import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './features/Auth/Login';
import { Register } from './features/Auth/Register';
import { AuthContextProvider } from './features/Auth/AuthContext';
import { EditAdmin } from './features/Admin/EditAdmin';
import { CustomerList } from './features/Customers/CustomerList';
import { CustomerDetails } from './features/Customers/CustomerDetails';
import { AddCustomer } from './features/Customers/AddCustomer';
import { NotFound } from './features/NotFound/NotFound';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admins/edit/:adminId" element={<EditAdmin />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route
            path="/customers/edit/:customerId"
            element={<CustomerDetails />}
          />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export { App };
