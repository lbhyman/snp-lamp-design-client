import React from 'react';
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';


const Header = () => {

    return (
        <header style = {{width:"100%"}}>
            <AppBar className='header' position='sticky'>
                <Toolbar className='toolbar'>
                    <Typography variant="h6" component="h1">SNP-LAMP DESIGNER</Typography>
                    <div>
                        <Button {...{key: 'Home', color: 'inherit', to: '/', component: Link, className: 'headerButton'}}>Home</Button>
                        <Button {...{key: 'About', color: 'inherit', to: '/about', component: Link, className: 'headerButton'}}>About</Button>
                        {/* <Button {...{key: 'Tutorial', color: 'inherit', to: '/tutorial', component: Link, className: 'headerButton'}}>Tutorial</Button> */}
                    </div>
                </Toolbar>
            </AppBar> 
        </header>
    );
};

export default Header;