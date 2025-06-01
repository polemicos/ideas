import { useParams } from 'react-router-dom';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as { ideaNick: string };
  return (
    <div>
      <h1>{ideaNick}</h1>
      <p>description</p>
      <div>
        <h2>Comments</h2>
        <ul>
          <li>comment 1</li>
          <li>comment 2</li>
        </ul>
      </div>
    </div>
  );
};
