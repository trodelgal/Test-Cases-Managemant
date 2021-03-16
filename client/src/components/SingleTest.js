import React, { useCallback, useEffect, useState } from "react";
import List from "@material-ui/core/List";
import EmailIcon from "@material-ui/icons/Email";
import { Button } from '@material-ui/core';
import {
  H1,
  Wrapper,
  TitleWrapper,
  Center,
  GridDiv,
} from "./styles/styledComponents";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import DialpadIcon from "@material-ui/icons/Dialpad";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import { Loading } from "react-loading-wrapper";
import "react-loading-wrapper/dist/index.css";
import Swal from "sweetalert2";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { SingleListItem } from "./SingleListItem";
import StepsTable from "./tables/StepsTable";
import DataTable from "./tables/DataTable";
import PrerequisitesTable from "./tables/PrerequisitesTable";
import AppsIcon from '@material-ui/icons/Apps';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WbAutoIcon from '@material-ui/icons/WbAuto';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import EcoIcon from '@material-ui/icons/Eco';

function SingleTest() {
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  const getTest = useCallback(async () => {
    const { data } = await Axios.get(
      `/api/test/${id}`
    );
    setTest(data);
    setLoading(false);
  }, [id, setTest, setLoading]);
  const deleteTest = async () => {
    await Axios.patch("/api/test/delete", { testId: id });
    history.push("/")
  }

  useEffect(() => {
    try {
      getTest();
    } catch (error) {
      Swal.fire("Error Occurred", error.message, "error");
    }
  }, []);

  return (
    <>
      <Wrapper width="80%">
        <Center>
          <TitleWrapper>
            <H1>Test Info</H1>
          </TitleWrapper>
        </Center>
        <Loading size={30} loading={loading}>
          <GridDiv repeatFormula="1.5fr 2fr">
            <List>
              <SingleListItem
                primary="Name"
                secondary={
                  test.name
                }
              >
                <AppsIcon/>
              </SingleListItem>
              <SingleListItem primary="Writer" secondary={test.writer}>
                <PersonIcon />
              </SingleListItem>
              <SingleListItem
                primary="Sprint"
                secondary={
                  test.sprint
                }
              >
                <DirectionsRunIcon />
              </SingleListItem>
              <SingleListItem primary="Description" secondary={test.description}>
                <DescriptionIcon />
              </SingleListItem>
              <SingleListItem
                primary="Happend"
                secondary={test.hapend}
              >
                <DoneAllIcon />
              </SingleListItem>
              <SingleListItem
                primary="Pass"
                secondary={test.pass ? "true" : "false"}
              >
                <CheckCircleOutlineIcon />
              </SingleListItem>
              <SingleListItem
                primary="Automatic"
                secondary="No"
              >
                <WbAutoIcon />
              </SingleListItem>
              <SingleListItem
                primary="App Location	"
                secondary={test.appLocation}
              >
                <DesktopMacIcon />
              </SingleListItem>
              <SingleListItem
                primary="Environment"
                secondary={test.environment}
              >
                <EcoIcon />
              </SingleListItem>
            </List>
            <div>
              <PrerequisitesTable rows={test.Perequisites} deleted={getTest} />
              <DataTable data={test.Data} deleted={getTest} />
            </div>
          </GridDiv>
          <StepsTable steps={test.Steps} deleted={getTest} />
          <br/>
          <br/>
          <Center>
            <Button onClick={deleteTest}>DELETE</Button>
            <Button>EDIT</Button>
          </Center>
        </Loading>
      </Wrapper>
    </>
  );
}

export default SingleTest;