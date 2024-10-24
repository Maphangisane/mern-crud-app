import React, { useContext } from 'react';
import { TextField, Button } from '@mui/material';
import { SearchContext } from '../contexts/SearchContext';

function SearchBar() {
	const { searchQuery, setSearchQuery } = useContext(SearchContext);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div>
			<TextField
				label="Search"
				variant="outlined"
				value={searchQuery}
				onChange={handleSearch}
				style={{ marginRight: '10px' }}
			/>
			<Button variant="contained" color="primary">
				Search
			</Button>
		</div>
	);
}

export default SearchBar;