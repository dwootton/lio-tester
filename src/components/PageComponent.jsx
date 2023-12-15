import { createEffect,createSignal } from 'solid-js';
import PageOne from '../PageOne';
import PageTwo from '../PageTwo';
const pages = [PageOne, PageTwo]; // Add more pages as needed
import { Typography } from '@suid/material';

export default  ({ page }) => {

    const [pageContent,setPageContent] = createSignal(pages[page()]);
    createEffect(() => {
      console.log('changing page',page())
      document.querySelector('#vis').innerHTML = '';
      setPageContent(pages[page()])
    })
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="h5">{page}</Typography>
        {pageContent}
        {/* Add more content here as per your requirement */}
      </div>
    );
  };
  