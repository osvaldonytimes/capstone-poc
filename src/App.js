import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Results from "./Results";

const App = () => {
  const [artworks, setArtworks] = useState([]);

  const handleSearch = async (query) => {
    try {
      // Fetch from the Art Institute of Chicago API
      const chicagoResponse = await axios.get(
        `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=5&fields=id,title,image_id`
      );

      // Fetch from the Harvard Art Museums API
      const harvardResponse = await axios.get(
        `https://api.harvardartmuseums.org/object?apikey=${process.env.REACT_APP_HARVARD_API_KEY}&title=${query}&size=5&fields=id,title,primaryimageurl`
      );

      // Combine results from both APIs
      const combinedArtworks = [
        ...chicagoResponse.data.data.map((artwork) => ({
          id: artwork.id,
          title: artwork.title,
          imageUrl: artwork.image_id
            ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`
            : null,
          source: "Art Institute of Chicago",
        })),
        ...harvardResponse.data.records
          .filter((artwork) => artwork.primaryimageurl)
          .map((artwork) => ({
            id: artwork.id,
            title: artwork.title,
            imageUrl: artwork.primaryimageurl,
            source: "Harvard Art Museums",
          })),
      ];

      setArtworks(combinedArtworks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Art Search from Multiple Museums</h1>
      <SearchBar onSearch={handleSearch} />
      <Results artworks={artworks} />
    </div>
  );
};

export default App;
