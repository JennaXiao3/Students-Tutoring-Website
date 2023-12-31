import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useLanguageContext } from '../context/LangContext';
import Image from 'next/image'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import Link from 'next/link';
import styles from '../styles/Navbar.module.scss';

const navItemsEnglish = ['Home', 'Courses', 'Events', 'Calendar', 'Contact'];
const navItemsChinese = ['主页', '课程', '事件', '日历', '联系'];
const navLink = ['/', '/Courses', '/Events', '/Calendar', '/Contact'];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const lang = useLanguageContext().language; // True means English and False means Chinese
  const changeLang = useLanguageContext().setLanguage;

  let navItems = navItemsEnglish;

  if(!lang) {
    navItems = navItemsChinese;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeLanguage = () => {
    if(lang) {
      changeLang(false);
    } else {
      changeLang(true);
    }
  } 

  // Mobile Navbar Drawer
  const drawer = (
    <Box>
      <Image src="/images/mobileNavBubblesLeft.svg" layout="raw" width={100} height={100} className={styles.mobileNavBubblesLeft}></Image>
      <Image src="/images/mobileNavBubblesRight.svg" layout="raw" width={100} height={100} className={styles.mobileNavBubblesRight}></Image>
      
      <Grid container direction="row-reverse">
        <Grid container item xs="auto" alignItems="center">
          <IconButton aria-label="delete" sx={{paddingX: '1.5rem'}} onClick={handleDrawerToggle}>
            <CloseRoundedIcon sx={{color: 'white'}}/>
          </IconButton>
        </Grid>
        <Grid item xs>
        <Typography variant="h6" className={styles.logo} sx={{ my: 2, mx: '2rem'}}>
          {lang ? 'Students to Students Tutoring' : '学生学习辅导'}
        </Typography>
        </Grid>
      </Grid>
      {/* <Divider /> */}
      <List sx={{position: 'absolute', top: '50%;', transform: 'translateY(-50%)', width: '100vw'}}>
        {navItems.map((item, index) => (
          <Link key={item} href={`${navLink[index]}`} >
            <ListItem disablePadding sx={{paddingTop: '1rem', paddingBottom: '1rem'}} onClick={handleDrawerToggle}>
              <ListItemButton sx={{display: 'flex', justifyContent: 'center'}}>
                  <a className={styles.navTitleMobile}>
                    {item}
                  </a>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', position: 'absolute'}}>

      {/* Desktop Navbar */}
      <AppBar component="nav" className={styles.navbar}>
        <Toolbar sx={{paddingLeft: 'none'}}>
          {/* Hamburger Menu */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, flexGrow: 1, display: { sm: 'none' }, justifyContent:'flex-start'}}
            className={styles.navTitleDesktop}
          >
            <MenuIcon />
          </IconButton>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, margin: 0, display: { xs: 'none', sm: 'block' }}}>
            <Image src={'/images/logo.svg'} layout="raw" width={100} height={50} className={`${styles.logo} ${styles.logoImage}`}/>
          </Box>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Link key={item} href={`${navLink[index]}`}>
                <Button className={styles.navTitleDesktop}>
                    <a>
                      {item}
                    </a>
                </Button>
              </Link>
            ))}
          </Box>
          <Box onClick={changeLanguage} className={styles.toggle}>
            <Grid container className={styles.languageToggle}>
              <Grid item xs={6} className={styles.china} sx={lang ? {opacity: 0.5} : {opacity: 1}}></Grid>
              <Grid item xs={6} className={styles.canada} sx={!lang ? {opacity: 0.5} : {opacity: 1}}></Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Mobile Navbar */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' }, 
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', backgroundColor: '#11999E'},
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />    
      </Box>
    </Box>
  );
}

export default Navbar;
