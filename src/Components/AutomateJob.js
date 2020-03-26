import React, { useState } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import axios from "axios";
import {proxy} from "../utils/constants"

function RunJob() {
  const [clusterLocation, setClusterLocation] = useState("");
  const [dataSetLocation, setDataSetLocation] = useState("");
  const [frequency, setFrequency] = useState("");
  const [file, setFile] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmitButton = e => {
    e.preventDefault();
    if (clusterLocation.length === 0) {
      setErrors({ cluster: "This field can not be empty" });
    } else if (!file.name) {
      setErrors({ file: "This field can not be empty" });
    } else if (frequency.length === 0) {
      setErrors({ frequency: "This field can not be empty" });
      console.log(clusterLocation.length);
    } else {
      setErrors({});
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      axios
        .post(`${proxy}/automate`, formData, {
          params: {
            clusterLocation,
            dataSetLocation,
            frequency
          },
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => alert("Successful"))
        .then(res => {
          setClusterLocation("");
          setDataSetLocation("");
          setFrequency("");
          setFile({});
        })
        .catch(err => alert(err.response));
    }
  };

  return (
    <div>
      <h1
        style={{ paddingTop: "20px", fontWeight: "600", paddingBottom: "30px" }}
      >
        Automate Job
      </h1>
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "10px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "70%"
        }}
      >
        <Form style={{ padding: "100px 40px 40px 40px", fontSize: "16px" }}>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Cluster Location:
            </Label>
            <Col sm={10}>
              <Input
                value={clusterLocation}
                type="text"
                invalid={errors.cluster ? true : false}
                name="ClusterLocation"
                id="cluster"
                style={{ padding: "20px" }}
                placeholder=""
                onChange={e => setClusterLocation(e.target.value)}
              />
              <FormFeedback>{errors.cluster}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Dataset Location:
            </Label>
            <Col sm={10}>
              <Input
                value={dataSetLocation}
                type="text"
                name="ClusterLocation"
                id="cluster"
                style={{ padding: "20px" }}
                placeholder=""
                onChange={e => setDataSetLocation(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>
              Job:
            </Label>
            <Col sm={10}>
              <Input
                invalid={errors.file ? true : false}
                type="file"
                name="file"
                onChange={e => setFile(e.target.files[0])}
                id="exampleFile"
              />
              <FormFeedback>{errors.file}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Frequency:
            </Label>
            <Col sm={10}>
              <Input
                value={frequency}
                type="text"
                invalid={errors.frequency ? true : false}
                name="ClusterLocation"
                id="cluster"
                style={{ padding: "20px" }}
                placeholder=""
                onChange={e => setFrequency(e.target.value)}
              />
              <FormFeedback>{errors.frequency}</FormFeedback>
            </Col>
          </FormGroup>
          <Button color="info" onClick={onSubmitButton}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default RunJob;
