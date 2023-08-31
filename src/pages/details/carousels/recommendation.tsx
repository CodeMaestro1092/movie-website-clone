import React from "react";

import Carousel from "../../../components/carousel/carousel";
import useFetch from "../../../hooks/useFetch";

interface RecommedationProps{
    mediaType?: string
    id?: string
}

const Recommendation: React.FC<RecommedationProps> = ({ mediaType, id }) => {
    const { data, loading } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;