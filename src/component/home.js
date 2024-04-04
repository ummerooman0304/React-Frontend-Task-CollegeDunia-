import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import collegeData from "../collegeData/MOCK_DATA (4).json";
import LoadingIndicator from "./LoadingIndicator";
import UniversityTable from "./UniversityTable";
import OrganizeColleges from "./OrganizeColleges";

const MainPage = () => {
  const [collegeList, setCollegeList] = useState([]);
  const [dataStartIndex, setDataStartIndex] = useState(10);
  const collegesPerPage = 10;

  useEffect(() => {
    setCollegeList(collegeData.slice(0, collegesPerPage));
  }, []);

  const retrieveMoreColleges = () => {
    setDataStartIndex((prevIndex) => prevIndex + collegesPerPage);
  };

  useEffect(() => {
    const additionalData = collegeData.slice(dataStartIndex, dataStartIndex + collegesPerPage);
    setCollegeList((prevList) => [...prevList, ...additionalData]);
  }, [dataStartIndex]);

  return (
    <InfiniteScroll
      dataLength={collegeList.length}
      next={retrieveMoreColleges}
      hasMore={true}
      loader={<LoadingIndicator />}
      scrollThreshold={0.9}
    >
      <OrganizeColleges data={collegeData} setDisplayedData={setCollegeList} />
      <UniversityTable displayedData={collegeList} />
    </InfiniteScroll>
  );
};

export default MainPage;