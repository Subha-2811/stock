import React, { useState, useEffect, useRef } from "react";
import List from "./List";

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [list, setList] = useState([]);

  const handleSearchItem = (e) => {
    console.log(e.target.value);
    setSearchItem(e.target.value);
  };

  let acessToken = useRef(""),
    base_URL = "http://3.108.225.220:5000/";
  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch(`${base_URL}api/user-access-token`);
      acessToken.current = await res.json();
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchItem.length > 0) {
          const res = await fetch(
            `${base_URL}api/data?search_string=${searchItem}`,
            {
              headers: {
                "user-access-token": acessToken.current.token,
              },
            }
          );
          const data = await res.json();
          setList(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const id = setTimeout(fetchData, 500);
    return () => {
      clearTimeout(id);
    };
  }, [searchItem]);
  return (
    <div>
      <input type="text" value={searchItem} onChange={handleSearchItem} />
      {list?.length > 0 && <List list={list} />}
    </div>
  );
};

export default SearchBar;
