import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header id="header-page">

      <table>
        <tbody>
          <tr>
            <td><img src="logo.png" alt="Anritsu Logo" /></td>
            <td><h2>Anritsu PIM Analyzer Automation GUI</h2>
              <nav>
                <button><a href="/">Connection</a></button>
                <button><Link to="/command">SCPI Commands</Link></button>
                <button><Link to="/pim">PIM Mode</Link></button>
                <button><Link to="/autotest">Auto Test</Link></button>
              </nav></td>
          </tr>
        </tbody>
      </table>

      <hr />
    </header>
  )
}

export default Header;
