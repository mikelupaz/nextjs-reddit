import React, { useState } from "react";

export default ({ keyword }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchResult.data.children.map((item) => ({
        label: item.data.display_name,
        value: item.data.display_name_prefixed,
      }))}
      sx={{ width: 300 }}
      onInputChange={(props, event) => handleRedditSearch(event)}
      renderInput={(params) => <TextField {...params} label="Search Reddit" />}
      renderOption={(option, { selected }) => {
        return (
          <Box padding="2px">
            <Link href={`feed/${option.key}`}>{`r/${option.key}`}</Link>
          </Box>
        );
      }}
    />
  );
};
