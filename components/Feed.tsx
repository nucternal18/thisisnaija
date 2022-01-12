import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

import { MasonryLayout, Spinner } from ".";
import { searchQuery, feedQuery } from "../utils/data";
const Feed = () => {
    const router = useRouter();
    const { categoryId} = router.query;
    const [loading, setLoading] = useState<boolean>(false)
    const [ pins, setPins] = useState<any[]>(null);
    console.log(categoryId)
    useEffect(() => {
        setLoading(true);
        if (categoryId) {
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            })
        } else {
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            })
        }
    },[categoryId])

    if (loading) return <Spinner message="We are adding new ideas to your feed!" />
    
    return (
        <div>
           {pins && pins.length > 0 && <MasonryLayout pins={pins} />}
        </div>
    )
}

export default Feed
