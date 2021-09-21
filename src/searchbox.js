import React from 'react'
import { ImageList, ImageListItem, ImageListItemBar, makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';


const useStyles = makeStyles((theme) => ({
    root: {
      overflow: 'hidden',
      height: 1050,
      padding: 150,
    },
    searchbox: {
        background: '#F0F0F0',
        boxShadow: '0px 1px 10px -10px rgba(0,0,0,1)',
        backgroundColor: '#F0F0F0',
        backgroundImage: 'linear-gradient(315deg, #F0F0F0 0%, #F0F0F0 74%)',
        height: 200,
    },
    form: {
        position: 'relative',
        right: 610,
        top: 30, 
    },
    input: {
        height: 40,
        width: 320,
    }

  }))

const SearchBar = () => {
const style = useStyles();

return(
    <div className={style.searchbox}>
    <form className={style.form} action="/" method="get">
        <label htmlFor="header-search">
        <h3 style={{ position: 'relative', right: 123, top: 15}}>Filter Colleagues</h3>
        </label>
        <input
            className={style.input}
            type="text"
            id="header-search"
            placeholder="Search Employees"
            name="s" 
        />
        <Button color='primary' type="submit">{<SearchIcon/>}</Button>
    </form>
    </div>
)
};

export default SearchBar;