import { Page, Grid } from "@geist-ui/react";
import DecryptCard from "../decrypt-card";
import EncryptCard from "../encrypt-card";

const Home = () => {
  return (
    <>
      <Page width="850px">
        <Page.Header>
          <h2>Secret 1s bett3r.</h2>
        </Page.Header>
        <Page.Content>
          {/* <h2>Hello, Everyone.</h2>
          <p>This is a simulated page, you can click anywhere to close it.</p> */}

          <Grid.Container gap={2} justify="center" height="100px">
            <Grid xs={24} sm={12}>
              <EncryptCard />
            </Grid>
            <Grid xs={24} sm={12}>
              <DecryptCard />
            </Grid>
          </Grid.Container>
        </Page.Content>
        {/* <Page.Footer>
          <h4>Hans Vergara Dev</h4>
        </Page.Footer> */}
      </Page>
    </>
  );
};

export default Home;
