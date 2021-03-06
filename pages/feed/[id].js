import React from "react";
import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getHotPost } from "core/feed";

export default () => {
  const { hotPost, isLoading } = getHotPost();

  if (isLoading) return <h5>fetching data</h5>;

  const handleClickPost = ({ title, selftext_html, ...rest }) => {};
  if (!hotPost.data) return <h5>No Post Available</h5>;
  return (
    <Container maxWidth="md">
      {hotPost.data &&
        hotPost.data.children.map((child) => {
          return (
            <Box
              flexDirection="row"
              display="flex"
              style={{ border: "1px solid #ccc" }}
              margin="10px"
            >
              <Box
                display="flex"
                padding="10px"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="body1">{child.data.ups || 0}</Typography>
              </Box>
              <Box display="flex" padding="10px" flexDirection="column">
                <Typography variant="caption">{`Posted by u/${child.data.author}`}</Typography>
                <Box>
                  <Typography
                    variant="h6"
                    // onClick={() => handleClickPost(child.data)}
                  >
                    {child.data.title}
                  </Typography>
                </Box>
                <Typography variant="caption">{`${child.data.num_comments} comments`}</Typography>
              </Box>
            </Box>
          );
        })}
      ;
    </Container>
  );
};
