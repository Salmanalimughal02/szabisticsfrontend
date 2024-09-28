import { Col, Container, Row, Input, Form, Card } from "reactstrap";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { setup } from "../../../utils/Constant";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../CssConstaints/Style.css";

import PackagesListNav from "./PackagesListNav";
import PackagesList from "./PackagesList";
import { setPackages } from "../../../ReaduxToolkit/Reducer/CompanySlice";

const Packages = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { filterPackages } = useSelector((state: any) => state.companies);

  const filterPackagess = (e: any) => {
    const searchKey = e.target.value;
    setSearchValue(searchKey);
    const filtered = filterPackages.filter((packagee: any, index: any) => {
      return packagee.name.toLowerCase().includes(searchKey.toLowerCase());
      // ^ Add 'return' statement here
    });

    dispatch(setPackages(filtered));
  };

  return (
    <>
      <div>
        <Breadcrumbs
          mainTitle="Packages List"
          parent="Packages"
          title="Packages List"
        />
        <Container fluid>
          <Row className="project-card">
            <Col md={12} className="project-list">
              <Card>
                <PackagesListNav />
                <Col md={12}>
                  <input
                    className="global-search-field"
                    type="text"
                    placeholder="Type to Search.."
                    value={searchValue}
                    onChange={(e) => {
                      filterPackagess(e);
                    }}
                  />
                </Col>
              </Card>
            </Col>
            <Col sm={12}>
              <PackagesList />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Packages;
