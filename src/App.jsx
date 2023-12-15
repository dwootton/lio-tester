// App.jsx
import { createSignal } from 'solid-js';
import PageContent from './components/PageComponent';
import { IconButton } from '@suid/material';
import ArrowBackIosIcon from '@suid/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@suid/icons-material/ArrowForwardIos';

import HeaderComponent from './components/HeaderComponent';

const pages = ['PageOne', 'PageTwo']; // Add more pages as needed

// App.jsx

const App = () => {
  const [currentPage, setCurrentPage] = createSignal(0);


  const goToNextPage = () => {
    if (currentPage() < pages.length - 1) setCurrentPage(currentPage() + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage() > 0) setCurrentPage(currentPage() - 1);
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <HeaderComponent pages={pages.map((page) => page)} onPageSelect={setCurrentPage} />
      <div>
      <IconButton onClick={goToPreviousPage} disabled={currentPage() === 0}>
        <ArrowBackIosIcon />
      </IconButton>
      <PageContent page={currentPage} />
      <IconButton onClick={goToNextPage} disabled={currentPage() === pages.length - 1}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
    </div>
  );
};

export default App;
