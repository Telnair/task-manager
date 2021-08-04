import { Box, FormControl, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { sortTypeOptions, statusOptions } from '../../consts';
import { SortType, TaskStatus } from '../../entities';

interface FiltersProps {
  filterBy: TaskStatus | undefined;
  setFilterBy: (filterBy: TaskStatus | undefined) => void;
  searchStr: string;
  setSearchStr: (searchStr: string) => void;
  sortType: SortType;
  setSortType: (sortType: SortType) => void;
}

export const Filters: React.FC<FiltersProps> = (props) => {
  const { filterBy, setFilterBy, searchStr, setSearchStr, sortType, setSortType } = props;

  const handleSearchStrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  };

  const handleFilterByChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilterBy(e.target.value as TaskStatus);
  };

  const handleSortTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSortType(e.target.value as SortType);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      my={3}
    >
      <Box mr={2}>
        <Typography variant="h5">
          Filters:
        </Typography>
      </Box>
      <TextField
        variant="outlined"
        label="Search"
        value={searchStr}
        onChange={handleSearchStrChange}
      />
      <Box mx={2}>
        <FormControl variant="outlined">
          <Select
            labelId="filterBy-label"
            id="filterBy"
            value={filterBy}
            onChange={handleFilterByChange}
            displayEmpty
          >
            <MenuItem value={undefined}>All</MenuItem>
            {statusOptions.map(status => (
              <MenuItem value={status.value} key={status.value}>{status.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControl variant="outlined">
        <Select
          labelId="sortBy-label"
          id="sortBy"
          value={sortType}
          onChange={handleSortTypeChange}
        >
          {sortTypeOptions.map(option => (
            <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};