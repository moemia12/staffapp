import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { ImageList, ImageListItem, ImageListItemBar, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import SearchBar from './searchbox'
//import profilepic from './profilepic'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    height: 1050,
    padding: 150,
  },
  heading: {
    position: 'relative',
    left: 140,
    textAlign: 'left',
  },
  infoBar: {
    background: '	#e7eff9',
    boxShadow: '0px 7px 20px -10px rgba(0,0,0,1)',
    backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',

  },
  paginator: {
    '& > *': {
      marginLeft: theme.spacing(112),
      position: 'relative',
      bottom: 300,

    },
  },
  filterButton: {
    background: '	#e7eff9',
    boxShadow: '0px 7px 20px -10px rgba(0,0,0,1)',
    backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',
    borderRadius: 100,
    padding: 14,
    margin: theme.spacing(1),
    cursor: 'pointer',
    left: 500,
  },
  staffFilter: {
    position: 'relative',
      top: 120,
      left: 650,
  },
  staffFilterText: {
    position: 'absolute',
    left: 860,
    bottom: 30,
  }

}))

const App = () => {
  const style = useStyles();

  //Hook to initialise state
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);

  // Hook to retrieve information from API
  useEffect(() => {
    getStaff();

    async function getStaff() {
      const res = await fetch("http://interview.dev.steinias.com/api/employees");
      const data = await res.json();

      const totalStaff = data.length
      setStaff(data);
      birthdayOrder(data);
    }
  }, []);

  const birthdayOrder = (data) => {
    const ordered = data.sort()
    setFilteredStaff(ordered.slice(0, 8));
  }
  // Pagination function
  const handlePageChange = (event) => {
    const index = parseInt(event.target.innerText)
    const offset = (index - 1) * 8;
    setFilteredStaff(staff.slice(offset, offset + 8));
  }

  // Filter by ABV function
  const filterByVolume = (min, max) => {

    const filtered = staff.filter((staff) => staff.birthday >= min && staff.birthday < max);
    setFilteredStaff(filtered);
  }


  return (
    <div className="App">

      <div className={style.heading}>
      <h1>Staff Directory</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
      </div>
        
      <SearchBar></SearchBar>
  

      {/** Beer Filter */}
      <div className={style.staffFilter} style={{ zIndex: '100' }} >
        <h4 className={style.staffFilterText}>Select your Alcohol By Volume</h4>

        <span className={style.filterButton} style={{ color: 'white' }} onClick={(e) => filterByVolume(0, 5)}>Birthday Order </span>
        <span className={style.filterButton} style={{ color: 'white' }} onClick={(e) => filterByVolume(5, 10)}>Random Order</span>
  

      </div>

      {/** Staff Display */}
      <div className={style.root}>
        <p style={{ position: 'absolute', left: 150, bottom: 350, fontWeight: 'bold' }}>Showing 20 Colleague(s)</p>
        <ImageList rowHeight={390} cols={4}>

          <ImageListItem key="Subheader" cols={4} style={{ height: 'auto' }}></ImageListItem>

          {filteredStaff && filteredStaff.map((staff, index) => (
            <ImageListItem key={index}>
              <img src='./images/profilepicture.png' alt={staff.name} />
              <ImageListItemBar className={style.infoBar} title={staff.name} subtitle={<span>{staff.jobTitle}</span>} />
            </ImageListItem>
          ))}

        </ImageList>
      </div>

      {/**Pagination component */}
      <Pagination
        className={style.paginator}
        count={3}
        color="secondary"
        hideNextButton={true}
        hidePrevButton={true}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default App;
