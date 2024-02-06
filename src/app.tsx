import logo from './assets/react-notes-logo.svg';

export function App() {
  return (
    <div>
      <img src={logo} />
      <input placeholder="Search notes..." type="text" />
    </div>
  );
}
