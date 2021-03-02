import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import {
  H1,
  Wrapper,
  TitleWrapper,
  StyledLink,
  Center,
  StyledSpan,
  TableHeader,
  StyledUl,
  StyledDiv,
} from './styles/styledComponents';
import PersonIcon from '@material-ui/icons/Person';
import { Loading } from 'react-loading-wrapper';
import 'react-loading-wrapper/dist/index.css';

function Home() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/api/test/`);
      console.log(data)
      setTests(data);
      setLoading(false);
    })();
  }, []);

  return (
      <>
    <Wrapper width='80%'>
    <Center>
        <TitleWrapper>
          <H1>All Tests</H1>
        </TitleWrapper>
        <br />
    </Center>
    <Loading loading={loading} size={30}>
        <StyledUl>
          {tests && (
            <li>
              <TableHeader repeatFormula='1fr 1.5fr 1fr 1fr 1fr 1fr'>
                <StyledSpan weight='bold'>Name</StyledSpan>
                <StyledSpan weight='bold'>Writer</StyledSpan>
                <StyledSpan weight='bold'>Created at</StyledSpan>
                <StyledSpan weight='bold'>Feature</StyledSpan>
                <StyledSpan weight='bold'>location</StyledSpan>
                <StyledSpan weight='bold'>Environment</StyledSpan>
              </TableHeader>
            </li>
          )}
          {tests &&
            tests.map((test) => (
              <li>
                <StyledDiv repeatFormula='1fr 1.5fr 1fr 1fr 1fr 1fr'>
                  <StyledSpan weight='bold'>
                    {test.name}
                  </StyledSpan>
                  <StyledSpan>{test.writer}</StyledSpan>
                  <StyledSpan>{test.createdAt}</StyledSpan>
                  <StyledSpan>{test.feature}</StyledSpan>
                  <StyledSpan>{test.appLocation}</StyledSpan>
                  <StyledSpan>{test.environment}</StyledSpan>
                </StyledDiv>
              </li>
            ))}
        </StyledUl>
      </Loading>
    </Wrapper>
    </>
  );
}

export default Home;