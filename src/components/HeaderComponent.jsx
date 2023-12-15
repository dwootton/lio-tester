import { AppBar, Toolbar, Typography, Button } from '@suid/material';

const HeaderComponent = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {props.pages.map((page, index) => (
          <Button key={index} color="inherit" onClick={() => props.onPageSelect(index)}>
            {page}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};



export default HeaderComponent;
