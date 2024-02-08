import logo from '../assets/react-notes-logo.svg';

export function Logo() {
  return (
    <a
      className="block w-fit"
      href="https://github.com/felipefa/react-notes"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img alt="React Notes Logo" src={logo} />
    </a>
  );
}
