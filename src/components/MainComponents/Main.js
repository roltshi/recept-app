import React, { useEffect, useState } from "react";
import RecepiesList from "./RecepiesList";
import { useDatabase } from "../../context/DatabaseContext";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { getReceptek } = useDatabase();
  const [receptek, setReceptek] = useState();

  useEffect(() => {
    async function fetchData() {
      let data;
      try {
        data = await getReceptek();
      } catch (error) {
        console.error(error);
      } finally {
        setReceptek(data);
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <Spinner /> : <RecepiesList recipes={receptek} />} </>;
};

export default Main;
