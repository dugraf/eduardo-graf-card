import Dock from './components/react-bits/dock/Dock'; 
import LightRays from './components/react-bits/light-rays/LightRays';
// Importe os ícones (você vai precisar instalar: npm install react-icons)
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc";

function App() {
  // 1. Defina os itens do Dock aqui dentro
  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => console.log('Home!') },
    { icon: <VscArchive size={18} />, label: 'Projetos', onClick: () => console.log('Arquivos!') },
    { icon: <VscAccount size={18} />, label: 'Sobre', onClick: () => console.log('Perfil!') },
    { icon: <VscSettingsGear size={18} />, label: 'Contato', onClick: () => console.log('Config!') },
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
      
      {/* 2. LightRays como fundo ou destaque */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#b658d0"
          raysSpeed={0.5}
          lightSpread={0.5}
          rayLength={2}
          pulsating
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex flex-col items-center p-10">
        <h1 className="text-4xl font-bold mb-10">Portfolio Eduardo Rodrigues Graf</h1>
        
        <div className="w-full max-w-md p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 backdrop-blur-md">
          <h2 className="text-xl font-bold text-purple-400">Projeto: App de Nutrição</h2>
          <p className="text-zinc-400 mt-2">Desenvolvido com Java e React.</p>
        </div>
      </div>

      {/* 3. Dock com os items passados corretamente */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <Dock 
          items={dockItems}
          panelHeight={70}
          baseItemSize={50}
          magnification={60}
        />
      </div>
    </div>
  );
}

export default App;