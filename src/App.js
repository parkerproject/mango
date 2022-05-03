
import Table from './components/Table';
import { Files } from "./mock";




const columns = [
  {label: 'name', key: 'name'},
  {label: 'device', key: 'device'},
  {label: 'path', key: 'path'},
  {label: 'status', key: 'status'}
]

function App() {
  return (
    <Table data={Files} column={columns} />
  );
}

export default App;
