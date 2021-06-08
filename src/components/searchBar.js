import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'

export function SearchBar(props) {
  const classes = useStyles()
  const [_value, setValue] = useState('')

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  const setSearch = (e) => {
    props.search(e.target.value)
  }

  const removeSearch = () => {
    setValue('')
    props.search()
  }

  return (
    <Box className={clsx(classes.searchBar, classes.customBox)}>
      <IconButton type='submit' aria-label='search'>
        {props.value && <Box className={classes.activeGlow} />}
        <SearchIcon />
      </IconButton>
      <InputBase
        value={_value}
        onChange={e => setValue(e.target.value)}
        onBlur={setSearch}
        placeholder={props.placeholder || 'Search'}
        onKeyDown={handleKeyPress}
        endAdornment={props.value && <ClearIcon className={classes.removeSearch} onClick={removeSearch} />}
      />
    </Box>
  )
}

const useStyles = makeStyles({
  searchBar: {
    height: '42px',
    width: '320px',
    background: '#231E2F',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '10px'
  },
  removeSearch: {
    opacity: '0.5',
    fontSize: '18px',
    cursor: 'pointer'
  }
});