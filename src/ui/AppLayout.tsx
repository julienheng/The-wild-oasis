import { Outlet } from "react-router-dom";
import styled from "styled-components";

//COMPONENTS
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />

      {/*This is where the child routes will be rendered */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
