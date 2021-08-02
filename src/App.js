import logo from './logo.svg';
import './App.css';
import AccountsTable from './components/AccountsTable.js'
import  'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
function App() {
  return (
    <div className="App">
    <AccountsTable></AccountsTable>
    </div>
  );
}

export default App;
