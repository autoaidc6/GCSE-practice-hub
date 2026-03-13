/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Science from './pages/Science';
import Maths from './pages/Maths';
import English from './pages/English';
import Tech from './pages/Tech';
import Spanish from './pages/Spanish';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="science" element={<Science />} />
          <Route path="maths" element={<Maths />} />
          <Route path="english" element={<English />} />
          <Route path="tech" element={<Tech />} />
          <Route path="spanish" element={<Spanish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
