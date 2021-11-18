import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useSWRConfig } from "swr";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { searchKeyword, searchUpdater } from "../core/search";

import Link from "next/link";

export default function Index() {
  const { searchResult, isLoading, mutateSearch } = searchKeyword();

  const handleRedditSearch = (value) => {
    mutateSearch(searchUpdater({ q: value }));
  };
  if (isLoading) return <h5>fetching data</h5>;

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        height="100vh"
        alignItems="center"
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={
            searchResult && searchResult.data
              ? searchResult.data.children.map((item) => ({
                  label: item.data.display_name,
                  value: item.data.display_name_prefixed,
                }))
              : []
          }
          sx={{ width: 300 }}
          onInputChange={(props, event) => handleRedditSearch(event)}
          renderInput={(params) => (
            <TextField {...params} label="Search Reddit" />
          )}
          loading={isLoading}
          renderOption={(option, { selected }) => {
            return (
              <Box padding="5px">
                <Link href={`feed/${option.key}`}>{`r/${option.key}`}</Link>
              </Box>
            );
          }}
        />
      </Box>
    </Container>
  );
}
