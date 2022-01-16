import { useState, useEffect } from "react";
import { Layout, Search as SearchComponent, Spinner } from "../../components";
import {client } from "../../lib/client";
import { PinDetails } from "../../lib/types";
import { useFetchUser } from "../../lib/useFetchUser";
import { feedQuery, searchQuery } from "../../utils/data";

function Search() {
    const [pins, setPins] = useState<PinDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const{ user} = useFetchUser()

    useEffect(() => {
        if(searchTerm) {
            setLoading(true);
            const query = searchQuery(searchTerm.toLowerCase());
            client.fetch(query).then((data) => {
              setPins(data);
              setLoading(false);
            });
        } else {
            client.fetch(feedQuery).then(data => {
                setPins(data);
                setLoading(false);
            })
        }
    },[searchTerm])

    return (
      <Layout user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
        {loading && <Spinner message="Searching for pins" />}
        {pins?.length !== 0 && <SearchComponent pins={pins} />}
        {pins?.length === 0 && searchTerm !== "" && !loading && (
          <div className="mt-10 text-center text-xl">No pins found!</div>
        )}
      </Layout>
    );
}

export default Search
