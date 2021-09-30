import React from "react";
import { Grid, Button, Text } from "../elements";
const Header = (props) => {
  return (
    <Grid is_flex padding="0px 16px;" margin="10px 0;">
      <Text size="26px" bold>
        logo
      </Text>
      <Grid is_flex justify="end">
        <Button padding="13px 17px" fontSize="12px">
          회원가입
        </Button>
        <Button padding="13px 17px" fontSize="12px" margin="0 0 0 10px">
          로그인
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
