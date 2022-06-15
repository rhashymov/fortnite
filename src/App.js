import './App.css';
import 'antd/dist/antd.css';
import SearchItems from './cmp/Search/Search';
import PaginatedItems from './cmp/Cosmetics/Cosmetics';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
       <PaginatedItems />
      </div>
    </div>

  );
}

export default App;
