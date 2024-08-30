// src/Results.js
import React from "react";

const Results = ({ artworks }) => {
  return (
    <div>
      {artworks.length > 0 ? (
        <ul>
          {artworks.map((artwork) => (
            <li key={artwork.id}>
              <h3>{artwork.title}</h3>
              {artwork.imageUrl && (
                <img src={artwork.imageUrl} alt={artwork.title} />
              )}
              <p>
                <strong>Source:</strong> {artwork.source}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Results;
