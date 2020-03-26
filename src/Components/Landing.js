import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div>
      <h1 style={{ paddingTop: "20px", fontWeight: "600" }}>
        Spark Kubernetes Scheduler
      </h1>
      <div style={{ paddingTop: "10%" }}>
        <Link to="createCluster">
          <Button
            style={{ padding: "30px", margin: "40px", fontSize: "20px" }}
            color="primary"
          >
            Create Cluster
          </Button>
        </Link>
        <Link to="runJob">
          <Button
            style={{ padding: "30px", margin: "40px", fontSize: "20px" }}
            color="primary"
          >
            Run Job
          </Button>{" "}
        </Link>
        <Link to="automateJob">
          <Button
            style={{ padding: "30px", margin: "40px", fontSize: "20px" }}
            color="primary"
          >
            Automate Job
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default Landing;
