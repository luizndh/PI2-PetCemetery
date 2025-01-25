import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import AdquirirJazigo from './pages/AdquirirJazigo';
import AgendarEnterro from './pages/AgendarEnterro';
import AgendarExumacao from './pages/AgendarExumacao';
import AgendarLembrete from './pages/AgendarLembrete';
import AgendarReuniao from './pages/AgendarReuniao';
import AlterarHorarioFuncionamento from './pages/AlterarHorarioFuncionamento';
import AlterarPerfil from './pages/AlterarPerfil';
import Cadastro from './pages/Cadastro';
import ClientesInadimplentes from './pages/ClientesInadimplentes';
import CompraAlugaJazigo from './pages/CompraAlugaJazigo';
import ComprarOrnamento from './pages/ComprarOrnamento';
import ConfirmarCompra from './pages/ConfirmarCompra';
import Contato from './pages/Contato';
import ContratacaoPlanos from './pages/ContratacaoPlanos';
import DesativarConta from './pages/DesativarConta';
import DetalharJazigos from './pages/DetalharJazigos';
import ExibirPerfil from './pages/ExibirPerfil';
import Historico from './pages/Historico';
import Home from './pages/Home';
import HomeAdmin from './pages/HomeAdmin';
import Login from './pages/Login';
import ManterServicos from './pages/ManterServicos';
import PaginaInicial from './pages/PaginaInicial';
import PersonalizarJazigo from './pages/PersonalizarJazigo';
import QuemSomos from './pages/QuemSomos';
import RealizarDoacoes from './pages/RealizarDoacoes';
import RelatorioInadimplente from './pages/RelatorioInadimplente';
import RelatorioSelecao from './pages/RelatorioSelecao';
import VerMapaJazigos from './pages/VerMapaJazigos';
import VisualizarDespesas from './pages/VisualizarDespesas';
import VisualizarEnterros from './pages/VisualizarEnterros';
import VisualizarExumacoes from './pages/VisualizarExumacoes';
import VisualizarJazigos from './pages/VisualizarJazigos';
import VisualizarReuniao from './pages/VisualizarReuniao';
import reportWebVitals from './reportWebVitals';
import TimeSkip from './pages/TimeSkip';

//TODO já criar o esqueleto de TODAS as paginas possiveis

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {children}
    </LocalizationProvider>
  );
}

const paginas = createBrowserRouter([

  {
    path: "/",
    element: <PaginaInicial />
  }
  , {
    path: "/PaginaInicial",
    element: <PaginaInicial />
  }
  , {
    path: "/ManterServicos",
    element: <ManterServicos />
  }
  , {
    path: "/AgendarExumacao",
    element: <AgendarExumacao />
  }
  , {
    path: "/AgendarEnterro",
    element: <AgendarEnterro />
  }
  , {
    path: "/VisualizarEnterros",
    element: <VisualizarEnterros />
  }
  , {
    path: "/VisualizarExumacoes",
    element: <VisualizarExumacoes />
  }
  , {
    path: "/VisualizarJazigos",
    element: <VisualizarJazigos />
  }
  , {
    path: "/VerMapaJazigos",
    element: <VerMapaJazigos />
  }
  , {
    path: "/DetalharJazigos",
    element: <DetalharJazigos />
  }
  , {
    path: "/ClientesInadimplentes",
    element: <ClientesInadimplentes />
  }
  , {
    path: "/Historico",
    element: <Historico />
  }
  , {
    path: "/PersonalizarJazigo",
    element: <PersonalizarJazigo />
  }
  , {
    path: "/Contato",
    element: <Contato />
  }
  , {
    path: "/ContratacaoPlanos",
    element: <ContratacaoPlanos />
  }
  , {
    path: "/Login",
    element: <Login />
  }
  , {
    path: "/Cadastro",
    element: <Cadastro />
  }
  , {
    path: "/ExibirPerfil",
    element: <ExibirPerfil />
  }
  , {
    path: "/AlterarPerfil",
    element: <AlterarPerfil />
  }
  , {
    path: "/DesativarConta",
    element: <DesativarConta />
  }
  , {
    path: "/AdquirirJazigo",
    element: <AdquirirJazigo />
  }
  , {
    path: "/VisualizarDespesas",
    element: <VisualizarDespesas />
  }
  , {
    path: "/AlterarHorarioFuncionamento",
    element: <AlterarHorarioFuncionamento />
  }
  , {
    path: "/AgendarLembrete",
    element: <AgendarLembrete />
  }
  , {
    path: "/AgendarReuniao",
    element: <AgendarReuniao />
  }
  , {
    path: "/RealizarDoacoes",
    element: <RealizarDoacoes />
  }
  , {
    path: "/ComprarOrnamento",
    element: <ComprarOrnamento />
  }
  , {
    path: "/VisualizarReuniao",
    element: <VisualizarReuniao />
  }
  , {
    path: "/CompraAlugaJazigo",
    element: <CompraAlugaJazigo />
  }
  , {
    path: "/QuemSomos",
    element: <QuemSomos />
  }
  , {
    path: "/ConfirmarCompra",
    element: <ConfirmarCompra />
  }
  , {
    path: "/HomeAdmin",
    element: <HomeAdmin />
  }
  , {
    path: "/Home",
    element: <Home />
  }
  , {
    path: "/RelatorioInadimplente",
    element: <RelatorioInadimplente />
  }
  , {
    path: "/RelatorioSelecao",
    element: <RelatorioSelecao />
  }
  , {
    path: "/TimeSkip",
    element: <TimeSkip />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <App>
    <RouterProvider router={paginas} />
  </App>

);

reportWebVitals();
