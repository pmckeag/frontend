import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  CardTitle,
  CardText,
  FormFeedback
} from "reactstrap";
import axios from "axios";
import {proxy} from "../utils/constants"
function CreateCluster() {
  const [clusters, setClusters] = useState([]);
  const [clusterName, setClusterName] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    axios
      .get(`${proxy}/clusters`)
      .then(res => setClusters(res.data))
      .catch(err => alert("Error while loading the clusters"));
  }, []);

  const onButtonSubmit = e => {
    e.preventDefault();
    if (clusterName.length === 0) {
      setError({ name: "This field can not be empty " });
    } else {
      setError({});
      // creates a new cluster
      axios
        .post(`${proxy}/clusters?clusterName=${clusterName}`)
        .then(res => alert("successful"))
        .then(res => setClusterName(""))
        .catch(err => alert(err.response.data.message));
      // refreshes the list of clusters
      axios
        .get(`${proxy}/clusters`)
        .then(res => setClusters(res.data))
        .catch(err => alert(err.response.data.message));
    }
  };

  const Cards = () => {
    return clusters.map(d => (
      <Card
        key={d.name}
        body
        outline
        color="secondary"
        style={{ margin: "10px 5px 10px 5px", textAlign: "left" }}
      >
        <CardTitle>Name: {d.clusterName}</CardTitle>
        <CardText></CardText>
      </Card>
    ));
  };

  return (
    <div>
      <h1
        style={{ paddingTop: "20px", fontWeight: "600", marginBottom: "20px" }}
      >
        Create Cluster
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr",
          gridGap: "20px"
        }}
      >
        <div style={{ height: "85vh" }}>
          <Form
            style={{ paddingTop: "20%", paddingLeft: "8px", fontSize: "20px" }}
          >
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Name:
              </Label>
              <Col sm={10}>
                <Input
                  invalid={error.name ? true : false}
                  type="text"
                  name="name"
                  id="name1"
                  value={clusterName}
                  style={{ fontSize: "20px" }}
                  placeholder="Cluster Name"
                  onChange={e => setClusterName(e.target.value)}
                  required
                />
                <FormFeedback>{error.name}</FormFeedback>
              </Col>
            </FormGroup>
            <Button color="info" onClick={onButtonSubmit}>
              Submit
            </Button>
          </Form>
        </div>
        <div
          style={{
            border: "1px solid grey",
            borderRadius: "10px",
            overflowY: "scroll",
            height: "85vh",
            marginRight: "20px"
          }}
        >
          {Cards()}
        </div>
      </div>
    </div>
  );
}
export default CreateCluster;
